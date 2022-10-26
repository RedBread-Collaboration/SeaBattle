import React from "react";
import "./App.css";
import Logo from "./media/Logo.svg";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const xhr = new XMLHttpRequest();

function addPlayer() {
  var input = document.getElementById("username");
  var username = input.value;

  if (
    username[0] !== " " &&
    username[username.length - 1] !== " " &&
    username !== ""
  ) {
    var body = JSON.stringify({ username: username });
    xhr.open("POST", "http://127.0.0.1:8000/users/", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(body);
    xhr.onload = function () {
      cookies.set("username", username);
      console.log(cookies.get("username"));
      window.location.href = "/main";
    };
  } else {
    alert("Некорректное имя! Введите правильное имя.");
  }
}

function App() {
  return (
    <div className="App">
      <div className="Body">
        <img className="logo_img" src={Logo} alt="" width="25%"></img>
        <input
          id="username"
          className="nickname_block"
          name="login"
          placeholder="Введите имя"
        ></input>
        <button className="btn_play" onClick={addPlayer}>
          Играть
        </button>
        <span className="author">© RedBread team</span>
      </div>
    </div>
  );
}

export default App;
