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
// https://api-v3.mbta.com/predictions?filter[stop]=place-portr STOP_ID will show predictions

// /stops/place-portr
// how to get stop numbers?
// https://api-v3.mbta.com/stops?filter[route]=Red

// it doesn't seem like that works. I'm not sure where to get the stop id from

export default class StopSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stops: "" //I could just use a var here. idk if there is any +- to
		};
	}
	//
	// shouldComponentUpdate(nextProps) {
	// 	console.log( `next line = ${nextProps.line}` );
	// 	console.log( `this props line = ${this.props.line}` );
	// 	console.log( nextProps.line != this.props.line );
	// 	return( nextProps.line != this.props.line );
	// }

	componentWillMount(props) {
		let stops = []
		try {
			stops = stop_names[this.props.line].map( stop => {
				return (
					<option
						value={stop}
						key={stop}
						>
							{stop}
					</option>
				)
			})
		} catch (e) {
			console.log(e)
		}
		this.setState({ stops: stops });
	}

	componentWillReceiveProps(nextProps) {
			let stops = []
			try {
				stops = stop_names[nextProps.line].map( stop => {
					return (
						<option
							value={stop}
							key={stop}
							>
								{stop}
						</option>
					)
				})
			} catch (e) {
				console.log(e)
			}
			this.setState({ stops: stops });
	};


	render() {
		return (
			<div className = "pulldown">
			<select
				name="Stops"
				className="stopList pulldown"
				onChange={event =>
					// this.props.handleStopSelector(event.target.value)
					{
						console.log("value = " + event.target.value);
						console.dir( event.target );//.target.id);
						console.log( event.target.id );
						console.dir(event);
					this.props.handleStopSelector(event.target.value, event.target.id)}
				}
			>
				{this.state.stops}
			</select>
		</div>
		);
	}
}

const stop_names = {
'Orange': [
"Forest Hills",
"Green Street",
"Stony Brook",
"Jackson Square",
"Roxbury Crossing",
"Ruggles",
"Massachusetts Avenue",
"Back Bay",
"Tufts Medical Center",
"Chinatown",
"Downtown Crossing",
"State", "Haymarket",
"North Station",
"Community College",
"Sullivan Square",
"Assembly",
"Wellington",
"Malden Center",
"Oak Grove"],

'Red': ["Alewife",
"Davis",
"Porter",
"Harvard",
"Central",
"Kendall/MIT",
"Charles/MGH",
"Park Street",
"Downtown Crossing",
"South Station",
"Broadway",
"Andrew",
"JFK/UMass",
"Savin Hill",
"Fields Corner",
"Shawmut",
"North Quincy",
"Quincy Center",
"Quincy Adams",
"Braintree",
"Ashmont"],

'Blue': ["Bowdoin",
"Government Center",
"State",
"Aquarium",
"Maverick",
"Airport",
"Wood Island",
"Orient Heights",
"Suffolk Downs",
"Beachmont",
"Revere Beach",
"Wonderland"],

'Green-B': ["Boston College",
"South Street",
"Chestnut Hill Avenue",
"Chiswick Road",
"Sutherland Road",
"Washington Street",
"Warren Street",
"Allston Street",
"Griggs Street",
"Harvard Avenue",
"Packards Corner",
"Babcock Street",
"Pleasant Street",
"Saint Paul Street",
"Boston University West",
"Boston University Central",
"Boston University East",
"Blandford Street",
"Kenmore",
"Hynes Convention Center",
"Copley",
"Arlington",
"Boylston",
"Park Street"],

'Green-C': ["Cleveland Circle",
"Englewood Avenue",
"Dean Road",
"Tappan Street",
"Washington Square",
"Fairbanks Street",
"Brandon Hall",
"Summit Avenue",
"Coolidge Corner",
"Saint Paul Street",
"Kent Street",
"Hawes Street",
"Saint Marys Street",
"Kenmore",
"Hynes Convention Center",
"Copley",
"Arlington",
"Boylston",
"Park Street",
"Government Center",
"Haymarket",
"North Station"],

'Green-D': ["Government Center",
"Park Street",
"Boylston",
"Arlington",
"Copley",
"Hynes Convention Center",
"Kenmore",
"Fenway",
"Longwood",
"Brookline Village",
"Brookline Hills",
"Beaconsfield",
"Reservoir",
"Chestnut Hill",
"Newton Centre",
"Newton Highlands",
"Eliot",
"Waban",
"Woodland",
"Riverside"],

'Green-E' : ["Heath Street",
"Back of the Hill",
"Riverway",
"Mission Park",
"Fenwood Road",
"Brigham Circle",
"Longwood Medical Area",
"Museum of Fine Arts",
"Northeastern University",
"Symphony",
"Prudential",
"Copley",
"Arlington",
"Boylston",
"Park Street",
"Government Center",
"Haymarket",
"North Station",
"Science Park",
"Lechmere"]
}
