import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUnit } from 'effector-react';
import { $activeCategory, updateCategory } from '../../store/products';
import Button from '../Button/Button';
import { ButtonType } from '../Button/ButtonType';
import PointIcon from 'src/assets/icons/point.svg';

const Category = ({ category }: { category: string }) => {
    const [mouseDown, setMouseDown] = useState<number>(0);
    const [mouseUp, setMouseUp] = useState<number>(0);

    const [updateCategoryEvent] = useUnit([updateCategory]);
    const activeCategory = useUnit($activeCategory);

    const handleClick = (event: React.MouseEvent) => {
        if (Math.abs(mouseDown - mouseUp) > 10) {
            event.preventDefault();
            return;
        }

        updateCategoryEvent(category);
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        setMouseDown(event.clientX);
    };

    const handleMouseUp = (event: React.MouseEvent) => {
        setMouseUp(event.clientX);
    };

    return (
        <Button buttonType={ButtonType.clear} className={activeCategory === category ? 'button_active' : ''}>
            {activeCategory === category && <img src={PointIcon} alt="point"/>}
            <Link 
                to={'/products/' + (category === 'all' ? '' : `?category=${category}`)}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                {category}
            </Link>
        </Button>
    );
};

export default Category;