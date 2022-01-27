window.onload = function() {
  formGrid();
  createBin(0);
  createFolder("Profile", "profile", 1);
  createFolder("Projects", "projects", 2);
  createFolder("Awards", "awards", 3);
  createText("Read Me", "read-me", 4);
  createApp("Google Chrome", "google-chrome", "https://www.science.co.il/internet/browsers/Chrome-2020-256.png", horzGrid-1);
  createApp("Background Settings", "background-settings", "https://winaero.com/blog/wp-content/uploads/2017/04/personalize-desktop-icons-customize-icon.png", horzGrid-2);
  elmHold = document.getElementById("placeholder");
  document.getElementById("nav-start-img").style.filter = "brightness(0) invert(1)";
  currLocation = document.getElementById("desktop").children[0];
  checkButtonPress();
}

var elmHold = "";
var lastSelected = "";
var currSelected = "";
var currLocation = "";
var horzGrid = Math.floor(screen.width / 84) - 1;
var vertGrid = Math.floor(screen.height / 100) - 2;
var lineBreak = document.createElement("br");

function formGrid() {
  for (let i = 1; i < horzGrid * vertGrid; i++) {
    var grid = document.getElementById("grid-box").cloneNode(true);
    document.getElementById("grid").appendChild(grid);
  }
  var autoCount = "";
  for (let i = 0; i < horzGrid; i++) {
    autoCount += "auto ";
  }
  document.getElementById("grid").style.gridTemplateColumns = autoCount;
}

function selectLast() {
  if (lastSelected.parentNode.id == "grid-box full") {
    lastSelected.style.borderStyle = "dotted";
    lastSelected.style.borderColor = "white";
    lastSelected.style.borderWidth = "0.5px";
    lastSelected.style.marginTop = "3.5px";
    lastSelected.style.marginRight = "-1px";
    lastSelected.children[0].style.marginLeft = "9px";
    lastSelected.children[1].style.marginLeft = "-1px";
  }
}

function unselectLast() {
  lastSelected.style.borderStyle = "none";
  lastSelected.style.borderColor = "none";
  lastSelected.style.borderWidth = "none";
  lastSelected.style.marginTop = "4px";
  lastSelected.style.marginRight = "auto";
  lastSelected.children[0].style.marginLeft = "auto";
  lastSelected.children[1].style.marginLeft = "auto";
}

function deleteElement(elm) {
  elm.parentNode.id = "grid-box";
  elm.remove();
  desktopUnselect();
  hideCheckbox();
}

function createBin(gridPos) {
  var bin = document.getElementById("recycle-bin");
  var pos = document.getElementById("grid").children[gridPos];
  bin.style.display = "inline-block";
  pos.appendChild(bin);
  pos.id = "grid-box full";
}

function createFolder(name, givenId, gridPos) {
  var folder = document.getElementById("default-folder").cloneNode(true);
  folder.id = "folder-" + givenId;
  var child = folder.childNodes;
  child[3].textContent = name;
  var pos = document.getElementById("grid").children[gridPos];
  folder.style.display = "inline-block";
  pos.appendChild(folder);
  pos.id = "grid-box full";
}

function createText(name, givenId, gridPos) {
  var text = document.getElementById("default-text").cloneNode(true);
  text.id = "text-" + givenId;
  var child = text.childNodes;
  child[3].textContent = name;
  var pos = document.getElementById("grid").children[gridPos];
  text.style.display = "inline-block";
  pos.appendChild(text);
  pos.id = "grid-box full";
}

function createApp(name, givenId, img, gridPos) {
  var app = document.getElementById("default-app").cloneNode(true);
  app.id = "app-" + givenId;
  var child = app.childNodes;
  child[3].textContent = name;
  child[1].src = img;
  var pos = document.getElementById("grid").children[gridPos];
  app.style.display = "inline-block";
  pos.appendChild(app);
  pos.id = "grid-box full";
}

function openFolder(elm) {
  document.getElementById("folder-inner").style.display = "block";
}

function closeFolder(elm) {
  document.getElementById("folder-inner").style.display = "none";
}

function openApp(elm) {
  if (elm.id == "app-google-chrome") {
    window.open();
  }
}

function closeApp(elm) {

}

function moveCheckbox(elm) {
  var posX = elm.getBoundingClientRect().left + 16;
  var posY = elm.getBoundingClientRect().top;
  document.getElementById("desktop-checkbox").style.display = "block";
  document.getElementById("desktop-checkbox").style.left = String(posX) + "px";
  document.getElementById("desktop-checkbox").style.top = String(posY) + "px";
}

function hideCheckbox() {
  document.getElementById("desktop-checkbox").style.display = "none";
}

function desktopSelect(elm) {
  desktopUnselect();
  lastSelected = elm;
  currSelected = elm;
  selectLast();
  elm.style.backgroundColor = "rgba(173, 216, 230, .35)";
  elmHold = elm;
  var posX = elm.getBoundingClientRect().left + 16;
  var posY = elm.getBoundingClientRect().top;
  document.getElementById("desktop-checkbox-hold").style.display = "block";
  document.getElementById("desktop-checkbox-hold").style.left = String(posX) + "px";
  document.getElementById("desktop-checkbox-hold").style.top = String(posY) + "px";
}

function desktopUnselect() {
  document.getElementById("desktop-checkbox-hold").style.display = "none";
  elmHold.style.backgroundColor = "rgba(173, 216, 230, .0)";
  if (lastSelected != "") {
    unselectLast();
  }
}

function desktopUnselectEmpty(elm) {
  if (elm.id != "grid-box full") {
    document.getElementById("desktop-checkbox-hold").style.display = "none";
    elmHold.style.backgroundColor = "rgba(173, 216, 230, .0)";
    elmHold = elm;
  }
}

function folderHover(elm) {
  elm.style.backgroundColor = "rgba(173, 216, 230, .35)";
  // if (elm.style.backgroundColor == "rgba(173, 216, 230, .0)") {
  //   elm.style.backgroundColor = "rgba(173, 216, 230, .35)";
  // } else if (elm.style.backgroundColor == "rgba(173, 216, 230, .35)") {
  //   elm.style.backgroundColor = "rgba(173, 216, 230, .5)";
  // }
}

function folderExitHover(elm) {
  if (elmHold != elm) {
    elm.style.backgroundColor = "rgba(173, 216, 230, .0)";
  }
}

function renameFile(elm) {

}

var clipboard = "";

function copy(elm) {
  if (elm.parentNode.id == "grid-box full") {
    clipboard = elm.cloneNode(true);
    var testcase = clipboard.id;
    var testcaseName = clipboard.children[1].textContent;
    var duplicates = 0;

    while (testcase.substring(testcase.length-5, testcase.length) == "-copy") {
      testcase = testcase.substring(0, testcase.length-5);
    }

    for (let i = 0; i < testcaseName.length; i++) {
      if (testcaseName.substring(i, i+7) == " - Copy") {
        testcaseName = testcaseName.substring(0, i);
        break;
      }
    }

    for (let i = 0; i < currLocation.childElementCount; i++) {
      if (currLocation.children[i].id == "grid-box full"
      && currLocation.children[i].children[0].id.length >= testcase.length
      && currLocation.children[i].children[0].id.substring(0, testcase.length) == testcase) {
        duplicates++;
      }
    }
    clipboard.id = testcase;

    for (let i = 0; i < duplicates; i++) {
      clipboard.id += "-copy";
    }

    if (duplicates > 1) {
      clipboard.children[1].textContent = testcaseName + " - Copy" + " (" + String(duplicates) + ")";
    } else {
      clipboard.children[1].textContent = testcaseName + " - Copy";
    }

  }
}

function paste() {
  for (let i = 0; i < currLocation.childElementCount; i++) {
    if (currLocation.children[i].id != "grid-box full") {
      currLocation.children[i].appendChild(clipboard);
      currLocation.children[i].id = "grid-box full";
      currLocation.children[i].children[0].style.display = "inline-block";
      desktopSelect(currLocation.children[i].children[0]);
      copy(clipboard);
      break;
    }
  }
}

function pasteTo(location, gridPos) {

}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev, elm) {
  desktopSelect(elm);
  elm.parentNode.id = "grid-box";
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, elm) {
  ev.preventDefault();
  if (ev.target.id == "grid-box") {
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    ev.target.id = "grid-box full";
  } else if (elm.id == "grid-box full" && elm.children[0].id == "recycle-bin" && currSelected.id != "recycle-bin" && currSelected.id != "app-background-settings" && currSelected.id != "app-google-chrome") {
    deleteElement(currSelected);
  } else {
    elmHold.parentNode.id = "grid-box full";
  }
  desktopSelect(elmHold);
}

function startHover() {
  document.getElementById("nav-start-img").style.filter = "brightness(1.25)";
}

function startReset() {
  document.getElementById("nav-start-img").style.filter = "brightness(0) invert(1)";
}

// Source: https://stackoverflow.com/questions/22092762/how-to-detect-ctrlc-and-ctrlv-key-pressing-using-regular-expression

function checkButtonPress() {
  document.body.addEventListener("keydown",function(e){
      e = e || window.event;
      var key = e.which || e.keyCode; // keyCode detection
      var ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false); // ctrl detection

      if ( key == 86 && ctrl ) {
        paste();
      } else if ( key == 67 && ctrl ) {
        if (currSelected.id != "recycle-bin" && currSelected.id != "app-background-settings" && currSelected.id != "app-google-chrome") {
          copy(currSelected);
        }
      } else if ( key == 46) {
        if (currSelected.id != "recycle-bin" && currSelected.id != "app-background-settings" && currSelected.id != "app-google-chrome") {
          deleteElement(currSelected);
        }
      }

  },false);
}
