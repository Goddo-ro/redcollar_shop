import { ReactNode, useRef, useState } from 'react';

type DraggableListProps = {
    children: ReactNode[]
    listClass?: string
    childClass?: string
    childRenderer?: (child: ReactNode) => ReactNode | JSX.Element;
};

const DraggableList = ({ children, listClass = '', childClass = '', childRenderer }: DraggableListProps) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [startX, setStartX] = useState<number>(0);
    const [scrollLeft, setScrollLeft] = useState<number>(0);

    const listRef = useRef<HTMLUListElement>(null);

    const move = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!mouseDown) return;

        const x = event.pageX - (listRef.current?.offsetLeft || 0);
        const scroll = x - startX;
        listRef.current?.scrollLeft;
        if (listRef.current) listRef.current.scrollLeft = scrollLeft - scroll;
    };

    const startDragging = (event: React.MouseEvent) => {
        setMouseDown(true);
        setStartX(event.pageX - (listRef.current?.offsetLeft || 0));
        listRef.current?.scrollLeft && setScrollLeft(listRef.current?.scrollLeft);
    };

    const stopDragging = () => {
        setMouseDown(false);
    };

    return (
        <ul className={listClass}
            onMouseMove={move}
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            ref={listRef}
        >
            {children.map((child, i) => (
                <li className={childClass} key={i}>
                    {
                        childRenderer ? childRenderer(child) : child
                    }
                </li>
            ))}
        </ul>
    );
};

export default DraggableList;