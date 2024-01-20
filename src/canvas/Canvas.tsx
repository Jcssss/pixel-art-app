import Pixel from './Pixel';

type propTypes = {
    pixels: string[],
    setPixel: Function,
    selectedColor: string,
    dimensions: {height: number, width: number}
    setColorHistory: Function,
};

function Canvas ({ 
    dimensions, 
    pixels, 
    setPixel, 
    selectedColor,
    setColorHistory,
}: propTypes) {

    const rel: "relative" = "relative";

    const canvasStyle = {
        aspectRatio: `${dimensions.height} / ${dimensions.width}`,
        width: Math.min(dimensions.width * 50, 0.6 * window.innerWidth),
        position: rel,
        top: '0px',
        left: '0px',
        scale: `1`,
    }

    const onPixelClick = (selectedColor: string, index: number): void => {
        setPixel(selectedColor, index);
        setColorHistory((curHist: string[]): string[] => {
            let temp = curHist.filter((color) => color != selectedColor)

            return [selectedColor, ...temp].splice(0, 8)
        })
    }

    const drawPixels = (): JSX.Element[] => {
        return pixels.map((color: string, i: number): JSX.Element => (
            <Pixel
                key={i}
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