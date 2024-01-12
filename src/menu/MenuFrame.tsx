import React, {useState, useEffect} from 'react';
import Submenu from './Submenu'

type propTypes = {
    resetCanvas: Function,
    undo: Function,
    redo: Function,
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
function MenuFrame({resetCanvas, undo, redo}: propTypes) {

    // Tracks the active submenu
    const [activeMenu, setActiveMenu] = useState('None');

    // Toggles the current submenu
    const toggleMenu = (labelName: string): void => {
        setActiveMenu((oldState: string): string => {
            return (oldState === labelName)? 'None' : labelName
        })
    } // toggleMenu

    // Checks if a click is outside of the submenu and closes the submenu
    // accordingly
    const handleClick = (e: Event) => {
        let element = e.target as HTMLElement
        if (!Array.from(document.getElementsByClassName('submenu__label')).includes(element)
         && !Array.from(document.getElementsByClassName('submenu__item')).includes(element)){
            setActiveMenu('None');
        }
    } // handleClick

    // Sets up the click event handlers
    useEffect(() => {
        if (activeMenu != 'None') {
            document.addEventListener('click', handleClick);

            return (): void => {
                document.removeEventListener('click', handleClick);
            };
        }
    }, [activeMenu])

    // Stores the list of menu's and submenu's
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