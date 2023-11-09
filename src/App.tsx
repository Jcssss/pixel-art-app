import React, {useState, useEffect} from 'react';
import Canvas from './canvas/Canvas';
import './App.css';

function App() {
    const [pixels, setPixels] = useState([['']]);
    const defaultColour: string = '#AAFFFF';

    useEffect(() => {
        resetPixels(5, 5);
    }, []);

    // resets all pixels on the canvas to the default colour
    const resetPixels = (width: number, height: number): void => {
        let temp: string[][] = [];

        for (let i: number = 0; i < height; i++) {
            temp.push([]);
            for (let j: number = 0; j < height; j++) {
                temp[i].push(defaultColour);
            }
        }

        setPixels(temp);
    } // resetPixels

    return (
        <div className='App'>
            <Canvas pixels={pixels}/>
        </div>
    );
}

export default App;
