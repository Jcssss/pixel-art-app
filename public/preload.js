const { contextBridge, ipcRenderer } = require('electron')
const html2canvas = require("html2canvas");

contextBridge.exposeInMainWorld('electronAPI', {
    closeWindow: () => ipcRenderer.send('quit', 0),
    openExportWindow: () => ipcRenderer.send('openExport', 0),
    exportImage: (data) => ipcRenderer.send('exportImage', data)
})

const downloadImage = (url, fileName) => {
    const fakeLink = window.document.createElement('a');
    fakeLink.style.display = 'none';
    fakeLink.download = fileName;
    
    fakeLink.href = url;
    
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    
    fakeLink.remove();
};

ipcRenderer.on('exportImageReady', (_, data) => {
    let element = document.getElementsByClassName('canvas')[0]
    
    html2canvas(element).then((canvas) => {
        return canvas.toDataURL(`image/${data.filetype}`, 1.0);
    }).then((image) => {
        downloadImage(image, data.filename);
    })
});