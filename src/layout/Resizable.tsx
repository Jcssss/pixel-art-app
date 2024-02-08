import React, {ReactElement, useState} from 'react';
import './resizable.css';

type propTypes = {
    children: any,
    className: string,
    startHeight?: number,
    startWidth?: number,
    changeHeight?: boolean,
    changeWidth?: boolean,
    bounds?: {
        width: {min: number, max: number},
        height: {min: number, max: number}
    },
    directions?: string
}

const Resizable = ({
    children, 
    className, 
    startHeight = 200, 
    startWidth = 200,
    changeHeight = true,
    changeWidth = true,
    bounds = {
        width: {min: 50, max: 200},
        height: {min: 50, max: 200}
    },
    directions = 'right left up down'
}: propTypes) => {
    const [size, setSize] = useState({width: startWidth, height: startHeight});
    const widthBounds = bounds.width;
    const heightBounds = bounds.height;
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
        width: (changeWidth)? `${size.width}px`: '100%', 
        height: (changeHeight)? `${size.height}px`: '100%',
        backgroundColor: 'black',
    }

    const dragData = [
        {name: 'right', vector: [1, 0]},
        {name: 'left', vector: [-1, 0]},
        {name: 'up', vector: [0, -1]},
        {name: 'down', vector: [0, 1]},
    ]

    const getSliders = ():ReactElement[]  => {
        return dragData.map((data: {name: string, vector:number[]}):ReactElement => {
            
            if (directions.includes(data.name)) {
                return <div 
                    className={`drag ${data.name}`} 
                    onMouseDown={(e) => mouseDownHandler(e, data.vector)}
                    key={data.name}
                ></div>
            }

            return <React.Fragment key={data.name}></React.Fragment>
        })
    }

    return (
        <div style={mainStyle} className={className}> 
            <div className='resizable__content-container'>
                {getSliders()}
                {children}
            </div>
        </div>
    );
}

export default Resizable;