import React, { Component } from "react";
import { DropdownButton } from 'react-bootstrap';

//TODO
// +++import colors and display them in the div bkgs
// should I combine all green lines into one line?
// set up the divs to be clickable
// capture the urls for the vehicle schedules
// import all lines, filter by bus / train
// 1 = subway, 3 = bus "filter%5Broute_type%5D=1"
// https://api-v3.mbta.com/routes?filter%5Broute_type%5D=1
// then show the line stops and directions
// https://api-v3.mbta.com/stops?filter%5Broute%5D=Red
// then show the predictions for that stop
// ideally they are all stateless and in the main app
// reacting to the previous input
// hiding forms with css
// document.getElementsByClassName("dropdown")[0].classList.add('visible')
// have fun
// learn shit

export default class LineSelector extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<div
					className="pulldown">
					<select
						name="Lines"
						onChange={event =>
							this.props.handleLineSelector(event.target.value)
						}
						value={this.props.line}
					>

						<option value="Select_A_Line" defaultValue>Select A Line</option>
						<option value="Blue">Blue</option>
						<option value="Green-B">Green B</option>
						<option value="Green-C">Green C</option>
						<option value="Green-D">Green D</option>
						<option value="Green-E">Green E</option>
						<option value="Orange">Orange</option>
						<option value="Red">Red</option>
					</select>
				</div>
			</React.Fragment>
		);
	}
}
