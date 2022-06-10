import {BrowserRouter, Routes, Route} from "react-router-dom"
import "antd/dist/antd.css";
import "./App.css";
import AddClientModal from "./components/AddClientModal";
import Clients from "./components/Clients";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";

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
