import React from "react";

function LastUpdate({ datetime, handleUpdateClick }) {
	return (
		<div className="form-update">
			<p className="form-update__time">
				Last update:&nbsp;
				<span>{datetime}</span>
			</p>

			<button
				className="form-update__btn"
				type="button"
				onClick={handleUpdateClick}
				// onClick={() => setForceUpdate(!forceUpdate)}
			>
				Update values
			</button>
		</div>
	);
}

export default LastUpdate;
