const { contextBridge, ipcRenderer } = require('electron')
const html2canvas = require("html2canvas");

// Controls electron events and exposes to rest of program
contextBridge.exposeInMainWorld('electronAPI', {
    closeWindow: () => ipcRenderer.send('quit', 0),
    openExportWindow: () => ipcRenderer.send('openExport', 0),
    exportImage: (data) => ipcRenderer.send('exportImage', data),
    openResizeWindow: () => ipcRenderer.send('openResize', 0), 
    resizeCanvas: (data) => ipcRenderer.send('resizeCanvas', data)
})

// exposes electron.on function
contextBridge.exposeInMainWorld('ipcRenderer', {
    on: (channel, func) => ipcRenderer.on(channel, (_, data) => func(_, data))
})

// Downloads an image given a url and filename
const downloadImage = (url, filename) => {
    const fakeLink = window.document.createElement('a');
    fakeLink.style.display = 'none';
    fakeLink.download = filename;
    
    fakeLink.href = url;
    
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    
    fakeLink.remove();
};

// When ready, exports the canvas element as a specified image format
ipcRenderer.on('exportImageReady', (_, data) => {
    let element = document.getElementsByClassName('canvas')[0]
    
    html2canvas(element).then((canvas) => {
        return canvas.toDataURL(`image/${data.filetype}`, 1.0);
    }).then((image) => {
        downloadImage(image, data.filename);
    })
});