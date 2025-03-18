/* Game State */

let roomCompletion = {room1: false, room2: false, room3: false, room4: false}
let room1State = {drawers: false, safe: false, itemScrewdriver: false, itemRemote: false, itemKey: false}
let room2State = {posterDown: false, puzzle2b: false, puzzle2bPart2: false, item2: false}
let room3State = {puzzle3a: false, puzzle3b: false, puzzle3c: false}
let room4State = {puzzle4a: false, puzzle4b: false, puzzle4c: false}
console.log(roomCompletion);
console.log(room1State);
console.log(room2State);
console.log(room3State);
console.log(room4State);

/* Main Functions */

function fromTo(fromLocation, toLocation) {
    document.getElementById(fromLocation).classList.add('hidden');
    document.getElementById(toLocation).classList.remove('hidden');
}

function isVisited(hotspotId) {
    document.getElementById(hotspotId).classList.add('visited');
}

/* Room 1 Behaviour */

function interactRoom1(object) {
    room1State[object] = true;
    document.getElementById(object).classList.add('hidden')
    console.log(room1State);
    checkCompletionRoom1();
}

function togglePillow() {
    let pillow = document.getElementById("iconPillowUp") || document.getElementById("iconPillowDown");

    if (pillow.id === "iconPillowUp") {
        pillow.id = "iconPillowDown";
    } else {
        pillow.id = "iconPillowUp";
    }
}

function tvOn() {
    document.getElementById("iconTelevision").src = "TV_On_Zoom.png";
}

function tvCheck() {
    if (document.getElementById("iconTelevision").src.endsWith("TV_On_Zoom.png")) {
        fromTo('room1', 'televisionOn');
    } else {
        fromTo('room1', 'televisionOff');
    }
}

function removeScrew(screwNumber) {
    if (room1State.itemScrewdriver === true) {
        document.getElementById("iconScrew" + screwNumber).classList.add("hidden");
        checkScrews()
    } else {
        alert("You might need a screwdriver to prize these off!");
    }
}
function checkScrews() {
    if (document.getElementById("iconScrew" + 1).classList.contains("hidden") && document.getElementById("iconScrew" + 2).classList.contains("hidden") && document.getElementById("iconScrew" + 3).classList.contains("hidden") && document.getElementById("iconScrew" + 4).classList.contains("hidden")) {
        fromTo('painting', 'safe')
    }
}

function checkAnswerRoom1(inputId, correctAnswer, fromPuzzleId, toPuzzleId) {
    const input = document.getElementById(inputId);
    if (input.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        room1State[fromPuzzleId] = true; 
        console.log(room1State);
        fromTo(fromPuzzleId, toPuzzleId)
        checkCompletionRoom1()
    } else {
        alert("Incorrect! Try again.");
    }
}

function doorCheck() {
    if (room1State.drawers && room1State.safe && room1State.itemScrewdriver && room1State.itemRemote && room1State.itemKey) {
        alert("The key fits! You open the door and step out into the corridor...")
        fromTo('room1', 'congrats')
    } else {
        alert("The door is firmly locked. You'll need to find a key to escape...")
    }
}

function checkCompletionRoom1() {
    if (room1State.lightsOn && room1State.puzzle1b && room1State.item1) {
        document.getElementById('hotspot1d').classList.remove('hidden');
    }
}

function checkExitRoom1(inputId, correctAnswer, puzzleId) {
    const input = document.getElementById(inputId);
    if (input.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById(puzzleId).classList.add('hidden');
        document.getElementById('room2').classList.remove('hidden');
        roomCompletion.room1 = true; 
        console.log(roomCompletion);
    } else {
        alert("Incorrect! Try again.");
    }
}

/* Room 2 Behaviour */

function interactRoom2(object) {
    room2State[object] = true;
    console.log(room2State);
    checkCompletionRoom2();
}

function checkAnswerRoom2(inputId, correctAnswer, fromPuzzleId, toPuzzleId) {
    const input = document.getElementById(inputId);
    if (input.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        room2State[fromPuzzleId] = true; 
        console.log(room2State);
        checkCompletionRoom2()
        fromTo(fromPuzzleId, toPuzzleId)
    } else {
        alert("Incorrect! Try again.");
    }
}

function checkCompletionRoom2() {
    if (room2State.posterDown && room2State.puzzle2b && room2State.item2) {
        document.getElementById('hotspot2d').classList.remove('hidden');
    }
}

function checkExitRoom2(inputId, correctAnswer, puzzleId) {
    const input = document.getElementById(inputId);
    if (input.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById(puzzleId).classList.add('hidden');
        document.getElementById('game-complete').classList.remove('hidden');
        roomCompletion.room2 = true; 
        console.log(roomCompletion);
    } else {
        alert("Incorrect! Try again.");
    }
}

/* Game End Functions */

function gameReset() {
    roomCompletion.room1 = false;
    roomCompletion.room2 = false;
    room1State.lightsOn = false;
    room1State.puzzle1b = false;
    room1State.item1 = false;
    room2State.posterDown = false;
    room2State.puzzle2b = false;
    room2State.item2 = false;
}

/* Timer */

let countdown;
let timeRemaining = 20 * 60; // 20 minutes in seconds

function startGame() {
    if (countdown) clearInterval(countdown); // Stops previous timer if already running
    countdown = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) {
        console.error("Timer element not found!");
        clearInterval(countdown);
        return;
    }

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeRemaining <= 0) {
        clearInterval(countdown);
        timerElement.innerText = "Time's up!";
    } else {
        timeRemaining--;
    }
}