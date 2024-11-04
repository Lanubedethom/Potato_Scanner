// app/App.js

import { useState } from "react";
import Home from "../components/PotatoScanner/Home";
import History from "../components/PotatoScanner/History.jsx";
import Footer from "../components/PotatoScanner/Footer";

export default function App() {
    const [currentPage, setCurrentPage] = useState("home");

    return (
        <>
            {currentPage === "home" ? <Home /> : <History />}
            <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    );
}
