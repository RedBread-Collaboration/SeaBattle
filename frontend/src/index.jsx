import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Error from "./components/Error";
import Game from "./components/Game";
import Login from "./components/Login";
import "./css/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/game" element={<Game />}></Route>
            {/* <Route path="/error" element={<Error />}></Route> */}
        </Routes>
    </BrowserRouter>
);
