import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bitcoin from "../images/bitcoin ic.png";
import Dropdown from "./Dropdown";
import { options } from "./Options";

function Calculator() {
	const navigate = useNavigate();
	const [selected, setSelected] = useState(options[0]);
	const [isBuyPage, setIsBuypage] = useState(true);
	const [currency, setCurrency] = useState("");
	const [currencyInput, setCurrencyInput] = useState("");
	const [bitcoinInput, setBitcoinInput] = useState("");
	const [datetime, setDatetime] = useState("");
	const [forceUpdate, setForceUpdate] = useState(false);

	const handleCurrencyChange = (event) => {
		setCurrencyInput(event.target.value);
		let bitcoinInput = Number(event.target.value) / Number(currency);
		setBitcoinInput(Math.round(bitcoinInput * 100000) / 100000);
	};

	const handleBitcoinChange = (event) => {
		setBitcoinInput(event.target.value);
		let currencyInput = Number(event.target.value) * Number(currency);
		setCurrencyInput(Math.round(currencyInput * 100000) / 100000);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const confirmation = {
			isBuyPage,
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
	}, []);

	useEffect(() => {
		const getCurrency = async () => {
			const { data } = await axios.get(
				`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${selected.title.toLowerCase()}`
			);
			setCurrency(data.bitcoin[selected.title.toLowerCase()]);
		};

		getCurrency();
		setBitcoinInput("");
		setCurrencyInput("");
		const datetime = new Date().toLocaleString() + "";
		setDatetime(datetime);

		const intervalId = setInterval(() => {
			getCurrency();
			setBitcoinInput("");
			setCurrencyInput("");
			const datetime = new Date().toLocaleString() + "";
			setDatetime(datetime);
		}, 60000);

		return () => {
			clearInterval(intervalId);
		};
	}, [selected, isBuyPage, forceUpdate]);

	return (
		<div className="container">
			<div className="calculator">
				<Dropdown selected={selected} setSelected={setSelected} />
				<div className="calculator__inner">
					<div className="actions">
						<button
							className={isBuyPage ? "actions-btn active" : "actions-btn"}
							onClick={() => setIsBuypage(true)}
						>
							Buy
						</button>
						<button
							className={isBuyPage ? "actions-btn" : "actions-btn active"}
							onClick={() => setIsBuypage(false)}
						>
							Sell
						</button>
					</div>
					<form className="calculator-form" onSubmit={handleSubmit}>
						<h4 className="form-title">Live Price</h4>
						<p className="form-price">
							1 BTC /&nbsp;
							{currency && <span>{currency}</span>}
							&nbsp;{selected.title}
						</p>
						<div className="form-update">
							<p className="form-update__time">
								Last update:&nbsp;
								<span>{datetime}</span>
							</p>

							<button
								className="form-update__btn"
								type="button"
								onClick={() => setForceUpdate(!forceUpdate)}
							>
								Update values
							</button>
						</div>

						<div className="form-item">
							<label>{isBuyPage ? "You pay" : "You receive"}</label>
							<div className="form-input">
								<div className="form-input__icon">
									<img src={selected.roundImg} alt="au icon" />
									<span>{selected.title}</span>
								</div>

								<input
									type="number"
									value={currencyInput}
									onChange={handleCurrencyChange}
								/>
							</div>
						</div>
						<div className="form-item">
							<label>{isBuyPage ? "You receive" : "You pay"}</label>
							<div className="form-input">
								<div className="form-input__icon">
									<img src={bitcoin} alt="bitcoin icon" />
									<span>BTC</span>
								</div>

								<input
									type="number"
									value={bitcoinInput}
									onChange={handleBitcoinChange}
								/>
							</div>
						</div>
						<button
							type="submit"
							className="form-btn"
							disabled={!bitcoinInput && !currencyInput}
						>
							{isBuyPage ? "Buy" : "Sell"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Calculator;
