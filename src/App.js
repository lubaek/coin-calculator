import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calculator from "./components/Calculator";
import Confirmation from "./components/Confirmation";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Calculator />} />
				<Route path="/confirmation" element={<Confirmation />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
