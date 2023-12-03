import React, {useState} from 'react';
import Submenu from './Submenu'

type propTypes = {
    resetCanvas: Function,
}

type submenuTypes = {
    itemName: string,
    click: Function,
}

type menuTypes = {
    menuName: string,
    menuItems: submenuTypes[]
}

function MenuFrame({resetCanvas}: propTypes) {
    const [activeMenu, setActiveMenu] = useState('None');

    const toggleMenu = (labelName: string): void => {
        setActiveMenu((oldState: string): string => {
            return (oldState === labelName)? 'None' : labelName
        })
    }

    const menu = [
        {
            'menuName': 'File',
            'menuItems': [
                {
                    'itemName': 'Quit',
                    'click': () => window.electronAPI.closeWindow()
                },
            ]
        },
        {
            'menuName': 'Edit',
            'menuItems': [
                {
                    'itemName': 'Clear Canvas',
                    'click': () => resetCanvas()
                },
            ]
        },
        {
            'menuName': 'View',
            'menuItems': [
                {
                    'itemName': 'Zoom In',
                    'click': () => {}
                },
                {
                    'itemName': 'Zoom Out',
                    'click': () => {}
                },
            ]
        },
    ]

    const createMenu = (): JSX.Element[] => {
        return menu.map((submenu: menuTypes): JSX.Element => {
            return <Submenu 
                key={submenu.menuName} 
                {...submenu}
                toggleMenu={() => toggleMenu(submenu.menuName)}
                activeMenu={activeMenu}
            />
        })
    }

    return (
        <div className='menu__frame'>
            {createMenu()}
        </div>
    );
}

export default MenuFrame;