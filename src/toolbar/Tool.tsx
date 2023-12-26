import React from 'react';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type propTypes = {
    name: string,
    icon: IconDefinition
}

function Tool({name, icon}: propTypes) {
    return (
        <div className='toolbar__tool'>
            <FontAwesomeIcon icon={icon}/>
        </div>
    );
}

export default Tool;