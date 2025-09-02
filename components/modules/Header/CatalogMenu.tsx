'use client'

import { $catalogMenuIsopen, closeCatalogMenu } from "@/context/modals"
import { useLang } from "@/hooks/useLang"
import { useMenuAnimations } from "@/hooks/useMenuAnimations"
import { useUnit } from "effector-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import Image from "next/image"
import Header from "./Header"
import { removeOverflowHiddenFromBody } from "@/lib/utils/common"

import '@/app/globalStyles/catalog-menu.css'
import { IoIosCloseCircleOutline } from "react-icons/io"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import CatalogMenuButton from "./CatalogMenuButton"
import CatalogMenuList from "./CatalogMenuList"
import Accordion from "../Accordion/Accordion"
import Link from "next/link"

const CatalogMenu = () => {
    const catalogMenuTsOpen = useUnit($catalogMenuIsopen)
    const [showClothList, setShowClothList] = useState(false)
    const [showAccessoriesList, setShowAccessoriesList] = useState(false)
    const [showSouvenirsList, setShowSouvenirsList] = useState(false)
    const [showOfficeList, setShowOfficeList] = useState(false)
    const { lang, translations } = useLang()
    const { itemVariants, sideVariants, popupZIndex } = useMenuAnimations(
        2,
        catalogMenuTsOpen
    )
    const isMedia640 = useMediaQuery(640)
    const isMedia450 = useMediaQuery(450)

    const handleShowClothList = () => {
        setShowClothList(true)
        setShowAccessoriesList(false)
        setShowSouvenirsList(false)
        setShowOfficeList(false)
    }

    const handleShowAccessoriesList = () => {
        setShowClothList(false)
        setShowAccessoriesList(true)
        setShowSouvenirsList(false)
        setShowOfficeList(false)
    }

    const handleShowSouvenirsList = () => {
        setShowClothList(false)
        setShowAccessoriesList(false)
        setShowSouvenirsList(true)
        setShowOfficeList(false)
    }

    const handleShowOfficeList = () => {
        setShowClothList(false)
        setShowAccessoriesList(false)
        setShowSouvenirsList(false)
        setShowOfficeList(true)
    }

    const handleCloseMenu = () => {
        removeOverflowHiddenFromBody()
        closeCatalogMenu()
        setShowClothList(false)
        setShowAccessoriesList(false)
        setShowSouvenirsList(false)
        setShowOfficeList(false)
    }

    const items = [
        {
            name: translations[lang].main_menu.cloth,
            id: 1,
            items: [
                {
                    title: translations[lang].comparison['t-shirts'],
                    href: '/catalog/cloth?offset=0&type=t-shirts',
                },
                {
                    title: translations[lang].comparison['long-sleeves'],
                    href: '/catalog/cloth?offset=0&type=long-sleeves',
                },
                {
                    title: translations[lang].comparison.hoodie,
                    href: '/catalog/cloth?offset=0&type=hoodie',
                },
                {
                    title: translations[lang].comparison.outerwear,
                    href: '/catalog/cloth?offset=0&type=outerwear',
                },
            ],
            handler: handleShowClothList
        },
        {
            name: translations[lang].main_menu.accessories,
            id: 2,
            items: [
                {
                    title: translations[lang].comparison.bags,
                    href: '/catalog/accessories?offset=0&type=bags',
                },
                {
                    title: translations[lang].comparison.headdress,
                    href: '/catalog/accessories?offset=0&type=headdress',
                },
                {
                    title: translations[lang].comparison.umbrella,
                    href: '/catalog/accessories?offset=0&type=umbrella',
                },
            ],
            handler: handleShowAccessoriesList
        },
        {
            name: translations[lang].main_menu.souvenirs,
            id: 3,
            items: [
                {
                    title: translations[lang].comparison['business-souvenirs'],
                    href: '/catalog/souvenirs?offset=0&type=business-souvenirs',
                },
                {
                    title: translations[lang].comparison['promotional-souvenirs'],
                    href: '/catalog/souvenirs?offset=0&type=promotional-souvenirs',
                },
            ],
            handler: handleShowSouvenirsList
        },
        {
            name: translations[lang].main_menu.office,
            id: 4,
            items: [
                {
                    title: translations[lang].comparison.notebook,
                    href: '/catalog/office?offset=0&type=notebook',
                },
                {
                    title: translations[lang].comparison.pen,
                    href: '/catalog/office?offset=0&type=pen',
                },
            ],
            handler: handleShowOfficeList
        },
    ]

    return (
        <div className="catalog-menu" style={{ zIndex: popupZIndex }}>
            <AnimatePresence>
                {catalogMenuTsOpen &&
                    <motion.aside
                        className="catalog-menu__aside"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        exit={{
                            width: 0,
                            transition: { delay: 0.7, duration: 0.3 }
                        }}
                    >
                        <div className="catalog-menu__header">
                            <Header />
                        </div>
                        <motion.div
                            className="catalog-menu__inner"
                            initial="close"
                            animate="open"
                            exit="close"
                            variants={sideVariants}
                        >

                            <Image
                                className="catalog-menu__bg"
                                src='/img/menu-bg-small.png'
                                alt="menu bg small"
                                width={269}
                                height={622}
                            />
                            <motion.button
                                className="btn-reset catalog-menu__close"
                                variants={itemVariants}
                                onClick={handleCloseMenu}
                            ><IoIosCloseCircleOutline size={20} /></motion.button>

                            <motion.h2
                                variants={itemVariants}
                                className="catalog-menu__title"
                            >
                                {translations[lang].main_menu.catalog}
                            </motion.h2>

                            <ul className="list-reset catalog-menu__list">
                                {items.map(({ id, name, items, handler }) => {
                                    const buttonProps = (isActive: boolean) => ({
                                        handler: handler as VoidFunction,
                                        name,
                                        isActive,
                                    })

                                    const isCurrentList = (
                                        showList: boolean,
                                        currentId: number
                                    ) => showList && id === currentId
                                    return (
                                        <motion.li
                                            key={id}
                                            variants={itemVariants}
                                            className="catalog-menu__list__item"
                                        >
                                            {!isMedia450 && (<>
                                                {id === 1 && (
                                                    <CatalogMenuButton
                                                        {...buttonProps(showClothList)}
                                                    />
                                                )}
                                                {id === 2 && (
                                                    <CatalogMenuButton
                                                        {...buttonProps(showAccessoriesList)}
                                                    />
                                                )}
                                                {id === 3 && (
                                                    <CatalogMenuButton
                                                        {...buttonProps(showSouvenirsList)}
                                                    />
                                                )}
                                                {id === 4 && (
                                                    <CatalogMenuButton
                                                        {...buttonProps(showOfficeList)}
                                                    />
                                                )}
                                            </>)
                                            }

                                            {!isMedia450 && (
                                                <AnimatePresence>
                                                    {isCurrentList(showClothList, 1) && (
                                                        <CatalogMenuList items={items} />
                                                    )}
                                                    {isCurrentList(showAccessoriesList, 2) && (
                                                        <CatalogMenuList items={items} />
                                                    )}
                                                    {isCurrentList(showSouvenirsList, 3) && (
                                                        <CatalogMenuList items={items} />
                                                    )}
                                                    {isCurrentList(showOfficeList, 4) && (
                                                        <CatalogMenuList items={items} />
                                                    )}
                                                </AnimatePresence>
                                            )}

                                            {isMedia450 && (
                                                <Accordion
                                                    title={name}
                                                    titleClass='btn-reset nav-menu__accordion__item__title'
                                                >
                                                    <ul className='list-reset catalog__accordion__list'>
                                                        {items.map((item, i) => (
                                                            <li
                                                                key={i}
                                                                className='catalog__accordion__list__item'
                                                            >
                                                                <Link
                                                                    href={item.href}
                                                                    className='nav-menu__accordion__item__list__item__link'
                                                                >
                                                                    {item.title}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Accordion>
                                            )}
                                        </motion.li>
                                    )
                                })}
                            </ul>
                        </motion.div>
                    </motion.aside>
                }
            </AnimatePresence>
        </div>
    );
}

export default CatalogMenu;
