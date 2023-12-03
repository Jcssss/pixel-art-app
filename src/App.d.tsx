export interface IElectronAPI {
    closeWindow: () => Promise<void>,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}