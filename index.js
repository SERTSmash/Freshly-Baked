'use strict';
const electron = require('electron');
const app = electron.app;

// Prevent window being garbage collected
let mainWindow;

function onClosed() {
	// Dereference the window
	// For multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 1024,
		height: 640
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);
	win.maximize();
	win.setMenu(null);
	win.webContents.openDevTools();

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
