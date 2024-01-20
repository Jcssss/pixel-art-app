import React, {useState, useEffect} from 'react';
import Submenu from './Submenu';
import useCloseClick from '../hooks/useCloseClick';

type functionTypes = {
    quit: () => Promise<void>,
    resizeCanvas: () => Promise<void>,
    exportImage: () => Promise<void>,
    undo: () => void,
    redo: () => void,
    resetCanvas: () => void,
}

type submenuTypes = {
    itemName: string,
    click: Function,
}

type menuTypes = {
    menuName: string,
    menuItems: submenuTypes[]
}

// The top menu bar for the application
function MenuFrame({
    quit, exportImage, resizeCanvas, undo, redo, resetCanvas
}: functionTypes) {

    // Tracks the active submenu
    const [activeMenu, setActiveMenu] = useState('None');

    useCloseClick('None', activeMenu, setActiveMenu, ['submenu__label', 'submenu__item'])

    // Toggles the current submenu
    const toggleMenu = (labelName: string): void => {
        setActiveMenu((oldState: string): string => {
            return (oldState === labelName)? 'None' : labelName
        })
    } // toggleMenu

    // Stores the list of menu's and submenu's
    const menu = [
        {
            'menuName': 'File',
            'menuItems': [
                {
                    'itemName': 'Quit',
                    'click': () => quit()
                },
                {
                    'itemName': 'Export',
                    'click': () => exportImage()
                }
            ]
        },
        {
            'menuName': 'Edit',
            'menuItems': [
                {
                    'itemName': 'Resize Canvas',
                    'click': () => resizeCanvas()
                },
                {
                    'itemName': 'Clear Canvas',
                    'click': () => resetCanvas()
                },
                {
                    'itemName': 'Undo',
                    'click': () => undo()
                },
                {
                    'itemName': 'Redo',
                    'click': () => redo()
                }
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
    ] // menu

    // Creates the menu and submenu
    const createMenu = (): JSX.Element[] => {
        return menu.map((submenu: menuTypes): JSX.Element => {
            return <Submenu 
                key={submenu.menuName} 
                {...submenu}
                toggleMenu={() => toggleMenu(submenu.menuName)}
                activeMenu={activeMenu}
            />
        })
    } // createMenu

    return (
        <div className='menu__frame'>
            {createMenu()}
        </div>
    );
}

export default MenuFrame;