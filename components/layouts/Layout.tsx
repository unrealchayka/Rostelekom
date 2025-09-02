'use client'
import React from 'react';
import Header from '../modules/Header/Header';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MobileNavbar from '../modules/MobileNavbar/MobileNavbar';
import { AnimatePresence, motion } from 'motion/react';
import { useUnit } from 'effector-react';
import { $searchModal } from '@/context/modals';
import SearchModal from '../modules/Header/SearchModal';
import { handleCloseSearchModal } from '@/lib/utils/common';
import Footer from '../modules/Footer/Footer';

const Layout = ({ children }: {
    children: React.ReactNode
}) => {
    const isMedia800 = useMediaQuery(800)
    const searchModal = useUnit($searchModal)

    return (
        <>
            <Header />
            {children}
            {isMedia800 && <MobileNavbar />}
            <AnimatePresence>
                {searchModal && (
                    <motion.div
                        initial={{ opacity: 0, zIndex: 102 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <SearchModal />
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                className={`header__search-overlay ${searchModal ? 'overlay-active' : ''
                    }`}
                onClick={handleCloseSearchModal}
            ></div>
            <Footer/>
        </>
    );
}

export default Layout;
