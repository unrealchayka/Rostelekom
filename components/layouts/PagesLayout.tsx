'use client'
import { $showQuickViewModal, $showSizeTable, closeQuickViewModal } from '@/context/modals'
import { useUnit } from 'effector-react'
import Layout from './Layout'
import { closeSizeTableByCheck, handleCloseAuthPopup, removeOverflowHiddenFromBody } from '@/lib/utils/common'
import { $openAuthPopup } from '@/context/auth'
import { useState } from 'react'
import { Provider } from '@/providers/provider'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
    const [isClient, setIsClient] = useState(true)
    const showQuickViewModal = useUnit($showQuickViewModal)
    const showSizeTable = useUnit($showSizeTable)
    const openAuthPopup = useUnit($openAuthPopup)

    const handleCloseQuickViewModal = () => {
        removeOverflowHiddenFromBody()
        closeQuickViewModal()
    }

    const handleCloseSyzeTabl = () => closeSizeTableByCheck(showQuickViewModal)

    return (
        <>
            <html lang='en'>
                <body>
                    <Provider>
                        <Layout>{children}</Layout>
                        <div
                            className={`quick-view-modal-overlay ${showQuickViewModal ? 'overlay-active' : ''}`}
                            onClick={handleCloseQuickViewModal}
                        />
                        <div
                            className={`size-table-overlay ${showSizeTable ? 'overlay-active' : ''}`}
                            onClick={handleCloseSyzeTabl}
                        />

                        <div
                            className={`auth-overlay ${openAuthPopup ? 'overlay-active' : ''
                                }`}
                            onClick={handleCloseAuthPopup}
                        />
                    </Provider>

                </body>
            </html>
        </>
    )
}

export default PagesLayout