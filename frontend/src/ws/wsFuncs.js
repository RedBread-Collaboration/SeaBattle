import crossImg from "../assets/cross.svg";
import pointImg from "../assets/point.svg";
import wavesImg from "../assets/waves.svg";

const websocket = new WebSocket(`ws://${process.env.REACT_APP_WEBSOCKET_URL}`);
websocket.onopen = function () {
    console.log("Connected to WebSocket");
};
websocket.onmessage = function (msg) {
    // console.log(msg.data);

    var data = msg.data.split(":");
    if (data.length > 1) {
        //* ERRORS
        if (data[1] === "400") {
            var errorModal = document.querySelector(`.error`);
            errorModal.style.display = "flex";
            var errorMsg = data[0];
            var errorText = document.querySelector(`#error-text`);
            errorText.textContent = errorMsg;
            console.log(errorText);
            return;
        }
        //* MESSAGES
        else if (data[1] === "200") console.log(data[0]);
        //* GET MY NICKNAME
        else if (data[1] === "201") {
            var myNick = document.querySelector("#my-nick");
            myNick.textContent = data[0];
            console.log(`myNickname ${data[0]}`);
        }
        //* GET OPPONENT NICKNAME
        else if (data[1] === "202") {
            var opponentNick = document.querySelector("#opponent-nick");
            opponentNick.textContent = data[0];
            console.log(`opponentNickname ${data[0]}`);
        }
    }

    //* COMMANDS
    data = msg.data.split(" ");
    if (data.length === 2) {
        if (data[0] === "Attack") {
            var cellId = data[1];
            var attackedCell = document.querySelector(`#my-field #${cellId}`);
            attackedCell.style.backgroundImage = `url(${crossImg})`;
        } else if (data[0] === "Bump") {
            var cellId = data[1];
            var attackedCell = document.querySelector(`#opponent-field #${cellId}`);
            attackedCell.style.backgroundImage = `url(${crossImg})`;
        } else if (data[0] === "Not") {
            var cellId = data[1];
            var attackedCell = document.querySelector(`#my-field #${cellId}`);
            attackedCell.style.backgroundImage = `url(${pointImg})`;
        } else if (data[0] === "Dont") {
            var cellId = data[1];
            var attackedCell = document.querySelector(`#opponent-field #${cellId}`);
            attackedCell.style.backgroundImage = `url(${pointImg})`;
        } else if (data[0] === "Turn") {
            var myNick = document.querySelector("#my-nick");
            var opponentNick = document.querySelector("#opponent-nick");
            var infoBlock = document.querySelector(".info-block span");
            var turnNick = data[1];
            if (turnNick === myNick.textContent) {
                myNick.classList.remove("wait");
                myNick.classList.add("turn");
                opponentNick.classList.remove("turn");
                opponentNick.classList.add("wait");
            } else {
                myNick.classList.remove("turn");
                myNick.classList.add("wait");
                opponentNick.classList.remove("wait");
                opponentNick.classList.add("turn");
            }
            infoBlock.textContent = msg.data;
        } else if (data[0] === "Win") {
            var myNick = document.querySelector("#my-nick");
            var opponentNick = document.querySelector("#opponent-nick");
            myNick.classList.remove("wait");
            myNick.classList.remove("turn");
            opponentNick.classList.remove("wait");
            opponentNick.classList.remove("turn");
            var winnerNick = data[1];
            var infoBlock = document.querySelector(".info-block span");
            infoBlock.style.fontSize = "36px";
            infoBlock.textContent = `Winner is ${winnerNick}`;
            var retryBtn = document.querySelector("#retry-btn");
            retryBtn.style.display = "block";
        }
    }
};
websocket.onclose = function () {
    console.log("Disconnected with WebSocket");
};

export function SubmitNickname(event) {
    var nickname = event.target.nickname.value;
    websocket.send(`Nick ${nickname}`);
}

function checkFieldType(cell) {
    var elem = cell.parentNode;
    while (elem.tagName !== "DIV") elem = elem.parentNode;
    if (elem.id === "my-field") return false;
    return true;
}

export function OnLeftClick(event) {
    event.preventDefault();

    var myTurn = document.querySelector("#my-nick").classList.contains("turn");
    if (!myTurn) return;

    var cell = event.target;
    var fieldType = checkFieldType(cell);
    if (fieldType) {
        websocket.send(`Attack ${cell.id}`);
        console.log(`Attack ${cell.id}`);
    }
}

export function OnRightClick(event) {
    event.preventDefault();

    var startBtn = document.querySelector("#start-btn");
    if (startBtn !== null) return;

    var cell = event.target;
    var fieldType = checkFieldType(cell);
    if (fieldType) {
        if (cell.style.backgroundImage === `url("${wavesImg}")`)
            cell.style.backgroundImage = "";
        else if (cell.style.backgroundImage === "")
            cell.style.backgroundImage = `url(${wavesImg})`;
    }
}

export function sendField(field) {
    websocket.send(`Field ${field}`);
    console.log(`Field sent to Websocket: ${field}`);
}
