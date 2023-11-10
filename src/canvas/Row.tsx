import Pixel from './Pixel';

type propTypes = {
    pixels: string[],
    onPixelClick: Function,
    selectedColor: string,
    row: number,
};

function Row({ pixels, onPixelClick, selectedColor, row }: propTypes) {
    return (
        <div className='canvas-row'>
            {pixels.map((color: string, j: number): JSX.Element => (
                <Pixel 
                    location={[row, j]}
                    color={color} 
                    onPixelClick={onPixelClick}
                    selectedColor={selectedColor}
                />
            ))}
        </div>
    );
}

export default Row;