import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Product } from '../../types/Product';
import StarIcon from 'src/assets/icons/star.svg';
import CartIcon from 'src/assets/icons/cart_white.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './ProductCard.module.css';

type ProductCardProps = {
    product: Product
};

const ProductCard = ({ product }: ProductCardProps) => {
    const [showDescription, setShowDescription] = useState(false);

    // TODO: make hide btn styles
    // TODO: replace price by Button component
    return (
        <div className={`${styles['product-card']}`}>
            {
                !showDescription &&
                <ProductCardHeader discountPercentage={product.discountPercentage} images={product.images} /> 
            }
            <div className={styles['product-card__rating']}>
                <img src={StarIcon} alt='star'/>
                <span>{product.rating}</span>
            </div>
            <h3 className={styles['product-card__tile']}>{product.title}</h3>
            <div className={styles['product-card__description']}>
                <p>{product.description}</p>
                {
                    showDescription ? <span onClick={() => setShowDescription(false)}>Hide description</span>
                    : <span onClick={() => setShowDescription(true)}>Read more</span>
                }
            </div>
            <div className={styles['product-card__price-container']}>
                <div className={styles['product-card__price']}>
                    <img src={CartIcon} alt='cart'/>
                    ${product.price}
                </div>
                <span className={styles['product-card__prev-price']}>
                    ${Math.floor(product.price * (1 + product.discountPercentage / 100))}
                </span>
            </div>
        </div> 
    );
};

type ProductCardHeaderProps = {
    discountPercentage: number,
    images: string[],
};

const ProductCardHeader = ({ discountPercentage, images }: ProductCardHeaderProps) => {
    return (
        <>
            <div className={styles['product-card__discount']}><span>{discountPercentage}%</span> off sale</div>
            <Carousel
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                renderIndicator={renderIndicator}
            >
                {
                    images.map((image, index) => (
                        <div key={index}>
                            <img className={styles['product-card__img']} src={image} alt='img' />
                        </div>
                    ))
                }
            </Carousel>
        </>
    );
};

const renderIndicator = (
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number,
) => {
    return <li 
                className={`${styles['product-card__dot']} ${isSelected ? styles['product-card__dot_selected'] : ''}`}
                value={index}
                role='button'
                aria-label={`slide imem ${index}`}
                onClick={clickHandler}
            />;
};

export default ProductCard;