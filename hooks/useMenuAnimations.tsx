import { useEffect, useState } from "react"

export const useMenuAnimations = (zIndex: number, popupIsOpen: boolean) => {
    const [popupZIndex, setPopupZIndex] = useState< string| number >(0)
    
    const itemVariants = {
        close: {
            opacity: 0
        },
        open: { opacity: 1 }
    }

    const sideVariants = {
        close: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            transition: {
                staggerChildren: 0.2,
                staggerDirection: 1
            }
        }
    }

    useEffect(()=> {
        if(popupIsOpen) {
            setPopupZIndex(zIndex)
            return
        }
        const timerId = setTimeout(()=>setPopupZIndex('-1'), 1000)

        return () => clearTimeout(timerId)
    }, [popupIsOpen, zIndex])
    return { popupZIndex, itemVariants, sideVariants }
}