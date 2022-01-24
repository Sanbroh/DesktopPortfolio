function openFolder() {
  document.getElementById("folder-inner").style.display = "block";
}

function closeFolder() {
  document.getElementById("folder-inner").style.display = "none";
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev, elm) {
  elm.parentNode.id = "grid-box";
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (ev.target.id == "grid-box") {
    ev.target.appendChild(document.getElementById(data));
    ev.target.id = "grid-box full";
  }
}
