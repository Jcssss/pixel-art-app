import React from 'react';
import Row from './Row';

type propTypes = {
    pixels: string[][];
};

function Canvas({ pixels }: propTypes) {
    return (
        <div className='canvas'>
            {pixels.map((row: string[]): JSX.Element => (
                <Row pixels={row}/>
            ))}
        </div>
    );
}

export default Canvas;