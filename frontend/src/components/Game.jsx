import "../css/Game.css";
import { sendField } from "../ws/wsFuncs";
import Field from "./Field";
import Ship from "./Ship";

function Game() {
    const SIZE = Number(process.env.REACT_APP_FIELD_SIZE);
    const PX = Number(process.env.REACT_APP_CELLS_SIZE);

    function StartGame(event) {
        event.preventDefault();

        var startBtn = event.target;
        if (startBtn.tagName !== "BUTTON") startBtn = startBtn.parentNode;
        startBtn.remove();

        //* DISABLE SHIP MOVING
        var shipContainers = document.querySelectorAll(".ship-container");
        for (var i = 0; i < shipContainers.length; i++) shipContainers[i].remove();

        var field = [];
        var cells = document.querySelectorAll("#my-field td");
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            if (cell.children.length !== 0) field.push(cell.id);
        }
        sendField(field);
    }

    function Retry(event) {
        event.preventDefault();

        window.location.href = "/";
    }

    const Size1Ships = [];
    for (var i = 0; i < 4; i++)
        Size1Ships.push(<Ship size={1} isVertical={false} px={PX} />);
    const Size2Ships = [];
    for (var i = 0; i < 3; i++)
        Size2Ships.push(<Ship size={2} isVertical={false} px={PX} />);
    const Size3Ships = [];
    for (var i = 0; i < 2; i++)
        Size3Ships.push(<Ship size={3} isVertical={false} px={PX} />);
    const Size4Ships = [];
    for (var i = 0; i < 1; i++)
        Size4Ships.push(<Ship size={4} isVertical={false} px={PX} />);

    return (
        <div className="game">
            <div className="fields">
                <div>
                    <Field id="my-field" size={SIZE} px={PX} />
                    <div className="field-title">
                        <span>Ваше поле</span>
                    </div>
                    <div id="my-nick" className="field-nick"></div>

                    <div className="ships-list">
                        <div className="ships-line">{Size1Ships}</div>
                        <div className="ships-line">{Size2Ships}</div>
                        <div className="ships-line">{Size3Ships}</div>
                        <div className="ships-line">{Size4Ships}</div>
                    </div>
                </div>
                <div>
                    <Field id="opponent-field" size={SIZE} px={PX} />
                    <div className="field-title">
                        <span>Поле противника</span>
                    </div>
                    <div id="opponent-nick" className="field-nick"></div>
                </div>
            </div>
            <div className="info-block">
                <span></span>
                <button id="start-btn" onClick={StartGame}>
                    <span>Start Game</span>
                </button>
                <button id="retry-btn" onClick={Retry}>
                    <span>Retry</span>
                </button>
            </div>
        </div>
    );
}

export default Game;
