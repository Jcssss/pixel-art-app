import React, {useState} from 'react';
import { ChromePicker } from 'react-color';
import useCloseClick from '../hooks/useCloseClick';
import Resizable from '../layout/Resizable';

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

    return (
        <Resizable 
            className='palette__resizable'
            directions='right'
            changeHeight={false}
            startWidth={30}
            bounds={{width: {max: 60, min: 20}, height: {max: 0, min: 0}}}
        >
        <div className='palette__container'>
            <div className='palette__menu'>
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
        </Resizable>
    );
}

export default ColorPalette;