'use client'
import { useLang } from "@/hooks/useLang";
import Logo from "@/components/elements/Logo";
import Link from "next/link";


import '@/app/globalStyles/header.css'
import Menu from "./Menu";
import { openMenu, openSearchModal } from "@/context/modals";
import { addOverflowHiddenToBody, handleOpenAuthPopup, triggerLoginCheck } from "@/lib/utils/common";
import CartPopup from "./CartPopup/CartPopup";
import HeaderProfile from "./HeaderProfile";
import { useUnit } from "effector-react";
import { $isAuth } from "@/context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { loginCheckFx } from "@/myapi/my-auth";
import { useEffect, useState } from "react";
import { $user } from "@/context/user";
import { useSession } from "next-auth/react";


export const Header = ({ }) => {
    const loginCheckSpinner = useUnit(loginCheckFx.pending)
    const { lang, translations } = useLang()
    const sessions = useSession()


    const handleOpenMenu = () => {
        addOverflowHiddenToBody()
        openMenu()
    }

    const handleOpenSearchModal = () => {
        openSearchModal()
        addOverflowHiddenToBody()
    }

    useEffect(() => {
       triggerLoginCheck()
    }, [])
    return (
        <header className="header">

            <div className="container header__container">
                <button className="btn-reset header__burger" onClick={handleOpenMenu}>
                    {translations[lang].header.menu_btn}
                </button>
                <Menu />
                <div className="header__logo"><Logo /></div>
                <ul className="header__links list-reset">
                    <li className="header__links__item">
                        <button
                            onClick={handleOpenSearchModal}
                            className="btn-reset header__links__item__btn header__links__item__btn--search">
                        </button>
                    </li>
                    <li className="header__links__item list-reset">
                        <Link href='/favorites' className="header__links__item__btn header__links__item__btn--favorites">
                        </Link>
                    </li>
                    <li className="header__links__item list-reset">
                        <Link href='/compair' className="header__links__item__btn header__links__item__btn--compare">
                        </Link>
                    </li>
                    <li className="header__links__item list-reset">
                        <CartPopup />
                    </li>
                    <li className="header__links__item list-reset">
                        {sessions.status === 'loading' ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : sessions.status === 'authenticated'  ? (
                            <HeaderProfile />
                        ) : (
                            <button
                                className='btn-reset header__links__item__btn header__links__item__btn--profile'
                                onClick={handleOpenAuthPopup}
                            />
                        )}
                    </li>
                </ul>

            </div>
        </header>
    );
};

export default Header;