import React, {useState} from 'react';

type propTypes = {
    children: any
}

const Resizable = (props: propTypes) => {
    const [size, setSize] = useState({width: 400, height: 400});
    const widthBounds = {min: 20, max: 500};
    const heightBounds = {min: 170, max: 700}
    const mouseDownHandler = (
        mouseDownEvent: React.MouseEvent<HTMLElement>, 
        dirVector: number[]
    ) => {
        const startSize = {
            width: size.width,
            height: size.height
        }
        const startPosition = {
            x: mouseDownEvent.pageX,
            y: mouseDownEvent.pageY,
        }
        const checkBounds = (
            val: number, 
            bounds: {min: number, max: number}
        ): number => {
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
            let deltaX = (startPosition.x - mouseMoveEvent.pageX) * dirVector[0]
            let deltaY = (startPosition.y - mouseMoveEvent.pageY) * dirVector[1]
            let newWidth = startSize.width - deltaX
            let newHeight = startSize.height - deltaY
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

    const mainStyle = {
        width: `${size.width}px`, 
        height: `${size.height}px`,
        backgroundColor: 'grey',
        position: 'relative' as 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const dragStyle1 = {
        height: '100%',
        width: '5px',
        position: 'absolute' as 'absolute',
        right: '0px',
        backgroundColor: 'black'
    }

    const dragStyle2 = {
        height: '100%',
        width: '5px',
        position: 'absolute' as 'absolute',
        left: '0px',
        backgroundColor: 'black'
    }

    const dragStyle3 = {
        height: '5px',
        width: '100%',
        position: 'absolute' as 'absolute',
        bottom: '0px',
        backgroundColor: 'black'
    }

    const dragStyle4 = {
        height: '5px',
        width: '100%',
        position: 'absolute' as 'absolute',
        top: '0px',
        backgroundColor: 'black'
    }

    return (
        <div style={mainStyle}>
            <div 
                style={dragStyle1} 
                onMouseDown={(e) => mouseDownHandler(e, [1, 0])}
            ></div>
            <div 
                style={dragStyle2} 
                onMouseDown={(e) => mouseDownHandler(e, [-1, 0])}
            ></div>
            <div 
                style={dragStyle3} 
                onMouseDown={(e) => mouseDownHandler(e, [0, 1])}
            ></div>
            <div 
                style={dragStyle4} 
                onMouseDown={(e) => mouseDownHandler(e, [0, -1])}
            ></div>
            {props.children}
        </div>
    );
}

export default Resizable;