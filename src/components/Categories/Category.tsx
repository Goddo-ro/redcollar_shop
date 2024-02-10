import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUnit } from 'effector-react';
import { $activeCategory } from '../../store/products';
import { ButtonType } from '../Button/ButtonType';
import Button from '../Button/Button';
import PointIcon from 'src/assets/icons/point.svg';

const Category = ({ category }: { category: string }) => {
    const [mouseDown, setMouseDown] = useState<number>(0);
    const [mouseUp, setMouseUp] = useState<number>(0);

    const navigate = useNavigate();

    const activeCategory = useUnit($activeCategory);

    const handleClick = (event: React.MouseEvent) => {
        if (Math.abs(mouseDown - mouseUp) > 10) {
            event.preventDefault();
            return;
        }

        navigate('/products/' + (category === 'all' ? '' : `?category=${category}`));
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        setMouseDown(event.clientX);
    };

    const handleMouseUp = (event: React.MouseEvent) => {
        setMouseUp(event.clientX);
    };

    return (
        <Button buttonType={ButtonType.clear} className={activeCategory === category ? 'button_active' : ''}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {activeCategory === category && <img src={PointIcon} alt="point"/>}
            {category}
        </Button>
    );
};

export default Category;