import {useState} from 'react';

function ResizeWindow() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const resize = () => {
        let data = {
            width: width,
            height: height,
        }

        window.electronAPI.resizeCanvas(data)
    }

    return (
        <div>
            <div> New Dimensions: </div>
            <div>
                <input 
                    type='number'
                    min='1'
                    step='1'
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value, 10))}
                ></input>
                <input 
                    type='number'
                    min='1'
                    step='1'
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value, 10))}
                ></input>
            </div>
            <div onClick={() => resize()}>Resize Window</div>
        </div>
    );
}

export default ResizeWindow;