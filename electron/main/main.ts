import { join } from 'path';
import {
    app,
    BrowserWindow,
    screen
} from 'electron';

const isDev = process.env.npm_lifecycle_event === "app:dev" ? true : false;


function createWindow() {
    const {width, height} = screen.getPrimaryDisplay().workAreaSize
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: join(__dirname, '../preload/preload.js'),
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(
        isDev ?
        'http://127.0.0.1:5174/' :
        join(__dirname, '../../index.html')
    );
    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});