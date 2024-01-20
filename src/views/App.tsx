import {useState, useEffect} from 'react';
import Canvas from '../canvas/Canvas';
import ColorPalette from '../color-palette/ColorPalette';
import './App.css';
import MenuFrame from '../menu/MenuFrame';
import Toolbar from '../toolbar/Toolbar';
import useHistory from '../hooks/useHistory';
const {ipcRenderer, electronAPI} = window;

function App() {
    const [pixels,, setPixels, nextPixels, prevPixels] = useHistory([''], 10);
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const [colorHistory, setColorHistory] = useState<string[]>([]);
    const [dimensions, setDimensions] = useState({height: 5, width: 5});
    const [activeTool, setActiveTool] = useState('None');
    const defaultColour: string = '#AAFFFF';

    useEffect(() => {
        resetPixels(5,5)
        ipcRenderer.on('resizeCanvasReady', (_: any, data: {width: number, height: number}) => {
            resetPixels(data.width, data.height)
        });
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

    const menuFunctions = {
        quit: () => electronAPI.closeWindow(),
        resetCanvas: () => resetPixels(dimensions.height, dimensions.width),
        undo: () => prevPixels(),
        redo: () => nextPixels(),
        exportImage: () => electronAPI.openExportWindow(),
        resizeCanvas: () => electronAPI.openResizeWindow(),
    }

    // changes the selected color using the color picker
    const changeSelectedColor = (colorHex: string): void => {
        setSelectedColor(colorHex);
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
            <div className='canvas-container'>
                <MenuFrame {...menuFunctions}/>
                <Toolbar 
                    setActiveTool={setActiveTool}
                    activeTool={activeTool}
                />
                <ColorPalette
                    selectedColor={selectedColor}
                    changeSelectedColor={changeSelectedColor}
                    colorHistory={colorHistory}
                />
                <Canvas 
                    dimensions={dimensions}
                    pixels={pixels}
                    setPixel={colorPixel}
                    selectedColor={selectedColor}
                    setColorHistory={setColorHistory}
                />
            </div>
        </div>
    );
}

export default App;
