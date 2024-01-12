import React, { useEffect } from 'react';

const useCloseClick = <T,>(
    closeValue: T,
    moniterVar: T,
    setVar: Function,
    classesToIgnore: string[]
): void => {

    // Gets and returns an array of all elements that if clicked 
    // should not close the given element
    const getIgnoreElements = (): Element[] => {
        let elements: Element[] = [];
        classesToIgnore.forEach((className) => {
            let classElements = document.getElementsByClassName(className)
            elements = elements.concat(Array.from(classElements))
        })
        return elements;
    } // getIgnoreElements

    // Checks for a click outside of the element and closes accordingly
    const handleClick = (e: Event): void => {
        let element = e.target as Element;

        if (!getIgnoreElements().includes(element)){
            setVar(closeValue);
        }
    } // handleClick

    // Adds the click event handler
    useEffect(() => {
        if (moniterVar != closeValue) {
            document.addEventListener('click', handleClick);

            return (): void => {
                document.removeEventListener('click', handleClick);
            };
        }
    }, [moniterVar, closeValue, handleClick])
}

export default useCloseClick;