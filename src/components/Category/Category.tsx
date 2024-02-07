import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { ButtonType } from '../Button/ButtonType';
import { useState } from 'react';

const Category = ({ category }: { category: string }) => {
    const [mouseDown, setMouseDown] = useState<number>(0);
    const [mouseUp, setMouseUp] = useState<number>(0);

    const handleClick = (event: React.MouseEvent) => {
        if (Math.abs(mouseDown - mouseUp) > 10) {
            event.preventDefault();
        }
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        setMouseDown(event.clientX);
    };

    const handleMouseUp = (event: React.MouseEvent) => {
        setMouseUp(event.clientX);
    };

    return (
        <Button buttonType={ButtonType.clear}>
            <Link 
                to={`/products/category/${category}`}
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