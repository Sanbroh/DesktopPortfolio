window.onload = function() {
  formGrid();
  createBin(0);
  createFolder("Profile", "profile", 1);
  createFolder("Projects", "projects", 2);
  createFolder("Awards", "awards", 3);
  createText("Read Me", "read-me", 4);
  elmHold = document.getElementById("placeholder");
  document.getElementById("nav-start-img").style.filter = "brightness(0) invert(1)";
}

var elmHold = "";

function formGrid() {
  var horzGrid = Math.floor(screen.width / 84) - 1;
  var vertGrid = Math.floor(screen.height / 100) - 2;
  for (let i = 1; i < horzGrid * vertGrid; i++) {
    var grid = document.getElementById("grid-box").cloneNode(true);
    document.getElementById("grid").appendChild(grid);
  }
  var autoCount = "";
  for (let i = 0; i < horzGrid; i++) {
    autoCount += "auto ";
  }
  document.getElementById("grid").style.gridTemplateColumns = autoCount;
  console.log(document.getElementById("grid"));
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

function openFolder(elm) {
  document.getElementById("folder-inner").style.display = "block";
}

function closeFolder(elm) {
  document.getElementById("folder-inner").style.display = "none";
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

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev, elm) {
  desktopUnselect();
  elm.parentNode.id = "grid-box";
  elmHold = elm;
  desktopSelect(elm);
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, elm) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (ev.target.id == "grid-box") {
    ev.target.appendChild(document.getElementById(data));
    ev.target.id = "grid-box full";
  }
  var child = ev.target.childNodes;
  desktopSelect(child[1]);
}

function startHover() {
  document.getElementById("nav-start-img").style.filter = "brightness(1.25)";
}

function startReset() {
  document.getElementById("nav-start-img").style.filter = "brightness(0) invert(1)";
}
