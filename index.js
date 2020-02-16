'use strict';

// global variables
const MAX_LEADERBOARD_PLAYERS = 10;

function id() {
  return 'UP876126';
}

function init() {
  document.getElementById('nick').addEventListener('input', nickChanged);
  canvas.addEventListener('click', mouseClick);
}

window.addEventListener('load', init);

function updateLeaderBoard(playersNames, me) {
  const top10El = document.getElementById('top10');
  const playersCollection = top10El.children;

  cleanLeaderBoard(playersCollection);

  playersNames.forEach((playerName, i) => {
    if (i >= MAX_LEADERBOARD_PLAYERS) return;

    const newPlayerNode = document.createElement('li');
    newPlayerNode.textContent = playerName;

    if (playerName === me) {
      newPlayerNode.classList.add('myself');
    }

    top10El.appendChild(newPlayerNode);
  });
}

function nickChanged(e) {
  const nickname = e.target.value;
  document.getElementById('playername').textContent = nickname;
}

function updateStep() {
  step = +document.getElementById('scalerange').value;
}

function leaders(resultsNum) {
  const playersCollection = document.getElementById('top10').children;
  return [...playersCollection]
    .splice(0, resultsNum)
    .map(player => player.textContent);
}

const cleanLeaderBoard = playersCollection =>
  [...playersCollection].forEach(player => player.remove());

function mouseMoved(e) {
  // position of the pointer within the canvas
  pointer.x = e.pageX - canvas.offsetLeft;
  pointer.y = e.pageY - canvas.offsetTop;

  // position of the pointer relative to the centre of the canvas
  pointer.xOffset = pointer.x - halfWidth;
  pointer.yOffset = pointer.y - halfHeight;

  // TODO calulate angle and unit vector radius
  // based on mouse.xOffset and mouse.yOffset .
  pointer.radius =
    (Math.min(
      Math.sqrt(Math.pow(pointer.xOffset, 2) + Math.pow(pointer.yOffset, 2)),
      limitOfAcceleration
    ) /
      limitOfAcceleration) *
    step;

  pointer.angle = Math.atan2(pointer.yOffset, pointer.xOffset).toFixed(3);
  pointer.degrees = Math.abs(parseInt((pointer.angle * 180) / Math.PI));

  redraw();
}

function drawPointerPos() {
  context.strokeStyle = 'black';
  context.beginPath();
  context.arc(
    pointer.x,
    pointer.y,
    ((pointer.radius / step) * 50) / 2,
    0,
    2 * Math.PI,
    false
  );
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
  if (document.getElementById('nick') === document.activeElement) return;
  if (e.code == 'KeyD') {
    debug = !debug;
    window.controls.classList.toggle('hidden');
  }
  if (e.code == 'KeyL') {
    window.leaderboard.classList.toggle('hidden');
  }
  if (e.code == 'KeyP') {
    window.player.classList.toggle('hidden');
  }

  if (e.target == window.nick) {
    if (e.code == 'Enter') {
      window.player.classList.add('hidden');
    }
  }
}
