import {useState} from 'react';

type propTypes = {
    color: string,
    onPixelClick: Function,
    selectedColor: string,
    location: [number, number],
};

function Pixel({ color, onPixelClick, selectedColor, location }: propTypes) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className='canvas-pixel'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onPixelClick(selectedColor, location)}
            style={{
                backgroundColor: (isHovered)? selectedColor : color,
                height: '50px',
                width: '50px',
            }}>
        </div>
    );
}

export default Pixel;