import React, { Component } from "react";
import Axios from "axios";

export default class GetSchedule extends Component {
	// make a function that receives the stop in props and runs the api call
	// here is the porter api call https://api-v3.mbta.com/schedules?filter[stop]=70065
	constructor(props) {
		super(props);
		this.state = {
			stops: ""
		};
	}

	componentWillReceiveProps(nextProps) {
		// getDerivedStateFromProps() {
		console.log(nextProps);
		fetch(
			`https://api-v3.mbta.com/schedules?filter[stop]=${this.props.stop}`
		)
			.then(response => {
				return response.json();
			})
			.then(response => {
				let stops = response.data.map(stop => {
					return (
						<option
							value={stop.attributes.name}
							key={stop.attributes.latitude}
						>
							{stop.attributes.name}
						</option>
					);
				});
				this.setState({ stops: stops });
				console.log("state", this.response);
			});
	}

	render() {
		return <div>Get_Schedule</div>;
	}
}
