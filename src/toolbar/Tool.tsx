import React, {useState} from 'react';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type propTypes = {
    setActiveTool: Function,
    active: boolean
    name: string,
    icon: IconDefinition
}

function Tool({setActiveTool, active, name, icon}: propTypes) {
    const [hovered, setHovered] = useState(false);

    return (
            <div 
                className={`toolbar__tool ${(active)? 'selected' : ''}`}
                onClick={() => setActiveTool(name)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <FontAwesomeIcon icon={icon}/>
                <div className={`toolbar__tool-label ${(hovered)? 'hovered' : ''}`}>{name}</div>
            </div>
    )
}

export default Tool;