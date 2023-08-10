import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, Redirect } from 'react-router';
import VehicleInfo from '../VehicleInfo/VehicleInfo';
import { UserContext } from '../../App';
import locationList from '../../fake api/locationList'
import './SelectDestination.css';
import Data from '../../fake api/Data';
import { Link } from 'react-router-dom/cjs/react-router-dom';
const SelectDestination = () => {
	const [selection, setSelection] = useState(true);
	const [destination, setDestination] = useState({
		pickForm: '',
		pickTo: ''
	});
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const [locationForm, setLocationFrom] = useState(locationList);
	const [locationTo, setLocationTo] = useState(locationList);
	const { id } = useParams();
	const vehicle = Data.find(info => info.id == id);
	const { register, handleSubmit, watch, errors } = useForm();
	const handleDestination = (e, type = "from") => {
		const newDestination = { ...destination };
		newDestination[e.target.name] = e.target.value;
		setDestination(newDestination);
		if (type === "form") {
			setLocationTo(locationList.filter(localtion => localtion.id !== Number(e.target.value)));
		}
		else {
			setLocationFrom(locationList.filter(localtion => localtion.id !== Number(e.target.value)));
		}
	}
	const onNext = () => {
		setSelection(!selection);
	}
	const onSubmit = () => {
		const data = {
			fullName: loggedInUser.name,
			email: loggedInUser.email,
			pickForm: locationList.find(each => each.id === Number(destination.pickForm))?.name,
			pickTo: locationList.find(each => each.id === Number(destination.pickTo))?.name
		}
		let existingData = localStorage.getItem("data");
		if (existingData) {
			existingData = JSON.parse(existingData);
			existingData.push(data);
			localStorage.setItem("data", JSON.stringify(existingData))
		}
		else {
			localStorage.setItem("data", JSON.stringify([data]))
		}
	}
	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-lg-5 col-sm-12 col-md-5">
						{selection ?
							<div className="destination-card">
								<form className="ship-form" onSubmit={() => onNext()}>
									<p>Name</p>
									< input name="fullName" value={loggedInUser.name} disabled />
									<p>Email</p>
									< input name="email" value={loggedInUser.email} disabled />
									<p>Pick From</p>
									<select className='form-control' required name="pickForm" onChange={e => handleDestination(e, "form")} ref={register({ required: true })} placeholder="pick from">
										<option value=''>--Select Option--</option>
										{
											locationForm.map(element => (
												<option value={element.id}>{element.name}</option>
											))
										}
									</select>
									{errors.pickUpForm && <span className="error">Name is required</span>}
									<p>Pick To</p>
									<select className='form-control' name="pickTo" required onChange={e => handleDestination(e, "to")} ref={register({ required: true })} placeholder="pick to">
										<option value=''>--Select Option--</option>
										{
											locationTo.map(element => (
												<option value={element.id}>{element.name}</option>
											))
										}
									</select>
									{errors.pickUpForm && <span className="error">Name is required</span>}
									<input className="submit-btn" type="submit" value="Next" />
								</form>
							</div> :
							<div className="destination-container">
								<div className="destination-div d-flex">
									<p>{locationList.find(each => each.id === Number(destination.pickForm))?.name} </p>
									<p className='mx-2'> to  </p>
									<p>{locationList.find(each => each.id === Number(destination.pickTo))?.name} </p>
								</div>
								<div className="vehicle-info">
									<VehicleInfo vehicle={vehicle} key={id}></VehicleInfo>
									<Link to={'/order'} >   <input onClick={() => onSubmit()} className="submit-btn" type="submit" value="Confirm" /></Link>
								</div>
							</div>
						}
					</div>
					<div className="col-lg-7 col-sm-12 col-md-7">
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3280951562897!2d90.36650911429808!3d23.806929392532837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d6f6b8c2ff%3A0x3b138861ee9c8c30!2sMirpur%2010%20Roundabout%2C%20Dhaka%201216!5e0!3m2!1sen!2sbd!4v1616252904848!5m2!1sen!2sbd" className="map-style" loading="lazy"></iframe>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SelectDestination;