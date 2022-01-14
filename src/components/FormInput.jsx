import React from "react";

function FormInput({
	labelTitle,
	img,
	currencyTitle,
	inputValue,
	handleInputChange,
}) {
	return (
		<div className="form-item">
			<label>{labelTitle}</label>
			<div className="form-input">
				<div className="form-input__icon">
					<img src={img} alt="au icon" />
					<span>{currencyTitle}</span>
				</div>

				<input type="number" value={inputValue} onChange={handleInputChange} />
			</div>
		</div>
	);
}

export default FormInput;
