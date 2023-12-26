import React from 'react';

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
    );
}

export default Toolbar;