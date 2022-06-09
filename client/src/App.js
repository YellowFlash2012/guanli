
import "antd/dist/antd.css";
import "./App.css";
import Clients from "./components/Clients";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
        <div className="container">
            <Clients />
        </div>
        </>
    );
}

export default App;
