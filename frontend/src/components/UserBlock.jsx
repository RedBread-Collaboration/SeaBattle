import "./UserBlock.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const username = cookies.get("username");
const xhr = new XMLHttpRequest();

function startGame(username_2) {
  var body = JSON.stringify({
    username_1: username,
    username_2: username_2,
  });
  xhr.open("POST", "http://127.0.0.1:8000/game/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(body);
  xhr.onload = function () {
    console.log("1", xhr.status);
    window.location.href = "/pregame";
  };
  xhr.onerror = function () {
    alert("Не удалось начать игру");
  };
}

function UserBlock(props) {
  var status;

  if (props.props.status) {
    status = "Терпит кораблекрушение";
  } else {
    status = "Ждёт сражения";
  }

  if (props.props.username !== username) {
    return (
      <div className="User_block">
        <span>Имя: {props.props.username}</span>
        <span>Статус: {status}</span>
        <Link to="/pregame">
          <button
            className="choose-btn"
            onClick={() => startGame(props.props.username)}
          >
            Выбрать
          </button>
        </Link>
      </div>
    );
  }
}

export default UserBlock;
