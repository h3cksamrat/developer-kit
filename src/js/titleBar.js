const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;

window.onload = function(){
    const closeButton = document.getElementById("closeBtn");
    closeButton.addEventListener('click', ()=>{
        ipc.send('closeApp');
    });

    const minimizeButton = document.getElementById("minimizeBtn");
    minimizeButton.addEventListener('click', ()=>{
        ipc.send('minimizeApp');
    });

    const maxrestoreButton = document.getElementById("maxResBtn");
    maxrestoreButton.addEventListener('click', ()=>{
        ipc.send('maximizeRestoreApp');
    });

    const maxResBtn = document.getElementById("maxResBtn");
    function changeMaxResBtn(isMaximizedApp){
        if(isMaximizedApp){
            maxResBtn.title = 'Restore';
            maxResBtn.classList.remove('maximizeBtn');
            maxResBtn.classList.add('restoreBtn');
        }
        else{
            maxResBtn.title = 'Maximize';
            maxResBtn.classList.remove('restoreBtn');
            maxResBtn.classList.add('maximizeBtn');
        }
    }

    ipc.on('isMaximized', ()=>{changeMaxResBtn(true)});
    ipc.on('isRestored', ()=>{changeMaxResBtn(false)});

}
