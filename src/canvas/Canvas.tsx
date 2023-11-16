import {useEffect} from 'react';
import Pixel from './Pixel';

type propTypes = {
    pixels: string[],
    onPixelClick: Function,
    selectedColor: string,
    dimensions: {height: number, width: number}
};

function Canvas({ dimensions, pixels, onPixelClick, selectedColor }: propTypes) {

    const rel: "relative" = "relative";

    const canvasStyle = {
        aspectRatio: `${dimensions.height} / ${dimensions.width}`,
        width: Math.min(dimensions.width * 50, 0.6 * window.innerWidth),
        position: rel,
        top: '0px',
        left: '0px',
        scale: `1`,
    }

    const drawPixels = (): JSX.Element[] => {
        return pixels.map((color: string, i: number): JSX.Element => (
            <Pixel
                color={color}
                onPixelClick={onPixelClick}
                selectedColor={selectedColor}
                canvasWidth={dimensions.width}
                index={i}
            />
        ))
    }

    return (
        <div 
            className='canvas'
            style={canvasStyle}
        >
            {drawPixels()}
        </div>
    );
}

export default Canvas;