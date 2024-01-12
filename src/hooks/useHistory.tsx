import { useState } from 'react';

// Type declarations for History object
type historyType<T> = {
    prev: T[], 
    next: T[]
}

// Stores a value along with the previous and next values stored
const useHistory = <T,> (
    init: T,
    maxHistorySize: number,
): [T, historyType<T>, (newVal: T) => void, () => void, () => void] => {
    
    // The current value
    const [value, setValue] = useState<T>(init)

    // The previous and next values to be used (Undo/Redo)
    const [history, setHistory] = useState<historyType<T>>({prev: [], next: []})

    // Trims an array so that it is within the size limits
    const trim = (arr: T[]): T[] => {
        if (arr.length > maxHistorySize) {
            return arr.splice(0, maxHistorySize);
        }

        return arr;
    }

    // Sets the current value
    const set = (newVal: T): void => {

        // Clears the next values, and adds the old value to the history
        setHistory(({ prev, next }): historyType<T> => ({
            prev: trim([value, ...prev]),
            next: []
        }))

        setValue(newVal)
    }

    // Moves to the next value
    const next = (): void => {

        // Confirms that there is a next value
        if (history.next.length > 0) {

            // Copies and updates the current value
            let valCopy = value;
            setValue(history.next[0])

            // Adds old value and removes new value from history
            setHistory(({ prev, next }): historyType<T> => ({
                prev: trim([valCopy, ...prev]),
                next: next.slice(1, next.length)
            }))
        }
    }

    // Moves to the previous value
    const prev = (): void => {

        console.log('Hello');
        
        // Checks that there was a previous value
        if (history.prev.length > 0) {

            // Copies and updates the current value
            let valCopy = value;
            setValue(history.prev[0])
            
            // Updates history by adding old value and removing new
            setHistory(({ prev, next }): historyType<T> => ({
                prev: prev.slice(1, prev.length),
                next: trim([valCopy, ...next])
            }))
        }
    }

    return [value, history, set, next, prev]
}

export default useHistory;