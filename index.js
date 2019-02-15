'use strict';

function id() {
  return "UP876126";
}

function init() {
  window.nick.addEventListener("input", nickChanged);
  canvas.addEventListener("click", mouseClick)
}

window.addEventListener("load", init);

function updateLeaderBoard(newLeaderBoard, me) {
  let leaderBoard = document.getElementById("top10");
  cleanLeaderBoard(leaderBoard);
  changeLeaderBoardPlayers(leaderBoard, newLeaderBoard);
  highlightMe(leaderBoard, newLeaderBoard, me);
}

function cleanLeaderBoard(leaderBoard) {
  const leaderBoardPlayers = leaderBoard.children.length;
  while(leaderBoard.firstChild){
    leaderBoard.firstChild.remove();
  }
}

function changeLeaderBoardPlayers(leaderBoard, newLeaderBoard) {
  const maxNumberOfPlayers = newLeaderBoard.length <= 10 ? newLeaderBoard.length : 10;
  for (let i = 0; i < maxNumberOfPlayers; i++) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(newLeaderBoard[i]);
    node.appendChild(textNode);
    leaderBoard.appendChild(node);
  }
}

function highlightMe(leaderBoard, newLeaderBoard, me) {
  newLeaderBoard.forEach(function (name, index){
    if(me === name){
      leaderBoard.children[index].className = "myself";
    }
  });
}

function nickChanged() {
  window.playername.textContent = window.nick.value;
}

function updateStep() {
  const scaleRange = document.getElementById("scalerange");
  step = Number(scaleRange.value);
}

function leaders(maxNumberOfResults) {
  let players = document.querySelectorAll("#top10 li");
  let playersList = [];
  const numOfResults = players.length <= maxNumberOfResults ? players.length : maxNumberOfResults;
  for (let i = 0; i < numOfResults; i++) {
    playersList.push(players[i].textContent);
  }
  return playersList;
}

function mouseMoved(e) {

  // position of the pointer within the canvas
  pointer.x = (e.pageX - canvas.offsetLeft);
  pointer.y = (e.pageY - canvas.offsetTop);


  // position of the pointer relative to the centre of the canvas
  pointer.xOffset = pointer.x - halfWidth;
  pointer.yOffset = pointer.y - halfHeight;

  // TODO calulate angle and unit vector radius
  // based on mouse.xOffset and mouse.yOffset .
  pointer.radius =
    Math.min(
      Math.sqrt(
        Math.pow(pointer.xOffset, 2) +
        Math.pow(pointer.yOffset, 2)
      ),
      limitOfAcceleration
    ) / limitOfAcceleration * step;

  pointer.angle = Math.atan2(pointer.yOffset, pointer.xOffset).toFixed(3);
  pointer.degrees = Math.abs(parseInt(pointer.angle * 180 / Math.PI));

  redraw();
}

function drawPointerPos() {
  context.strokeStyle = "black";
  context.beginPath();
  context.arc(pointer.x, pointer.y, (pointer.radius / step * 50) / 2, 0, 2 * Math.PI, false);
  context.closePath();
  context.stroke();
}

function drawUserPos() {
  context.fillStyle = colours[0];
  context.beginPath();
  context.arc(halfWidth, halfHeight, step / 2, 0, 2 * Math.PI, false);
  context.closePath();
  context.fill();
}

function mouseClick() {
  const firstColour = colours.shift();
  colours.push(firstColour);
}

function handleKeys(e) {
  if (window.nick === document.activeElement) return; // if the nick element is focused skip the function
  if (e.code == "KeyD") {
    debug = !debug;
    window.controls.classList.toggle("hidden");
  }
  if (e.code == "KeyL") {
    window.leaderboard.classList.toggle("hidden");
  }
  if (e.code == "KeyP") {
    window.player.classList.toggle("hidden");
  }

  if (e.target == window.nick) {
    if (e.code == "Enter") {
      window.player.classList.add("hidden");
    }
  }
}
