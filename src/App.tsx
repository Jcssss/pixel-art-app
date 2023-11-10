import {useState, useEffect} from 'react';
import Canvas from './canvas/Canvas';
import { ChromePicker } from 'react-color';
import './App.css';

function App() {
    const [pixels, setPixels] = useState([['']]);
    const [selectedColor, setSelectedColor] = useState('#FFFFFF')
    const defaultColour: string = '#AAFFFF';

    useEffect(() => {
        resetPixels(5, 5);
    }, []);

    // resets all pixels on the canvas to the default colour
    const resetPixels = (width: number, height: number): void => {
        let temp: string[][] = [];

        for (let i: number = 0; i < height; i++) {
            temp.push([]);
            for (let j: number = 0; j < width; j++) {
                temp[i].push(defaultColour);
            }
        }

        setPixels(temp);
    } // resetPixels

    // changes the selected color using the color picker
    const changeSelectedColor = (color: {hex: string}): void => {
        setSelectedColor(color.hex);
    } // changeSelectedColor

    // colors a pixel using the active color
    const colorPixel = (color: string, location: [number, number]): void => {
        let temp: string[][] = [];

        pixels.forEach((row) => {
            temp.push([...row])
        });

        temp[location[0]][location[1]] = color;
        setPixels(temp);
    } // colorPixel

    return (
        <div className='App'>
            <ChromePicker
                color={selectedColor}
                onChange={changeSelectedColor}
                disableAlpha={true}
            />
            <Canvas 
                pixels={pixels}
                onPixelClick={colorPixel}
                selectedColor={selectedColor}
            />
        </div>
    );
}

export default App;
