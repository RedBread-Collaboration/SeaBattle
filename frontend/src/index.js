import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Main from "./Main";
import PreGame from "./PreGame";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}></Route>
            <Route path='/main' element={<Main />}></Route>
            <Route path='/pregame' element={<PreGame />} />
        </Routes>
    </BrowserRouter>
);
