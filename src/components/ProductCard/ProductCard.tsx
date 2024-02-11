import React, { KeyboardEvent, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useUnit } from 'effector-react';
import { $cartList, $resultCount, increaseCount } from '../../store/cart';
import { Product } from '../../types/Product';
import { ButtonType } from '../Button/ButtonType';
import Button from '../Button/Button';
import StarIcon from 'src/assets/icons/star.svg';
import CartIcon from 'src/assets/icons/cart_white.svg';
import CartBlueIcon from 'src/assets/icons/cart.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './ProductCard.module.css';

type ProductCardProps = {
    product: Product
};

const ProductCard = ({ product }: ProductCardProps) => {
    const [buttonState, setButtonState] = useState(0);
    const [showDescription, setShowDescription] = useState(false);
    
    const cartList = useUnit($cartList);
    const resultCount = useUnit($resultCount);
    const increaseCountEvent = useUnit(increaseCount);

    useEffect(() => {
        if (cartList[product.id] && !buttonState) {
            setButtonState(1);
        }
    }, [resultCount]);

    const handleReadKeydown = (event: KeyboardEvent, state: boolean) => {
        if (event.key === 'Enter') {
            setShowDescription(state);
        }
    };

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
                    showDescription 
                    ? <span 
                        onClick={() => setShowDescription(false)} 
                        onKeyDown={(e) => handleReadKeydown(e, false)}
                        tabIndex={0}
                    >Hide description</span>
                    : <span 
                        onClick={() => setShowDescription(true)} 
                        onKeyDown={(e) => handleReadKeydown(e, true)}
                        tabIndex={0}
                    >Read more</span>
                }
            </div>
            <div className={styles['product-card__price-container']}>
                {
                    buttonState === 1 
                    ?
                    <Button 
                        buttonType={ButtonType.clear}
                        onClick={() => setButtonState(0)}
                        className={`${styles['product-card__price_added']} ${styles['product-card__price']}`}
                    >
                        <img src={CartBlueIcon} alt='cart'/>
                        added to cart
                    </Button>
                    : 
                    <Button 
                        className={styles['product-card__price']}
                        onClick={() => increaseCountEvent(product)}
                    >
                        <img src={CartIcon} alt='cart'/>
                        ${product.price}
                    </Button> 
                }
                
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