import React, {useState, useEffect, MouseEvent} from 'react';
import { ChromePicker } from 'react-color';
import useCloseClick from '../hooks/useCloseClick';

type propTypes = {
    selectedColor: string,
    changeSelectedColor: Function,
    colorHistory: string[],
}

// The color selector and color palette menu
function ColorPalette({
    selectedColor, 
    changeSelectedColor,
    colorHistory,
}: propTypes) {

    // Tracks whether the color picker should be visible
    const [pickerActive, setPickerActive] = useState(false);

    useCloseClick(false, pickerActive, setPickerActive, ['palette__picker', 'palette__main-color'])

    // Toggles the state of the picker between true and false
    const togglePickerState = () => {
        setPickerActive((pickerActive) => !pickerActive);
    } // togglePickerState

    const [size, setSize] = useState({width: 30, height: 90});
    const widthBounds = {min: 20, max: 100};
    const heightBounds = {min: 170, max: 400}
    const mouseDownHandler = (mouseDownEvent: React.MouseEvent<HTMLElement>) => {
        const startSize = {
            width: size.width,
            height: size.height
        }
        const startPosition = {
            x: mouseDownEvent.pageX,
            y: mouseDownEvent.pageY,
        }
        const checkBounds = (val: number, bounds: {min: number, max: number}): number => {
            if (val > bounds.max) {
                return bounds.max
            } else if (val < bounds.min) {
                return bounds.min
            } else {
                return val
            }
        }
        function onMouseMove(mouseMoveEvent: any) {
            mouseMoveEvent.preventDefault();
            let newWidth = startSize.width - startPosition.x + mouseMoveEvent.pageX
            let newHeight = startSize.height - startPosition.y + mouseMoveEvent.pageY
            setSize({
                width: checkBounds(newWidth, widthBounds),
                height: checkBounds(newHeight, heightBounds)
            });
        }
        function onMouseUp() {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }
        
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }

    return (
        <div className='palette__container'>
            <div style={{height: '100%', width: '5px', position: 'absolute', right: '-5px', backgroundColor: 'black'}} onMouseDown={mouseDownHandler}></div>
            <div style={{width: `${size.width}px`, height: `${size.height}px`}} className='palette__menu'>
                <div className='palette__options'>&middot;&middot;&middot;</div>
                <div 
                    className='palette__main-color palette__color'
                    style={{backgroundColor: selectedColor}}
                    onClick={() => togglePickerState()}
                ></div>
                {colorHistory.map((color) => {
                    return <div className='palette__color' key={color}
                        style={{backgroundColor: color}}
                        onClick={() => changeSelectedColor(color)}
                    ></div>
                })}
            </div>
            <div 
                className='palette__picker-container'
                style={{display: (pickerActive)? 'block' :'none'}}
            >
                <ChromePicker
                    className='palette__picker'
                    color={selectedColor}
                    onChange={(color: {hex: string}) => changeSelectedColor(color.hex)}
                    disableAlpha={true}
                />
            </div>
        </div>
    );
}

export default ColorPalette;