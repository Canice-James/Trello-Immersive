'use strict'

const electron = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const os = require('os')
const path = require('path')
const config = require(path.join(__dirname, 'package.json'))
const BrowserWindow = electron.BrowserWindow

app.setName(config.productName)
var mainWindow = null
app.on('ready', function () {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    title: config.productName,
    show: false,
    frame: false,
    width: width,
    height: height,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      defaultEncoding: 'UTF-8'
    }
  })

  // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  mainWindow.loadURL('http://trello.com')
  mainWindow.setPosition(0,0)
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.insertCSS('#trello-root { background: transparent !important;}')
    mainWindow.webContents.insertCSS('html, body, root  { background: transparent !important;}')
    mainWindow.webContents.insertCSS('#header  { opacity: 0.01 !important;} #header:hover  { opacity: 1 !important;}')
    mainWindow.webContents.insertCSS('.board-header  { opacity: 0.01 !important;} .board-header:hover  { opacity: 1 !important;}')
    mainWindow.webContents.insertCSS('#board  { opacity: 0.2 !important; transition: opacity 1s;} #board:hover  { opacity: 1 !important;}')
  });


  electron.app.setLoginItemSettings({
      openAtLogin: true,
      path: electron.app.getPath("exe"),
      restoreState: true
  });

  // Enable keyboard shortcuts for Developer Tools on various platforms.
  let platform = os.platform()
  if (platform === 'darwin') {
    globalShortcut.register('Command+Option+I', () => {
      mainWindow.webContents.openDevTools()
    })
  } else if (platform === 'linux' || platform === 'win32') {
    globalShortcut.register('Control+Shift+I', () => {
      mainWindow.webContents.openDevTools()
    })
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.setMenu(null)
    mainWindow.show()
  })

  mainWindow.onbeforeunload = (e) => {
    // Prevent Command-R from unloading the window contents.
    e.returnValue = false
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})

app.on('window-all-closed', () => { app.quit() })
