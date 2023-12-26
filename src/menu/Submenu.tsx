import React from 'react';

type propTypes = {
    menuName: string,
    menuItems: {itemName: string, click: Function}[],
    toggleMenu: Function,
    activeMenu: string,
}

function Submenu({menuName, menuItems, toggleMenu, activeMenu}: propTypes) {

    const createMenuItems = (): JSX.Element => {
        return (
            <ul 
                style={{display: `${(activeMenu == menuName)? 'block' : 'none'}`}}
                className='submenu__list'
            >
                {
                    menuItems.map((item: {itemName: string, click: Function}): JSX.Element => 
                        <li 
                            onClick={() => {
                                item.click()
                                toggleMenu()
                            }}
                            className='submenu__item'
                            key={item.itemName}
                        >
                            {item.itemName}
                        </li>
                    )
                }
            </ul>
        )
    }

    return (
        <div className='submenu'>
            <label 
                className='submenu__label' 
                onClick={() => toggleMenu()}
            >
                {menuName}
            </label>
            {createMenuItems()}
        </div>
    );
}

export default Submenu;