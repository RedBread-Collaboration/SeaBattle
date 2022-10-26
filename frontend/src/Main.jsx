import "./Main.css";
import Logo from "./media/Logo.svg";
import UserBlock from "./components/UserBlock";
import { useEffect, useState } from "react";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const xhr = new XMLHttpRequest();

function returnBack() {
  const username = cookies.get("username");
  xhr.open("DELETE", "http://127.0.0.1:8000/users/" + username, true);
  xhr.send();
  xhr.onload = function () {
    alert(xhr.status);
    window.location.href = "/";
  };
}

function updatePlayers() {}

function Main() {
  const [Data, SetData] = useState([]);

  useEffect(() => {
    updatePlayers = function () {
      var searchInput = document.getElementById("searchInput");
      var username = searchInput.value;
      console.log(username);

      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://127.0.0.1:8000/users/all", false);
      xhr.send();
      var oldData = JSON.parse(xhr.response);
      var newData = [];

      if (username[0] !== " " && username[username.length - 1] !== " ") {
        oldData.map((player) => {
          if (player.username.startsWith(username) || username === "") {
            newData.push(player);
          }
        });
      }
      SetData(newData);
    };

    xhr.open("GET", "http://127.0.0.1:8000/users/all", true);
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = function () {
      SetData(xhr.response);
    };
  }, []);

  return (
    <div className="Main">
      <button onClick={returnBack}>Назад</button>
      <div className="logo">
        <img
          className="logo_img"
          src={Logo}
          width="20%"
          alt=""
          height="auto"
        ></img>
        <div>
          <input
            id="searchInput"
            className="search"
            type="search"
            placeholder="Поиск"
            onChange={updatePlayers}
          ></input>
        </div>
      </div>
      <div className="User_list">
        {Data.map((props) => (
          <UserBlock key={props.username} props={props} />
        ))}
      </div>
    </div>
  );
}

export default Main;
