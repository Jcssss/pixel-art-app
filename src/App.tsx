import {useState, useEffect} from 'react';
import Canvas from './canvas/Canvas';
import { ChromePicker } from 'react-color';
import './App.css';

function App() {
    const [pixels, setPixels] = useState(['']);
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const [dimensions, setDimensions] = useState({height: 5, width: 5})
    const defaultColour: string = '#AAFFFF';

    useEffect(() => {
        resetPixels(25, 25);
    }, []);

    // resets all pixels on the canvas to the default colour
    const resetPixels = (width: number, height: number): void => {
        let temp: string[] = [];

        for (let i: number = 0; i < height * width; i++) {
            temp.push(defaultColour);
        }

        setDimensions({
            height: height,
            width: width,
        });

        setPixels(temp);
    } // resetPixels

    // changes the selected color using the color picker
    const changeSelectedColor = (color: {hex: string}): void => {
        setSelectedColor(color.hex);
    } // changeSelectedColor

    // colors a pixel using the active color
    const colorPixel = (color: string, index: number): void => {
        let temp: string[] = [];

        pixels.forEach((pixel) => {
            temp.push(pixel)
        });

        temp[index] = color;
        setPixels(temp);
    } // colorPixel

    return (
        <div className='App'>
            <ChromePicker
                color={selectedColor}
                onChange={changeSelectedColor}
                disableAlpha={true}
            />
            <div className='canvas-container'>
                <Canvas 
                    dimensions={dimensions}
                    pixels={pixels}
                    onPixelClick={colorPixel}
                    selectedColor={selectedColor}
                />
            </div>
        </div>
    );
}

export default App;
