import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bitcoin from "../images/bitcoin ic.png";
import Dropdown from "../components/Dropdown";
import LivePrice from "../components/LivePrice";
import LastUpdate from "../components/LastUpdate";
import FormInput from "../components/FormInput";
import { options } from "../utils/options";
import { cointCurrency, countBitcoin } from "../utils/calculations";

function SellPage() {
	const navigate = useNavigate();
	const [currencyInput, setCurrencyInput] = useState("");
	const [bitcoinInput, setBitcoinInput] = useState("");
	const [selected, setSelected] = useState("");
	const [currency, setCurrency] = useState("");
	const [datetime, setDatetime] = useState("");
	let intervalId = useRef();

	const getCurrency = async () => {
		const { data } = await axios.get(
			`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${selected?.title?.toLowerCase()}`
		);
		setCurrency(data?.bitcoin[selected?.title?.toLowerCase()]);
	};

	const handleCurrencyChange = (event) => {
		setCurrencyInput(event.target.value);
		setBitcoinInput(countBitcoin(event.target.value, currency));
	};

	const handleBitcoinChange = (event) => {
		setBitcoinInput(event.target.value);
		setCurrencyInput(cointCurrency(event.target.value, currency));
	};

	const startInterval = () => {
		intervalId.current = setInterval(() => {
			getCurrency();
			const datetime = new Date().toLocaleString() + "";
			setDatetime(datetime);
			if (currencyInput) {
				setBitcoinInput(countBitcoin(currencyInput, currency));
			} else {
				setBitcoinInput("");
			}
		}, 60000);
	};

	const handleUpdateClick = () => {
		getCurrency();
		const datetime = new Date().toLocaleString() + "";
		setDatetime(datetime);
		if (currencyInput) {
			setBitcoinInput(countBitcoin(currencyInput, currency));
		} else {
			setBitcoinInput("");
		}
		clearInterval(intervalId.current);
		startInterval();
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const confirmation = {
			status: "sold",
			bitcoinInput,
			currencyInput,
			currency: selected.title,
		};
		localStorage.setItem("confirmation", JSON.stringify(confirmation));
		navigate("/confirmation");
	};

	useLayoutEffect(() => {
		const id = JSON.parse(localStorage.getItem("currency"));
		if (id) {
			const currency = options.find((item) => item.id === id);
			setSelected(currency);
		} else setSelected(options[0]);
	}, []); //eslint-disable-line

	useEffect(() => {
		startInterval();
		return () => {
			clearInterval(intervalId.current);
		};
	}, [currencyInput, selected]); //eslint-disable-line

	useEffect(() => {
		getCurrency();
		const datetime = new Date().toLocaleString() + "";
		setDatetime(datetime);
		setCurrencyInput("");
		setBitcoinInput("");
	}, [selected]); //eslint-disable-line

	return (
		<div className="container">
			<div className="calculator">
				<Dropdown selected={selected} setSelected={setSelected} />
				<div className="calculator__inner">
					<div className="actions">
						<button className="actions-btn" onClick={() => navigate("/")}>
							Buy
						</button>
						<button className="actions-btn active">Sell</button>
					</div>
					<form className="calculator-form" onSubmit={handleSubmit}>
						<LivePrice currency={currency} selected={selected} />
						<LastUpdate
							datetime={datetime}
							handleUpdateClick={handleUpdateClick}
						/>
						<FormInput
							labelTitle="You receive"
							img={selected.roundImg}
							currencyTitle={selected.title}
							inputValue={currencyInput}
							handleInputChange={handleCurrencyChange}
						/>
						<FormInput
							labelTitle="You pay"
							img={bitcoin}
							currencyTitle="BTC"
							inputValue={bitcoinInput}
							handleInputChange={handleBitcoinChange}
						/>

						<button
							type="submit"
							className="form-btn"
							disabled={!bitcoinInput && !currencyInput}
						>
							Sell
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SellPage;
