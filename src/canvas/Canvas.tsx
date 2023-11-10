import Row from './Row';

type propTypes = {
    pixels: string[][],
    onPixelClick: Function,
    selectedColor: string,
};

function Canvas({ pixels, onPixelClick, selectedColor }: propTypes) {
    return (
        <div className='canvas'>
            {pixels.map((row: string[], i: number): JSX.Element => (
                <Row 
                    row={i}
                    pixels={row}
                    onPixelClick={onPixelClick}
                    selectedColor={selectedColor}
                />
            ))}
        </div>
    );
}

export default Canvas;