import React, { Component } from "react";
import AllLines from "./all_lines";
import GeoLoc from "./geo_locator";
import GetSchedule from "./get_schedule";
import LineSelector from "./line_selector";
import MBTALogo from "./MBTA_logo"
import PredictedSchedule from "./predicted_schedule";
import SearchBar from "./search_bar";
import StopSelector from "./stop_selector";

// TODO:
// make the stop selector and line selector controlled components
// grab schedules from geolocated stations
// grab schedules from selected stations
// determine direction and label them with end Stops
//    https://api-v3.mbta.com/routes/Red
//    "data.attributes.direction_destinations: [
				// "Ashmont/Braintree",
				// "Alewife"
				// ]
//    "data.attributes.direction_names: [
				// "South",
				// "North"
				// ],
// fix issue with blank divs building up due to a lack of keys.
// fix issue with geolocate button getting messed up after clicking on it.
// make pretty.
// have fun

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			line: "Select_A_Line",
			stop: "",
			stop_id: "",
			geo_located: false
		};
		this.handleStopSelector = this.handleStopSelector.bind(this);
		this.handleLineSelector = this.handleLineSelector.bind(this);
		this.handleClosestStop = this.handleClosestStop.bind(this);
		this.handlePredictedSchedule = this.handlePredictedSchedule.bind(this);
	}

	handleLineSelector = line => {
		console.log("State: " + this.state.line)
		console.log("Line: " + line);
		this.setState({ line: line });
		document.getElementsByClassName("stopList")[0].classList.remove('hidden');
		document.getElementsByClassName("stopList")[0].classList.add('visible');
	};

	handleStopSelector = (stop) => {
		this.setState({ stop: stop, stop_id: placeDict[stop], geo_located: false});
		document.getElementsByClassName("trips")[0].classList.remove('hidden');
		document.getElementsByClassName("trips")[0].classList.add('visible');
		document.getElementsByClassName("trips")[1].classList.remove('hidden');
		document.getElementsByClassName("trips")[1].classList.add('visible');
		let stopTextElements = document.getElementsByClassName("schedule")
		console.dir(stopTextElements)
		stopTextElements[0].classList.remove('hidden');
		stopTextElements[0].classList.add('visible');
		// stopTextElements[1].classList.remove('hidden');
		// stopTextElements[1].classList.add('visible');
	};

	handleClosestStop = (closestStop,closestStopShort) => {
		this.setState({ stop: closestStop, stop_id: closestStopShort, geo_located: true});
		document.getElementsByClassName("trips")[0].classList.remove('hidden');
		document.getElementsByClassName("trips")[0].classList.add('visible');
		document.getElementsByClassName("trips")[1].classList.remove('hidden');
		document.getElementsByClassName("trips")[1].classList.add('visible');
		console.dir(document.getElementsByClassName("stopText"))
		document.getElementsByClassName("schedule")[0].classList.remove('hidden');
		document.getElementsByClassName("schedule")[0].classList.add('visible');
	};

	handlePredictedSchedule = (predicted_schedule) => {
		this.setState({ predicted_schedule: predicted_schedule});
	};

	render() {

		return (
			<React.Fragment>
				<MBTALogo
				line = {this.state.line}
				/>
				<LineSelector
					line = {this.state.line}
					handleLineSelector = {this.handleLineSelector}
					className = "child pulldown"
				/>
				<StopSelector
					line = {this.state.line}
					handleStopSelector = {this.handleStopSelector}
					className = "child hidden pulldown"
				/>

				<GeoLoc
					handleClosestStop = {this.handleClosestStop}
					geo_located = {this.state.geo_located}
					stop = {this.state.stop}
					className="child hidden geoloc"
				/>

				<PredictedSchedule
					stop_id = {this.state.stop_id}
					stop = {this.state.stop}
					line = {this.state.line}
					geo_located = {this.state.geo_located}
					closestStop = {this.state.closestStop}
					handlePredictedSchedule = {this.handlePredictedSchedule}
					className = "child hidden"
				/>
				<div className = "empty"></div>
			</React.Fragment>
		);
	}
}
// <SearchBar />

// <AllLines />
let placeDict = {
    "Alewife": "place-alfcl",
    "Davis": "place-davis",
    "Porter": "place-portr",
    "Harvard": "place-harsq",
    "Central": "place-cntsq",
    "Kendall/MIT": "place-knncl",
    "Charles/MGH": "place-chmnl",
    "Park Street": "place-pktrm",
    "Downtown Crossing": "place-dwnxg",
    "South Station": "place-sstat",
    "Broadway": "place-brdwy",
    "Andrew": "place-andrw",
    "JFK/UMass": "place-jfk",
    "Savin Hill": "place-shmnl",
    "Fields Corner": "place-fldcr",
    "Shawmut": "place-smmnl",
    "North Quincy": "place-nqncy",
    "Quincy Center": "place-qnctr",
    "Quincy Adams": "place-qamnl",
    "Braintree": "place-brntn",
    "Ashmont": "place-asmnl",
    "Forest Hills": "place-forhl",
    "Green Street": "place-grnst",
    "Stony Brook": "place-sbmnl",
    "Jackson Square": "place-jaksn",
    "Roxbury Crossing": "place-rcmnl",
    "Ruggles": "place-rugg",
    "Massachusetts Avenue": "place-masta",
    "Back Bay": "place-bbsta",
    "Tufts Medical Center": "place-tumnl",
    "Chinatown": "place-chncl",
    "Downtown Crossing": "place-dwnxg",
    "State": "place-state",
    "Haymarket": "place-haecl",
    "North Station": "place-north",
    "Community College": "place-ccmnl",
    "Sullivan Square": "place-sull",
    "Assembly": "place-astao",
    "Wellington": "place-welln",
    "Malden Center": "place-mlmnl",
    "Oak Grove": "place-ogmnl",
    "Bowdoin": "place-bomnl",
    "Government Center": "place-gover",
    "State": "place-state",
    "Aquarium": "place-aqucl",
    "Maverick": "place-mvbcl",
    "Airport": "place-aport",
    "Wood Island": "place-wimnl",
    "Orient Heights": "place-orhte",
    "Suffolk Downs": "place-sdmnl",
    "Beachmont": "place-bmmnl",
    "Revere Beach": "place-rbmnl",
    "Wonderland": "place-wondl",
    "Boston College": "place-lake",
    "South Street": "place-sougr",
    "Chestnut Hill Avenue": "place-chill",
    "Chiswick Road": "place-chswk",
    "Sutherland Road": "place-sthld",
    "Washington Street": "place-wascm",
    "Warren Street": "place-wrnst",
    "Allston Street": "place-alsgr",
    "Griggs Street": "place-grigg",
    "Harvard Avenue": "place-harvd",
    "Packards Corner": "place-brico",
    "Babcock Street": "place-babck",
    "Pleasant Street": "place-plsgr",
    "Saint Paul Street": "place-stplb",
    "Boston University West": "place-buwst",
    "Boston University Central": "place-bucen",
    "Boston University East": "place-buest",
    "Blandford Street": "place-bland",
    "Kenmore": "place-kencl",
    "Hynes Convention Center": "place-hymnl",
    "Copley": "place-coecl",
    "Arlington": "place-armnl",
    "Boylston": "place-boyls",
    "Park Street": "place-pktrm",
    "Cleveland Circle": "place-clmnl",
    "Englewood Avenue": "place-engav",
    "Dean Road": "place-denrd",
    "Tappan Street": "place-tapst",
    "Washington Square": "place-bcnwa",
    "Fairbanks Street": "place-fbkst",
    "Brandon Hall": "place-bndhl",
    "Summit Avenue": "place-sumav",
    "Coolidge Corner": "place-cool",
    "Saint Paul Street": "place-stpul",
    "Kent Street": "place-kntst",
    "Hawes Street": "place-hwsst",
    "Saint Marys Street": "place-smary",
    "Government Center": "place-gover",
    "Haymarket": "place-haecl",
    "North Station": "place-north",
    "Fenway": "place-fenwy",
    "Longwood": "place-longw",
    "Brookline Village": "place-bvmnl",
    "Brookline Hills": "place-brkhl",
    "Beaconsfield": "place-bcnfd",
    "Reservoir": "place-rsmnl",
    "Chestnut Hill": "place-chhil",
    "Newton Centre": "place-newto",
    "Newton Highlands": "place-newtn",
    "Eliot": "place-eliot",
    "Waban": "place-waban",
    "Woodland": "place-woodl",
    "Riverside": "place-river",
    "Heath Street": "place-hsmnl",
    "Back of the Hill": "place-bckhl",
    "Riverway": "place-rvrwy",
    "Mission Park": "place-mispk",
    "Fenwood Road": "place-fenwd",
    "Brigham Circle": "place-brmnl",
    "Longwood Medical Area": "place-lngmd",
    "Museum of Fine Arts": "place-mfa",
    "Northeastern University": "place-nuniv",
    "Symphony": "place-symcl",
    "Prudential": "place-prmnl",
    "Copley": "place-coecl",
    "Arlington": "place-armnl",
    "Boylston": "place-boyls",
    "Park Street": "place-pktrm",
    "Government Center": "place-gover",
    "Haymarket": "place-haecl",
    "North Station": "place-north",
    "Science Park": "place-spmnl",
    "Lechmere": "place-lech"
}
