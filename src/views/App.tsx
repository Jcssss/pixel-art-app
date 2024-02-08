import {useState, useEffect} from 'react';
import Canvas from '../canvas/Canvas';
import ColorPalette from '../color-palette/ColorPalette';
import './App.css';
import MenuFrame from '../menu/MenuFrame';
import Toolbar from '../toolbar/Toolbar';
import useHistory from '../hooks/useHistory';
import PixelHelpers from '../helpers/PixelHelpers';

const {ipcRenderer, electronAPI} = window;

function App() {
    const [pixels,, setPixels, nextPixels, prevPixels] = useHistory([''], 10);
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const [colorHistory, setColorHistory] = useState<string[]>([]);
    const [dimensions, setDimensions] = useState({height: 5, width: 5});
    const [activeTool, setActiveTool] = useState('Brush');
    const defaultColour: string = '#AAFFFF';

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

    useEffect(() => {
        resetPixels(5,5)
        ipcRenderer.on('resizeCanvasReady', (_: any, data: {width: number, height: number}) => {
            resetPixels(data.width, data.height)
        }); 

        // eslint-disable-next-line
    }, []);

    const menuFunctions = {
        quit: () => electronAPI.closeWindow(),
        resetCanvas: () => resetPixels(dimensions.height, dimensions.width),
        undo: () => prevPixels(),
        redo: () => nextPixels(),
        exportImage: () => electronAPI.openExportWindow(),
        resizeCanvas: () => electronAPI.openResizeWindow(),
    }

    const toolFunctions: {[key: string]: Function} = {
        Brush: (color: string, index: number) => colorPixel(color, index),
        Fill: (color: string, index: number) => fillPixels(color, index)
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

    const fillHelp = (colors: string[], startIndex: number): number[] => {

        let indexesToChange: number[] = [];
        indexesToChange.push(startIndex)

        let indexes: number[] = [];
        indexes.push(startIndex);

        while(indexes.length > 0){
            let currPix = indexes.pop();

            if (!currPix && currPix !== 0) {
                return [];
            }

            let currColor = colors[currPix];
            let nextPix: number[] = [];
            nextPix.push(PixelHelpers.getLeft(dimensions.width, dimensions.height, currPix));
            nextPix.push(PixelHelpers.getRight(dimensions.width, dimensions.height, currPix));
            nextPix.push(PixelHelpers.getUp(dimensions.width, dimensions.height, currPix));
            nextPix.push(PixelHelpers.getDown(dimensions.width, dimensions.height, currPix));

            console.log(nextPix);

            nextPix.forEach((pixelIndex) => {
                if (pixelIndex !== -1
                    && currColor === colors[pixelIndex]
                    && !indexesToChange.includes(pixelIndex)) {
                    
                    console.log(pixelIndex);
                    indexes.push(pixelIndex);
                    indexesToChange.push(pixelIndex);
                }
            });
        }

        return indexesToChange;
    }

    const fillPixels = (color: string, index: number): void => {
        let indexes: number[] = [];
        let colors: string[] = [];

        pixels.forEach((pixel) => {
            colors.push(pixel)
        });

        // find all of the indexes we need to update
        indexes = fillHelp(colors, index)
        console.log(indexes);

        // update the indexes to the current color
        indexes.forEach((index: number): void => {
            colors[index] = color;
        })

        setPixels(colors);
    }

    return (
        <div className='App'>
            <MenuFrame {...menuFunctions}/>
            <div className='canvas-container'>
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
                    setPixel={toolFunctions[activeTool]}
                    selectedColor={selectedColor}
                    setColorHistory={setColorHistory}
                />
            </div>
        </div>
    );
}

export default App;
