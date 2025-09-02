'use client'
import { AllowedLangs } from '@/constants/lang';
import { setLang } from '@/context/lang';
import { $menuIsopen, closeMenu } from '@/context/modals';
import { useLang } from '@/hooks/useLang';
import { removeOverflowHiddenFromBody } from '@/lib/utils/common';
import { useUnit } from 'effector-react';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Logo from '@/components/elements/Logo';
import { usePathname } from 'next/navigation';
import Accordion from '../Accordion/Accordion';
import MenuLinkItem from './MenuLinkItem';
import BuyersListItems from './BuyersListItems';
import ContactsListItems from './ContactsListItems';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Menu = () => {
    const [showCatalogList, setShowCatalogList] = useState(false);
    const [showBuyersList, setShowBuyersList] = useState(false);
    const [showContactsList, setShowContactsList] = useState(false);
    const { lang, translations } = useLang()
    const menuIsopen = useUnit($menuIsopen)
    const pathname = usePathname()

    const isMedia800 = useMediaQuery(800)
    const isMedia640 = useMediaQuery(640)

    const handleSwitchLangToRu = () => handleswitchLang('ru')
    const handleSwitchLangToEn = () => handleswitchLang('en')

    const handleswitchLang = (lang: string) => {
        setLang(lang as AllowedLangs)
        localStorage.setItem('lang', JSON.stringify(lang))
    }

    const handleShowCatalogList = () => {
        setShowCatalogList(true)
        setShowBuyersList(false)
        setShowContactsList(false)
    }

    const handleShowBuyersList = () => {
        setShowCatalogList(false)
        setShowBuyersList(true)
        setShowContactsList(false)
    }

    const handleShowContactsList = () => {
        setShowCatalogList(false)
        setShowBuyersList(false)
        setShowContactsList(true)
    }

    const handleRedirectToCatalog = (path: string) => {
        if (pathname.includes('/catalog')) {
            window.history.pushState({ path }, '', path)
            window.location.reload()
        }

        handleCloseMenu()
    }

    const handleCloseMenu = () => {
        removeOverflowHiddenFromBody()
        closeMenu()
    }
    const clothLinks = [
        {
            id: 1,
            text: translations[lang].comparison['t-shirts'],
            href: '/catalog/cloth?offset=0&type=t-shirts',
        },
        {
            id: 2,
            text: translations[lang].comparison['long-sleeves'],
            href: '/catalog/cloth?offset=0&type=long-sleeves',
        },
        {
            id: 3,
            text: translations[lang].comparison.hoodie,
            href: '/catalog/cloth?offset=0&type=hoodie',
        },
        {
            id: 4,
            text: translations[lang].comparison.outerwear,
            href: '/catalog/cloth?offset=0&type=outerwear',
        },
    ]

    const accessoriesLinks = [
        {
            id: 1,
            text: translations[lang].comparison.bags,
            href: '/catalog/accessories?offset=0&type=bags',
        },
        {
            id: 2,
            text: translations[lang].comparison.headdress,
            href: '/catalog/accessories?offset=0&type=headdress',
        },
        {
            id: 3,
            text: translations[lang].comparison.umbrella,
            href: '/catalog/accessories?offset=0&type=umbrella',
        },
    ]

    const souvenirsLinks = [
        {
            id: 1,
            text: translations[lang].comparison['business-souvenirs'],
            href: '/catalog/souvenirs?offset=0&type=business-souvenirs',
        },
        {
            id: 2,
            text: translations[lang].comparison['promotional-souvenirs'],
            href: '/catalog/souvenirs?offset=0&type=promotional-souvenirs',
        },
    ]

    const officeLinks = [
        {
            id: 1,
            text: translations[lang].comparison.notebook,
            href: '/catalog/office?offset=0&type=notebook',
        },
        {
            id: 2,
            text: translations[lang].comparison.pen,
            href: '/catalog/office?offset=0&type=pen',
        },
    ]
    return (
        <nav className={`nav-menu ${menuIsopen ? 'open' : 'close'}`}>
            <div className='container nav-menu__container'>
                <div className={`nav-menu__logo ${menuIsopen ? 'open' : ''}`}><Logo /></div>
                <Image
                    className={`nav-menu__bg ${menuIsopen ? 'open' : ''}`}
                    src={`/img/menu-bg${isMedia800 ? '-small' : ''}.png`}
                    alt='menu background'
                    width={isMedia800 ? 269 : 611}
                    height={isMedia800 ? 622 : 900}
                />

                <button
                    className={`btn-reset nav-menu__close ${menuIsopen ? 'open' : 'close'}`}
                    onClick={handleCloseMenu}
                >
                </button>

                <div className={`nav-menu__lang ${menuIsopen ? 'open' : ''}`}>
                    <button
                        className={`btn-reset nav-menu__lang__btn ${lang === 'ru' ? 'lang-active' : ''
                            }`}
                        onClick={handleSwitchLangToRu}
                    >
                        RU
                    </button>
                    <button
                        className={`btn-reset nav-menu__lang__btn ${lang === 'en' ? 'lang-active' : ''
                            }`}
                        onClick={handleSwitchLangToEn}
                    >
                        EN
                    </button>

                </div>
                <ul className={`list-reset nav-menu__list ${menuIsopen ? 'open' : ''}`}>
                    {!isMedia800 && <li className='nav-menu__list__item'>
                        <button
                            className='btn-reset nav-menu__list__item__btn'
                            onMouseEnter={handleShowCatalogList}
                        >
                            {translations[lang].main_menu.catalog}
                        </button>
                        <AnimatePresence>
                            {showCatalogList && (
                                <motion.ul
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className='list-reset nav-menu__accordion'
                                >
                                    <li className='nav-menu__accordion__item'>
                                        <Accordion
                                            title={translations[lang].main_menu.cloth}
                                            titleClass='btn-reset nav-menu__accordion__item__title'
                                        >
                                            <ul className='list-reset nav-menu__accordion_item__list'>
                                                {clothLinks.map((item) => (
                                                    <MenuLinkItem
                                                        key={item.id}
                                                        item={item}
                                                        handleRedirectToCatalog={handleRedirectToCatalog}
                                                    />


                                                ))}
                                            </ul>
                                        </Accordion>
                                    </li>
                                    <li className='nav-menu__accordion__item'>
                                        <Accordion
                                            title={translations[lang].main_menu.accessories}
                                            titleClass='btn-reset nav-menu__accordion__item__title'
                                        >
                                            <ul className='list-reset nav-menu__accordion_item__list'>
                                                {accessoriesLinks.map((item) => (
                                                    <MenuLinkItem
                                                        key={item.id}
                                                        item={item}
                                                        handleRedirectToCatalog={handleRedirectToCatalog}
                                                    />


                                                ))}
                                            </ul>
                                        </Accordion>
                                    </li>
                                    <li className='nav-menu__accordion__item'>
                                        <Accordion
                                            title={translations[lang].main_menu.souvenirs}
                                            titleClass='btn-reset nav-menu__accordion__item__title'
                                        >
                                            <ul className='list-reset nav-menu__accordion_item__list'>
                                                {souvenirsLinks.map((item) => (
                                                    <MenuLinkItem
                                                        key={item.id}
                                                        item={item}
                                                        handleRedirectToCatalog={handleRedirectToCatalog}
                                                    />


                                                ))}
                                            </ul>
                                        </Accordion>
                                    </li>
                                    <li className='nav-menu__accordion__item'>
                                        <Accordion
                                            title={translations[lang].main_menu.office}
                                            titleClass='btn-reset nav-menu__accordion__item__title'
                                        >
                                            <ul className='list-reset nav-menu__accordion_item__list'>
                                                {officeLinks.map((item) => (
                                                    <MenuLinkItem
                                                        key={item.id}
                                                        item={item}
                                                        handleRedirectToCatalog={handleRedirectToCatalog}
                                                    />


                                                ))}
                                            </ul>
                                        </Accordion>
                                    </li>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </li>}
                    <li className='nav-menu__list__item'>
                        {!isMedia640 &&
                            <button
                                className='btn-reset nav-menu__list__item__btn'
                                onMouseEnter={handleShowBuyersList}
                            >
                                {translations[lang].main_menu.buyers}
                            </button>
                        }

                        {!isMedia640 &&
                            <AnimatePresence>
                                {showBuyersList && (
                                    <motion.ul
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className='list-reset nav-menu__accordion'
                                    >
                                        <BuyersListItems />
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        }
                        {isMedia640 &&
                            <Accordion
                                title={translations[lang].main_menu.buyers}
                                titleClass='btn-reset nav-menu__list__item__btn'
                            >
                                <ul className='list-reset nav-menu__accordion__item__list'>
                                    <BuyersListItems />
                                </ul>
                            </Accordion>
                        }
                    </li>
                    <li className='nav-menu__list__item'>
                        {!isMedia640 &&
                            <button
                                className='btn-reset nav-menu__list__item__btn'
                                onMouseEnter={handleShowContactsList}
                            >
                                {translations[lang].main_menu.contacts}
                            </button>
                        }

                        {!isMedia640 &&
                            <AnimatePresence>
                                {showContactsList && (
                                    <motion.ul
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className='list-reset nav-menu__accordion'
                                    >
                                        <ContactsListItems />
                                    </motion.ul>
                                )}


                            </AnimatePresence>
                        }

                        {isMedia640 &&
                            <Accordion
                                title={translations[lang].main_menu.contacts}
                                titleClass='btn-reset nav-menu__list__item__btn'
                            >
                                <ul className='list-reset nav-menu__accordion__item__list'>
                                    <ContactsListItems />
                                </ul>
                            </Accordion>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Menu;
