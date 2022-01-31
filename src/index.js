// script for index.html
const theMaximize = document.getElementById("mainHeroImg");
const theHead = document.getElementById("topHead");
const theCol = document.getElementById("leftColumn");
const recHead = document.getElementById("recHead");
const cardPadding = document.getElementById("cardPadding");
const cardPadding2 = document.getElementById("cardPadding2");
const cardPadding3= document.getElementById("cardPadding3");

ipc.on('isMaximized', ()=>{
    theMaximize.style.width = "220px";
    theHead.style.fontSize = "3rem";
    recHead.style.marginTop = "150px";
    theCol.style.marginTop = "57px";
    cardPadding.style.paddingTop = "35px";
    cardPadding.style.paddingBottom = "35px";
    cardPadding.style.marginLeft = "30px";
    cardPadding.style.marginRight = "30px";
    cardPadding2.style.paddingTop = "35px";
    cardPadding2.style.paddingBottom = "35px";
    cardPadding2.style.marginLeft = "30px";
    cardPadding2.style.marginRight = "30px";
    cardPadding3.style.paddingTop = "35px";
    cardPadding3.style.paddingBottom = "35px";
    cardPadding3.style.marginLeft = "30px";
    cardPadding3.style.marginRight = "30px";

});

ipc.on('isRestored', ()=>{
    theMaximize.style.width = "160px";
    theHead.style.fontSize = "32px";
    recHead.style.marginTop = "50px";
    theCol.style.marginTop = "5px";
    cardPadding.style.paddingTop = "23px";
    cardPadding.style.paddingBottom = "23px";
    cardPadding.style.marginLeft = "18px";
    cardPadding.style.marginRight = "18px";
    cardPadding2.style.paddingTop = "23px";
    cardPadding2.style.paddingBottom = "23px";
    cardPadding2.style.marginLeft = "18px";
    cardPadding2.style.marginRight = "18px";
    cardPadding3.style.paddingTop = "23px";
    cardPadding3.style.paddingBottom = "23px";
    cardPadding3.style.marginLeft = "18px";
    cardPadding3.style.marginRight = "18px";
});

