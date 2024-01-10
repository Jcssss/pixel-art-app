import React, { useState } from 'react';

// Type declarations for History object
type historyType<T> = {
    prev: T[], 
    next: T[]
}

// Stores a value along with the previous and next values stored
const useHistory = <T,> (
    init: T,
): [T, historyType<T>, (newVal: T) => void, () => void, () => void] => {
    
    // The current value
    const [value, setValue] = useState<T>(init)

    // The previous and next values to be used (Undo/Redo)
    const [history, setHistory] = useState<historyType<T>>({prev: [], next: []})

    // Sets the current value
    const set = (newVal: T): void => {

        // Clears the next values, and adds the old value to the history
        setHistory(({ prev, next }): historyType<T> => ({
            prev: [...prev, value],
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
            setValue(history.next[history.next.length - 1])

            // Adds old value and removes new value from history
            setHistory(({ prev, next }): historyType<T> => ({
                prev: [...prev, valCopy],
                next: next.slice(0, history.next.length - 2)
            }))
        }
    }

    // Moves to the previous value
    const prev = (): void => {

        // Checks that there was a previous value
        if (history.prev.length > 0) {

            // Copies and updates the current value
            let valCopy = value;
            setValue(history.prev[history.prev.length - 1])
            
            // Updates history by adding old value and removing new
            setHistory(({ prev, next }): historyType<T> => ({
                prev: prev.slice(0, history.prev.length - 2),
                next: [...next, valCopy]
            }))
        }
    }

    return [value, history, set, next, prev]
}

export default useHistory;