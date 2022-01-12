import { useState } from "react";
import "../Dropdown.css";
import { options } from "./Options";

function Dropdown({ selected, setSelected }) {
	const [isActive, setIsActive] = useState(false);
	const handleClick = (e, option) => {
		setSelected(option);
		setIsActive(false);
		localStorage.setItem("currency", JSON.stringify(option.id));
	};
	return (
		<div className="dropdown">
			<div className="dropdown__inner">
				<div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
					<img src={selected.img} alt="icon" />
					<span className="option__title">{selected.title}</span>
					{isActive ? <span>&#9650;</span> : <span>&#9660;</span>}
				</div>
				{isActive && (
					<div className="dropdown-content">
						{options.map((option, index) => (
							<div
								key={index}
								onClick={(e) => handleClick(e, option)}
								className="dropdown-item"
							>
								<img src={option.img} alt="icon" />
								<span className="option__title">{option.title}</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Dropdown;
