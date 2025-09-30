
import { IProductCountBySizeProps } from '@/types/goods'
import styles from '@/styles/product-count-indicator/index.module.scss'

const ProductCountBySize = ({
    withCartIcon = true,
}: IProductCountBySizeProps) => (
    <>
        <span
            className={`${styles.count} ${withCartIcon ? styles.with_icon : ''}`}
        >
        </span>
    </>
)

export default ProductCountBySize