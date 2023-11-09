import React from 'react';

type propTypes = {
    color: string;
};

function Pixel({ color }: propTypes) {
    return (
        <div 
            className='canvas-pixel'
            style={{
                backgroundColor: color,
                height: '50px',
                width: '50px'
            }}>
        </div>
    );
}

export default Pixel;