import React from "react";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './Order.css'
const Order = () => {
	let orderData = localStorage.getItem("data") || '[]';
	let orderItem = JSON.parse(orderData)
	return (
		<div className="d-flex center distination-table">
			<Table striped bordered hover >
				<thead className="table-header">
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Location To</th>
						<th>Location Form</th>
					</tr>
				</thead>
				<tbody>
					{
						orderItem.map(data =>
							<tr>
								<td>{data.fullName}</td>
								<td>{data.email}</td>
								<td>{data.pickForm}</td>
								<td>{data.pickTo}</td>
							</tr>
						)
					}
				</tbody>
			</Table>
		</div>
	)
}

export default Order;