export interface IElectronAPI {
    closeWindow: () => Promise<void>,
    openExportWindow: () => Promise<void>,
    exportImage: (data: {filename: string, filetype: string}) => Promise<void>,
    openResizeWindow: () => Promise<void>,
    resizeCanvas: (data: {width: number, height: number}) => Promise<void>,
}

export interface IPCAPI {
    on: (channel: string, func: Function) => Promise<void> 
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
        ipcRenderer: IPCAPI
    }
}