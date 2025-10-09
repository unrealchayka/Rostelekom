import { authConfig } from '@/configs/auth';
import NextAuth from 'next-auth'

import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import YandexProvider from 'next-auth/providers/yandex'
import VKProvider from 'next-auth/providers/vk'

const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID!,
            clientSecret: process.env.YANDEX_CLIENT_SECRET!,
        }),
        VKProvider({
            clientId: process.env.VK_CLIENT_ID!,
            clientSecret: process.env.VK_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                // session.user.id = token.sub! // Добавьте это для получения ID пользователя
            }
            return session
        },
    },
}

const handler = NextAuth(authConfig);


export { handler as GET, handler as POST }