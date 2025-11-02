import { createDomain, sample } from 'effector'
import { ILoginCheckFx, IUser } from '@/types/user'
import { loginCheckFx } from '@/myapi/my-auth'

export const user = createDomain()

export const loginCheck = user.createEvent<ILoginCheckFx>()

export const $user = user
  .createStore<IUser>({} as IUser)
  .on(loginCheckFx.done, (_, { result }) => result)

sample({
  clock: loginCheck,
  source: $user,
  fn: (_, { jwt }) => ({
    jwt,
  }),
  target: loginCheckFx,
})