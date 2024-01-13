import {useState, useEffect} from 'react';
import Canvas from './canvas/Canvas';
import ColorPalette from './color-palette/ColorPalette';
import './App.css';
import MenuFrame from './menu/MenuFrame';
import Toolbar from './toolbar/Toolbar';
import useHistory from './hooks/useHistory';
import html2canvas from "html2canvas";

function App() {
    const [pixels, pixelsHistory, setPixels, nextPixels, prevPixels] = useHistory([''], 10);
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const [colorHistory, setColorHistory] = useState<string[]>([]);
    const [dimensions, setDimensions] = useState({height: 5, width: 5});
    const [activeTool, setActiveTool] = useState('None');
    const defaultColour: string = '#AAFFFF';

    useEffect(() => {
        resetPixels(2, 2);
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

    const downloadImage = (url: string, fileName: string) => {
        const fakeLink = window.document.createElement('a');
        fakeLink.style.display = 'none';
        fakeLink.download = fileName;
        
        fakeLink.href = url;
        
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
        
        fakeLink.remove();
    };

    const menuFunctions = {
        resetCanvas: () => resetPixels(dimensions.height, dimensions.width),
        undo: () => prevPixels(),
        redo: () => nextPixels(),
        exportImage: (imageFileName: string) => {
            let element = document.getElementsByClassName('canvas')[0] as HTMLElement
            html2canvas(element).then((canvas) => {
                return canvas.toDataURL("image/png", 1.0);
            }).then((image) => {
                downloadImage(image, imageFileName);
            })
        }
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
