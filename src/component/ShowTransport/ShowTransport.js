import React from 'react';
import { useHistory } from 'react-router';
import './ShowTransport.css'
const ShowTransport = (props) => {
	const { name, img, id } = props.vehicle;
	const history = useHistory();
	const handleRoute = () => {
		history.push(`${id}`)
	}
	return (
		<div>
			<div className="main-div" onClick={handleRoute}>
				<img src={img} alt="" className="displayImg" />
				<p>{name}</p>
			</div>
		</div>
	);
};

export default ShowTransport;