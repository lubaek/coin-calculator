import React from "react";

function LivePrice({ currency, selected }) {
	return (
		<>
			<h4 className="form-title">Live Price</h4>
			<p className="form-price">
				1 BTC /&nbsp;
				{currency && <span>{currency}</span>}
				&nbsp;{selected.title}
			</p>
		</>
	);
}

export default LivePrice;
