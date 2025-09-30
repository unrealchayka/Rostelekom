'use client'
import { useLang } from '@/hooks/useLang';
import { IProductsListItemProps } from '@/types/modules';
import styles from '@/styles/product-list-item/index.module.scss'
import stylesForAd from '@/styles/ad/index.module.scss'
import productSubtitleStyles from '@/styles/productSubtitle/index.module.scss'
import ProductSubtitle from '@/components/elements/ProductSubtitle/ProductSubtitle'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    addOverflowHiddenToBody,
    formatPrice,
} from '@/lib/utils/common'
import ProductLabel from './Productlabel';
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn';
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable';
import { motion } from 'motion/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { setCurrentProduct } from '@/context/goods';
import { showQuickViewModal } from '@/context/modals';

const ProductListItem = ({ item, title }: IProductsListItemProps) => {
    const { lang, translations } = useLang()
    const isMedia800 = useMediaQuery(800)
    const isTitleForNew = title === translations[lang].main_page.new_title

    const handleShowQuickViewModal = () => {
        addOverflowHiddenToBody()
        showQuickViewModal()
        setCurrentProduct(item)
    }
    return (
        <>
            {item.characteristics.collections === 'line' &&
                item.type === 't-shirts' ?
                <motion.li className={styles.list__item_ad}>
                    <Link href={`catalog/${item.category}/${item._id}`}>
                        <span className={`${stylesForAd.ad} ${styles.list__item_ad__ad}`}>
                            {translations[lang].common.ad}
                        </span>
                        <ProductSubtitle
                            subtitleClassName={productSubtitleStyles.product_subtitle__subtitle}
                            subtitleRectClassName={
                                productSubtitleStyles.product_subtitle__subtitle__rect
                            }
                        />

                        <div className={styles.list__item_ad__img}>
                            <Image
                                src={item.images[0]}
                                alt={item.name}
                                width={224}
                                height={275}
                            />
                        </div>
                        <p className={styles.list__item_ad__title}>
                            <span>
                                {translations[lang].main_page.tShirt} «Line»{' '}
                                {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    //@ts-ignore
                                    translations[lang].main_page[
                                    item.images[0].split('/img/').join('').split('-')[0]
                                    ]
                                }
                            </span>
                            <span>{formatPrice(+item.price)} ₽</span>
                        </p>
                    </Link>
                </motion.li>

                :

                <motion.li className={styles.list__item}>
                    {title ? (
                        <span
                            className={`${styles.list__item__label} ${isTitleForNew
                                ? styles.list__item__new
                                : styles.list__item__bestseller
                                }`}
                        >
                            {isTitleForNew
                                ? translations[lang].main_page.is_new
                                : translations[lang].main_page.is_bestseller}
                        </span>
                    ) : item.isNew && item.isBestseller ? (
                        ''
                    ) : (
                        <ProductLabel isBestseller={item.isBestseller} isNew={item.isNew} />
                    )}
                    <div className={styles.list__item__actions}>
                        <ProductItemActionBtn
                            text={translations[lang].product.add_to_favorites}
                            iconClass='actions__btn_favorite'
                        />
                        <ProductItemActionBtn
                            text={translations[lang].product.add_to_comparison}
                            iconClass='actions__btn_comparison'
                        />
                        {!isMedia800 &&
                            <ProductItemActionBtn
                                text={translations[lang].product.quick_view}
                                iconClass='actions__btn_quick_view'
                                callback={handleShowQuickViewModal}
                            />
                        }
                    </div>
                    <Link
                        href={`/catalog/${item.category}/${item._id}`}
                        className={styles.list__item__img}
                    >
                        <Image src={item.images[0]} alt={item.name} fill sizes='width: 100%' />
                    </Link>
                    <div className={styles.list__item__inner}>
                        <h3 className={styles.list__item__title}>
                            <Link href={`/catalog/${item.category}/${item._id}`}>
                                {item.name}
                            </Link>
                        </h3>
                        <ProductAvailable
                            vendorCode={item.vendorCode}
                            inStock={+item.inStock}
                        />
                        <span className={styles.list__item__price}>
                            {formatPrice(+item.price)} ₽
                        </span>
                    </div>
                    <button
                        className={`btn-reset ${styles.list__item__cart}`}
                    >{translations[lang].product.to_cart}</button>
                </motion.li>}
        </>
    );
}

export default ProductListItem;
