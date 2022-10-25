import React from "react";
import './App.css';
import Logo from './media/Logo.svg';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="Body">
        <img className="logo_img" src={Logo} width="30%" height="auto"></img>
        <input className="nickname_block" name="login" placeholder='Введите имя'></input>
        <Link to="/main">
          <button className="btn_play">Играть</button>
        </Link>
        <span className="author">© RedBread team</span>
      </div>
    </div>
  );
}

export default App;
