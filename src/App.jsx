import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Confirmation from "./views/Confirmation";
import BuyPage from "./views/BuyPage";
import SellPage from "./views/SellPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<BuyPage />} />
				<Route path="/sell" element={<SellPage />} />
				<Route path="/confirmation" element={<Confirmation />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
