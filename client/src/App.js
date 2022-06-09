
import "antd/dist/antd.css";
import "./App.css";
import AddClientModal from "./components/AddClientModal";
import Clients from "./components/Clients";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <AddClientModal />
            <Clients />
        </div>
        </>
    );
}

export default App;
