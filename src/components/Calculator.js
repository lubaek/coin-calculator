import React, { useState } from "react";
import au from "../images/au ic.png";
import bitcoin from "../images/bitcoin ic.png";
import Dropdown from "./Dropdown";
import { options } from "./Options";

function Calculator() {
	const [selected, setSelected] = useState(options[0]);
	return (
		<div className="container">
			<div className="calculator">
				<Dropdown selected={selected} setSelected={setSelected} />
				<div className="actions">
					<button className="actions-btn active">Buy</button>
					<button className="actions-btn">Sell</button>
				</div>
				<form className="calculator-form">
					<h4 className="form-title">Live Price</h4>
					<p className="form-price">
						1 BTC / <span>$25,535.00</span> AUD
					</p>
					<div className="form-item">
						<label>You pay</label>
						<div className="form-input">
							<div className="form-input__icon">
								<img src={au} alt="au icon" />
								<span>AUD</span>
							</div>

							<input type="text" />
						</div>
					</div>
					<div className="form-item">
						<label>You receive</label>
						<div className="form-input">
							<div className="form-input__icon">
								<img src={bitcoin} alt="bitcoin icon" />
								<span>BTC</span>
							</div>

							<input type="text" />
						</div>
					</div>
					<button type="submit" className="form-btn">
						Buy
					</button>
				</form>
			</div>
		</div>
	);
}

export default Calculator;
