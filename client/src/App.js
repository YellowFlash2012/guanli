import {BrowserRouter, Routes, Route} from "react-router-dom"


import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";

import "./App.css";
// import "antd/dist/antd.css";
import 'antd/dist/antd.min.css'

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <div className="container">
            <Routes>
                    <Route path="/" element={<Home />} />
                    
                    <Route path="/projects/:id" element={<Project />} />

                    <Route path="*" element={<NotFound />} />
            
            </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;
