import React from 'react';
import './Vehicle.css'
import peopleicon from '../../images/peopleicon.png'
const VehicleInfo = (props) => {
	const { id, sit, img, price, name } = props.vehicle;
	return (
		<div>
			<div className="vehicle-div">
				<img src={img} alt="" className="vehicle-logo" />
				<p className="vehicle-name">{name}</p>
				<img src={peopleicon} alt="" />
				<p>{sit}</p>
				<p className="rent">${price}</p>
			</div>

			<div className="vehicle-div">
				<img src={img} alt="" className="vehicle-logo" />
				<p className="vehicle-name">{name}</p>
				<img src={peopleicon} alt="" />
				<p>{sit}</p>
				<p className="rent">${price}</p>
			</div>
			<div className="vehicle-div">
				<img src={img} alt="" className="vehicle-logo" />
				<p className="vehicle-name">{name}</p>
				<img src={peopleicon} alt="" />
				<p>{sit}</p>
				<p className="rent">${price}</p>
			</div>
		</div>
	);
};

export default VehicleInfo;