import React from "react";
import { useNavigate } from "react-router-dom";

function Confirmation() {
	const navigate = useNavigate();
	const confirmation = JSON.parse(localStorage.getItem("confirmation"));

	return (
		<div className="container">
			<div className="confirmation">
				<h2>
					You {confirmation.status}&nbsp;
					<span>{confirmation.bitcoinInput}</span> BTC <br />
					for <span>{confirmation.currencyInput}</span>&nbsp;
					<span>{confirmation.currency}</span>!
				</h2>

				<button className="confirmation-btn" onClick={() => navigate(-1)}>
					Back
				</button>
			</div>
		</div>
	);
}

export default Confirmation;
