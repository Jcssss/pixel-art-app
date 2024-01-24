import {useState} from 'react';
import './ResizeWindow.css';

function ResizeWindow() {
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [error, setError] = useState('');

    const max = 50;
    const min = 1;

    const resize = () => {
        if (validateInput(height) && validateInput(width)) {
            let data = {
                width: parseInt(width, 10),
                height: parseInt(height, 10),
            }
    
            window.electronAPI.resizeCanvas(data)
        } else {
            if (height === '' || width === '') {
                setError('*One or more fields need to be filled.');
            }

            setError('*Values should be between 1 and 50 (inclusive)');
        }
    }

    const checkBounds = (input: string): boolean => {
        return parseInt(input, 10) <= max && parseInt(input, 10) >= min
    }

    const validateInput = (input: string): boolean => {
        return input !== '' && checkBounds(input);
    }

    return (
        <div className='resize__container'>
            <div className='resize__label'> New Dimensions: </div>
            <div className='resize__error'>{error}</div>
            <div className='resize__input-container'>
                <input 
                    className='resize__input width'
                    type='number'
                    min='1'
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                ></input>
                <input 
                    className='resize__input height'
                    type='number'
                    min='1'
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                ></input>
            </div>
            <div 
                onClick={() => resize()}
                className='resize__submit'
            >
                Resize Window
            </div>
        </div>
    );
}

export default ResizeWindow;