import React from "react";
import au from "../images/au ic.png";
import bitcoin from "../images/bitcoin ic.png";

function Calculator() {
	return (
		<div className="container">
			<div className="calculator">
				<select className="calculator-options">
					<option value="AUD">AUD</option>
					<option value="USD">USD</option>
					<option value="RUB">RUB</option>
				</select>
				<div className="calculator-actions">
					<button>Buy</button>
					<button>Sell</button>
				</div>
				<form className="calculator-form">
					<h4 className="form-title">Live Price</h4>
					<p className="form-price">1 BTC / $25,535.00 AUD</p>
					<div className="form-item">
						<label>You pay</label>
						<div className="form-input">
							<img src={au} alt="au icon" />
							<span>AUD</span>
							<input type="text" />
						</div>
					</div>
					<div className="form-item">
						<label>You receive</label>
						<div className="form-input">
							<img src={bitcoin} alt="bitcoin icon" />
							<span>BTC</span>
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
