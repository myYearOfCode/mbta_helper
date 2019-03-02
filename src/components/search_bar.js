import React, { Component } from "react";
import Axios from "axios";

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stopNum: "70065"
		};
	}

	render() {
		const makeApiCall = (stopNum = 70065) => {
			try {
				return Axios.get(
					`https://api-v3.mbta.com/schedules?filter[stop]=${stopNum}`
				);
			} catch (error) {
				console.error(error);
			}
		};

		return (
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="enter your stop number."
					value={this.state.stopNum}
					onChange={event => this.onInputChange(event.target.value)}
				/>
				{console.log(makeApiCall())}
			</div>
		);
	}
	onInputChange(stopNum) {
		this.setState({ stopNum });
	}
}
