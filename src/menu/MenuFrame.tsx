import React, {useState} from 'react';

type propTypes = {
    clear: Function,
}

function MenuFrame({clear}: propTypes) {
    const [activeMenu, setActiveMenu] = useState('None');

    const toggleMenu = (labelName: string): void => {
        setActiveMenu((oldState: string): string => {
            return (oldState === labelName)? 'None' : labelName
        })
    }

    return (
        <div className='menu__frame'>
            <div>
                <label onClick={() => toggleMenu('File')}> File </label>
                <ul style={{display: `${(activeMenu == 'File')? 'block' : 'none'}`}}>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
            <div>
                <label onClick={() => toggleMenu('Edit')}> Edit </label>
                <ul style={{display: `${(activeMenu == 'Edit')? 'block' : 'none'}`}}>
                    <li onClick={() => clear()}>Clear Canvas</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>    
            <div>
                <label onClick={() => toggleMenu('View')}> View </label>
                <ul style={{display: `${(activeMenu == 'View')? 'block' : 'none'}`}}>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
        </div>
    );
}

export default MenuFrame;