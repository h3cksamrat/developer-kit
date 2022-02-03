// script for index.html
const theMaximize = document.getElementById("mainHeroImg");
const theHead = document.getElementById("topHead");
const theCol = document.getElementById("leftColumn");
const recHead = document.getElementById("recHead");
const cardPadding = document.getElementById("cardPadding");
const cardPadding2 = document.getElementById("cardPadding2");
const cardPadding3= document.getElementById("cardPadding3");
const sidebar = document.getElementsByClassName("sidebarMenus");

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
    sidebar.style.width = "280px";
});

const dropdownBtnsClass = "dropdownBtn";
const searchInputId = "myInput";
const sideBarUlId = "sidenav__ul";
const dropdownGroupClass = "dropdownGroup";
const subDropdownClass = "dropdown-container";

const dropdownBtns = document.getElementsByClassName(dropdownBtnsClass);

Array.from(dropdownBtns).map((button) => {
  button.addEventListener("click", (event) => {
    event.target.classList.toggle("active");
    const dropdownContent = event.target.parentElement.querySelector(
      "." + subDropdownClass
    );
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  });
});

function searchServices() {
  let input = document.getElementById(searchInputId);
  let ul = document.getElementById(sideBarUlId);
  let dropdownGroups = ul.getElementsByClassName(dropdownGroupClass);

  let filter = input.value.toUpperCase();

  if (!filter) {
    Array.from(dropdownBtns).map((button) => {
      button.style.display = "";
      const dropdownContent = button.parentElement.querySelector(
        "." + subDropdownClass
      );
      dropdownContent.style.display = "none";
    });
  }

  Array.from(dropdownGroups).map((dropdownGroup) => {
    let subMenus = dropdownGroup.querySelectorAll("a");

    Array.from(subMenus).map((a) => {
      if (!filter) {
        a.style.display = "";
        a.classList.remove("subMenu");
        return;
      }
      let textValue = a.textContent || a.innerText;
      console.log({ textValue });
      a.style.display =
        textValue.toUpperCase().indexOf(filter) == -1 ? "none" : "";
      a.classList.add("subMenu");
    });

    if (!filter) return;
    Array.from(dropdownBtns).map((button) => {
      button.style.display = "none";
      button.classList.remove("active");
      const dropdownContent = button.parentElement.querySelector(
        "." + subDropdownClass
      );
      dropdownContent.style.display = "block";
    });
  });
}
