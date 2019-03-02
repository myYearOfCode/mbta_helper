import React, { Component } from "react";
import Axios from "axios";

//TODO
// +++import colors and display them in the div bkgs
//set up the divs to be clickable
//capture the urls for the route schedules
//have fun
//learn shit
// this request filters for red line in the next hour going one way.
// https://api-v3.mbta.com/schedules?filter[route]=Red&filter[min_time]=21:17&filter[max_time]=22:17&filter[direction_id]=0
// ?filter[stop]=STOP_ID will show schedules at any given stop
// https://api-v3.mbta.com/predictions?filter[stop]=STOP_ID will show predictions
//how to get stop numbers?
// https://api-v3.mbta.com/stops?filter[route]=Red

export default class AllLines extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stopNum: "70065",
			routes: ""
		};
	}

	makeUrl(end) {
		return `https://api-v3.mbta.com${end}`;
	}

	componentDidMount() {
		let bkgColor = "";
		fetch("https://api-v3.mbta.com")
			.then(response => {
				return response.json();
			})
			.then(response => {
				let routes = response.data.map((route, index) => {
					return (
						<a href={this.makeUrl(route.links.self)}>
							<div
								className="row"
								key={route.attributes.sort_order + "C"}
							>
								<div
									className="leftColumn"
									key={route.attributes.sort_order + "L"}
									style={{
										color: "black",
										backgroundColor: (bkgColor =
											"#" + route.attributes.color)
									}}
								>
									{route.attributes.long_name}
								</div>
								<div
									className="rightColumn"
									key={route.attributes.sort_order + "R"}
									style={{
										color: "black",
										backgroundColor: (bkgColor =
											"#" + route.attributes.color),
										fontWeight: "Bold"
									}}
								>
									{console.log(route.attributes.color)}
									<p>{route.id}</p>
								</div>
							</div>
						</a>
					);
				});
				this.setState({ routes: routes });
				console.log("state", this.state.routes);
			});
	}

	render() {
		return (
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="enter your stop number."
					value={this.state.stopNum}
					onChange={event => this.onInputChange(event.target.value)}
				/>
				<br />
				<br />
				<hr />
				{this.state.routes}
				{/*console.log(makeApiCall())*/}
			</div>
		);
	}
	onInputChange(stopNum) {
		this.setState({ stopNum });
	}
}
