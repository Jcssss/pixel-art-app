import React, { ReactElement } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './views/App';
import ExportWindow from './views/ExportWindow';

type viewTypes = {
    [key: string]: ReactElement;
}

const ViewManager = () => {
    let Views: viewTypes = {
        'exportWin': <ExportWindow/>,
        'mainWin': <App/>
    }

    const getView = (): ReactElement => {
        const params = new URLSearchParams(window.location.search);
        const page: string|null = params.get('page');
        
        if (page) {
            return Views[page];
        }

        return Views['mainWin'];
    }

    return (
        <>
            {getView()}
        </>
    )
}

export default ViewManager;