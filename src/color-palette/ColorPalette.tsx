import React, {useState} from 'react';
import { ChromePicker } from 'react-color';

type propTypes = {
    selectedColor: string,
    changeSelectedColor: Function,
}

function ColorPalette({selectedColor, changeSelectedColor}: propTypes) {

    const [pickerActive, setPickerActive] = useState(false);
    const [colorHistory, setColorHistory] = useState(['']);

    const togglePickerState = () => {
        setPickerActive((pickerActive) => !pickerActive);
    }

    return (
        <div className='palette__container'>
            <div className='palette__menu'>
                <div className='palette__options'>&middot;&middot;&middot;</div>
                <div 
                    className='palette__main-color palette__color'
                    style={{backgroundColor: selectedColor}}
                    onClick={() => togglePickerState()}
                ></div>
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