const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipc = electron.ipcMain

app.on("ready", _=>{
    console.log("ret-2-go!");
    mainWindow = new BrowserWindow({ width:300, height:500});
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    const menu = Menu.buildFromTemplate(myTemplate);
    Menu.setApplicationMenu(menu);

    mainWindow.on("closed", _=>{
        mainWindow = null;
        console.log("BYEEIII");
    });
});

const myTemplate = [{
    label: "About",
    click: _=>{
        console.log("you clicked me!")
        }
    //look at vids for more menu stuff
    }
]

ipc.on("countdown-start", (evt,arg) =>{
    let count=3;
    let timer = setInterval(_=>{
        console.log("count" + count);
        count--
        mainWindow.webContents.send("cpountdown", count)
        if (count==0){
            clearInterval(timer)
        }
    }, 1000)
})