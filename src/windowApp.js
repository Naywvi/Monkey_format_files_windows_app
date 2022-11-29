const { app, BrowserWindow } = require('electron')
const path = require('path')

module.exports = class NayForm{
    constructor(){
        const createWindow = () => {
            const win = new BrowserWindow({
              width: 500,
              height: 400,
              webPreferences: {
                preload: path.join(__dirname, './node/preload.js'),
                contextIsolation: true,
                },
                icon: __dirname + '/icon/monkey.ico',
                resizable: false,
            })
            win.setMenuBarVisibility(false)
            win.loadFile('./src/window/index.html')
        }
          
        app.whenReady().then(() => {
            createWindow()
            app.on('activate', () => {
                if (BrowserWindow.getAllWindows().length === 0) createWindow()
            })
        })
          
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
    }
}