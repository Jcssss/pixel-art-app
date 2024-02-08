import React from 'react';
import Resizable from '../layout/Resizable';

import { 
    faPaintBrush, 
    faArrowsUpDownLeftRight,
    faFillDrip,
    faShapes,
} from '@fortawesome/free-solid-svg-icons'

import {
    //IconLookup,
    IconDefinition,
    //findIconDefinition
} from '@fortawesome/fontawesome-svg-core'

import Tool from './Tool'

type propTypes = {
    setActiveTool: Function,
    activeTool: string
}

function Toolbar({setActiveTool, activeTool}: propTypes) {
    const tools = [
        {
            name: 'Brush',
            icon: faPaintBrush, 
        },
        { 
            name: 'Fill',
            icon: faFillDrip,
        },
        {
            name: 'Move',
            icon: faArrowsUpDownLeftRight
        },
        {
            name: 'Shapes',
            icon: faShapes,
        }
    ]

    return (
        <Resizable  
            className='toolbar__resizable'
            directions='left'
            changeHeight={false}
            startWidth={30}
            bounds={{width: {max: 60, min: 20}, height: {max: 0, min: 0}}}
        >
            <div className='toolbar__frame'>
                {
                    tools.map((tool: {name: string, icon: IconDefinition}): JSX.Element => 
                        <Tool
                            key={tool.name}
                            setActiveTool={setActiveTool}
                            active={activeTool == tool.name}
                            name={tool.name}
                            icon={tool.icon}
                        />
                    )
                }
            </div>
        </Resizable>
    );
}

export default Toolbar;