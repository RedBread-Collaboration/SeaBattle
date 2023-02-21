import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import "../css/Ship.css";

function Ship({ size, isVertical = false, px = 30, br = 2 }) {
    const ref = useRef();
    const [gameIsReady, setGameReady] = useState(false);

    useEffect(() => {
        // * START BTN
        var startBtn = document.querySelector("#start-btn");
        if (startBtn !== null) startBtn.style.display = gameIsReady ? "block" : "none";
    });

    function resetShipPosition(shipContainer) {
        ref.current.state.x = 0;
        ref.current.state.y = 0;
        shipContainer.style.marginRight = "20px";
    }

    function getCellIdParams(shipContainer) {
        var rowNum = shipContainer.id.charCodeAt(0) - 65;
        var colNum = Number(shipContainer.id.replace(shipContainer.id[0], ""));
        return [rowNum, colNum];
    }

    function addShipsToContainer(cell, shipContainer, isVertical, field) {
        var [rowNum, colNum] = getCellIdParams(cell);
        var ship;
        do {
            ship = field.querySelector(`#${String.fromCharCode(rowNum + 65)}${colNum}`);
            shipContainer.appendChild(ship.firstChild);
            if (isVertical) rowNum++;
            else colNum++;
            ship = field.querySelector(`#${String.fromCharCode(rowNum + 65)}${colNum}`);
            if (ship === null) break;
        } while (ship.children.length !== 0);
    }

    function shipCanSet(cell, shipLen, isVertical, field) {
        var [rowNum, colNum] = getCellIdParams(cell);

        //* CHECK ENOUGH SPACE FOR SHIP
        for (var i = 1; i < shipLen; i++) {
            if (isVertical)
                cell = field.querySelector(
                    `#${String.fromCharCode(rowNum + 65 + i)}${colNum}`
                );
            else
                cell = field.querySelector(
                    `#${String.fromCharCode(rowNum + 65)}${colNum + i}`
                );
            if (cell === null) return false;
        }

        //* CHECK CELLS NEAR SHIP CELL
        var newCell;
        var err = false;
        for (var i = -1; i < shipLen + 1; i++) {
            for (var j = -1; j < 2; j++) {
                if (isVertical)
                    newCell = field.querySelector(
                        `#${String.fromCharCode(rowNum + 65 + i)}${colNum + j}`
                    );
                else
                    newCell = field.querySelector(
                        `#${String.fromCharCode(rowNum + 65 + j)}${colNum + i}`
                    );
                if (newCell === null) continue;
                err = newCell.children.length !== 0;
                if (err) return false;
            }
        }
        return true;
    }

    function SetShip(cell, shipContainer, isVertical, field) {
        var shipCells = shipContainer.children;
        var [rowNum, colNum] = getCellIdParams(cell);

        var shipLen = shipCells.length;
        if (shipCanSet(cell, shipLen, isVertical, field)) {
            //* MOVE SHIP CONTAINER TO CELL COORDS
            shipContainer.style.position = "absolute";
            resetShipPosition(shipContainer);
            shipContainer.style.marginRight = 0;

            var cellCoords = cell.getBoundingClientRect();
            shipContainer.style.left = `${cellCoords.x}px`;
            shipContainer.style.top = `${cellCoords.y}px`;

            //* MOVE SHIP CELLS TO FIELD
            shipCells[0].style.flexDirection = shipContainer.style.flexDirection;
            for (var i = 0; i < shipLen; i++) {
                cell = field.querySelector(
                    `#${String.fromCharCode(rowNum + 65)}${colNum}`
                );
                cell.appendChild(shipCells[0]);
                if (isVertical) rowNum++;
                else colNum++;
            }
        } else resetShipPosition(shipContainer);
    }

    function getShipLen(cell, isVertical, field) {
        var [rowNum, colNum] = getCellIdParams(cell);
        var shipLen = 0;
        var nextCell;
        do {
            shipLen++;
            if (isVertical) rowNum++;
            else colNum++;
            nextCell = field.querySelector(
                `#${String.fromCharCode(rowNum + 65)}${colNum}`
            );
            if (nextCell === null) break;
        } while (nextCell.children.length !== 0);
        return shipLen;
    }

    function shipCanRotate(cell, isVertical, field) {
        var [rowNum, colNum] = getCellIdParams(cell);
        var shipLen = getShipLen(cell, isVertical, field);
        var k = 0;
        var nextCell, leftCell, rightCell;
        var i, j;
        do {
            k++;
            if (isVertical) colNum++;
            else rowNum++;
            nextCell = field.querySelector(
                `#${String.fromCharCode(rowNum + 65)}${colNum}`
            );
            if (nextCell === null) break;
            if (nextCell.children.length !== 0) return false;

            //* CHECK LEFT CELL
            if (isVertical) {
                i = -1;
                j = 0;
            } else {
                i = 0;
                j = -1;
            }
            leftCell = field.querySelector(
                `#${String.fromCharCode(rowNum + 65 + i)}${colNum + j}`
            );
            if (leftCell.children.length !== 0) return false;

            //* CHECK RIGHT CELL
            if (isVertical) {
                i = 1;
                j = 0;
            } else {
                i = 0;
                j = 1;
            }
            rightCell = field.querySelector(
                `#${String.fromCharCode(rowNum + 65 + i)}${colNum + j}`
            );
            if (rightCell.children.length !== 0) return false;
        } while (k !== shipLen);
        return k === shipLen;
    }

    function Rotate(event) {
        event.preventDefault();

        var shipContainer = event.target;
        var elemsUnderCursor = document.elementsFromPoint(event.pageX, event.pageY);

        var cell;
        if (elemsUnderCursor[2].tagName === "TD") cell = elemsUnderCursor[2];
        else return;

        var field;
        if (elemsUnderCursor[3].tagName === "TABLE") field = elemsUnderCursor[3];
        else return;

        //* CHECK IF CELL IS FIRST
        var isVertical = shipContainer.style.flexDirection === "column";
        var [rowNum, colNum] = getCellIdParams(cell);
        var nextCell;
        if (isVertical) rowNum--;
        else colNum--;
        nextCell = field.querySelector(`#${String.fromCharCode(rowNum + 65)}${colNum}`);
        if (nextCell !== null && nextCell.children.length !== 0) return;

        if (!shipCanRotate(cell, isVertical, field)) return;

        addShipsToContainer(cell, shipContainer, isVertical, field);
        if (shipContainer.children.length > 1) {
            var height = px;
            var width = size * px;
            shipContainer.style.height = `${isVertical ? height : width}px`;
            shipContainer.style.width = `${isVertical ? width : height}px`;
            shipContainer.style.flexDirection = isVertical ? "row" : "column";
        }
        SetShip(cell, shipContainer, isVertical, field);
        resetShipPosition(shipContainer);
    }

    function MoveShip(event, data) {
        var shipContainer = data.node;
        var elemsUnderCursor = document.elementsFromPoint(event.x - 5, event.y - 5);
        if (elemsUnderCursor.length > 3) {
            //* TABLE CELL
            if (elemsUnderCursor[2].tagName !== "TD") {
                resetShipPosition(shipContainer);
                return;
            }
            var cell = elemsUnderCursor[2];

            //* MY FIELD
            if (elemsUnderCursor[4].id !== "my-field") {
                resetShipPosition(shipContainer);
                return;
            }
            var myField = elemsUnderCursor[4].lastChild;

            var isVertical = shipContainer.style.flexDirection === "column";
            SetShip(cell, shipContainer, isVertical, myField);
        } else {
            resetShipPosition(shipContainer);
        }

        //* CHECK IF GAME IS READY, IF SHIPS IS ENOUGH
        setGameReady(isGameReady());
    }

    function ChangeShipPos(event, data) {
        var shipContainer = data.node;
        var elemsUnderCursor = document.elementsFromPoint(event.pageX, event.pageY);
        if (elemsUnderCursor[2].tagName === "TD") {
            var cell = elemsUnderCursor[2];
            var field = cell.parentNode;
            while (field.tagName !== "TABLE") field = field.parentNode;
            var isVertical = shipContainer.style.flexDirection === "column";
            addShipsToContainer(cell, shipContainer, isVertical, field);
        }

        //* CHECK IF GAME IS READY, IF SHIPS IS ENOUGH
        setGameReady(isGameReady());
    }

    function isGameReady() {
        var shipContainers = document.querySelectorAll(".ship-container");
        for (var i = 0; i < shipContainers.length; i++) {
            var shipContainer = shipContainers[i];
            if (shipContainer.children.length !== 0) return false;
        }
        return true;
    }

    var shipCells = [];
    var shipStyle = {
        height: px,
        width: px,
    };
    for (var i = 0; i < size; i++) {
        shipCells.push(<div className="ship" style={shipStyle}></div>);
    }

    var height = px;
    var width = size * px;
    var containerStyle = {
        height: isVertical ? width : height,
        width: isVertical ? height : width,
        flexDirection: isVertical ? "column" : "row",
    };

    return (
        <Draggable ref={ref} onStart={ChangeShipPos} onStop={MoveShip}>
            <div className="ship-container" style={containerStyle} onContextMenu={Rotate}>
                {shipCells}
            </div>
        </Draggable>
    );
}

export default Ship;
