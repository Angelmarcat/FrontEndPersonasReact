import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Personas from "./components/Personas";
const Router = () => {
    return(
        <BrowserRouter>
        <Header />
        <Routes>
        <Route exact path="/" element={<Personas />} />
        </Routes>
        </BrowserRouter>
    );
}

export default Router;