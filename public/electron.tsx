const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
let mainWindow, exportWindow, resizeWindow;

// Closes a specific window on quit event
function handleQuit (event, _){
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)

    if (win != null) {
        win.close()
    }
}

// Opens the export window
function openExport (event, _){
    if (exportWindow && !exportWindow.isDestroyed() && exportWindow.isFocusable()) {
        exportWindow.close()
    }

    exportWindow = createWindow('exportWin', 400, 300)
}

// Opens the resize window
function openResize (event, _){
    if (resizeWindow && !resizeWindow.isDestroyed() && resizeWindow.isFocusable()) {
        resizeWindow.close()
    }

    resizeWindow = createWindow('resizeWin', 400, 300)
}

// Closes the export window and tells the main window to export image
function handleExportImage (mainWindow, data) {
    mainWindow.webContents.send('exportImageReady', data)
    exportWindow.close()
}

// Closes the export window and tells the main window to export image
function handleResizeCanvas (mainWindow, data) {
    mainWindow.webContents.send('resizeCanvasReady', data)
    resizeWindow.close()
}

// Generates an URL with a page parameter
function getURL (page = 'mainWin') {
    return (
        isDev
        ? `http://localhost:3000?page=${page}`
        : `file://${path.join(__dirname, `../build/index.html?page=${page}`)}`
    )
}

// Creates a window with a specified height, width and page parameter
function createWindow(page='mainWin', width=800, height=600) {
    // Create the browser window.
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            sandbox: false
        },
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(getURL(page));

    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
    win.setMenu(null);

    return win;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    mainWindow = createWindow();

    ipcMain.on('quit', handleQuit)
    ipcMain.on('openExport', openExport)
    ipcMain.on('openResize', openResize)
    ipcMain.on('exportImage', (_, data) => handleExportImage(mainWindow, data))
    ipcMain.on('resizeCanvas', (_, data) => handleResizeCanvas(mainWindow, data))
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});