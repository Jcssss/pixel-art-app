export interface IElectronAPI {
    closeWindow: () => Promise<void>,
    openExportWindow: () => Promise<void>,
    exportImage: (data: {filename: string, filetype: string}) => Promise<void>,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}