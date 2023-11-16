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

    const pixelStyle = {
        backgroundColor: (isHovered)? selectedColor : color,
        width: `${100 / canvasWidth}%`,
    };

    return (
        <div 
            className='canvas__pixel'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onPixelClick(selectedColor, index)}
            style={pixelStyle}>
        </div>
    );
}

export default Pixel;