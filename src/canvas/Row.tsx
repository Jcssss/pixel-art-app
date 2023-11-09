import React from 'react';
import Pixel from './Pixel';

type propTypes = {
    pixels: string[];
};

function Row({ pixels }: propTypes) {
    return (
        <div className='canvas-row'>
            {pixels.map((color: string): JSX.Element => (
                <Pixel color={color} />
            ))}
        </div>
    );
}

export default Row;