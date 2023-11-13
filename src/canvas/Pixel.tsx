import {useState} from 'react';

type propTypes = {
    color: string,
    onPixelClick: Function,
    selectedColor: string,
    index: number,
    canvasWidth: number,
};

function Pixel({ color, onPixelClick, selectedColor, index, canvasWidth }: propTypes) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className='canvas-pixel'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onPixelClick(selectedColor, index)}
            style={{
                backgroundColor: (isHovered)? selectedColor : color,
                width: `${100 / canvasWidth}%`,
            }}>
        </div>
    );
}

export default Pixel;