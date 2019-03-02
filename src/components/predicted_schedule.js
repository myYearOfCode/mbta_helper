import React, { Component } from "react";
import Axios from "axios";

//TODO
// +++import colors and display them in the div bkgs
//set up the divs to be clickable
//capture the urls for the vehicle schedules
// import all lines, filter by bus / train
// 1 = subway, 3 = bus "filter%5Broute_type%5D=1"
// https://api-v3.mbta.com/routes?filter%5Broute_type%5D=1
//then show the line stops and directions
// https://api-v3.mbta.com/stops?filter%5Broute%5D=Red
//then show the predictions for that stop
//ideally they are all stateless and in the main app
//reacting to the previous input
//have fun
//learn shit

export default class PredictedSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stop_id: props.stop_id,
			trips: "trips",
			dir_one_array: [],
			dir_zero_array: []
		};
	}
//
	componentWillReceiveProps(nextProps) {
		// example call
		// https://api-v3.mbta.com/predictions?filter[stop]=place-portr
		this.setState({stop: this.props.stop})
		// console.log(`predicted schedule has received ${nextProps.stop_id}`)
		this.setDirectionLabels(this.props.line)
		if (typeof nextProps !== "undefined" && this.state.stop_id !== nextProps.stop_id){
			// maybe I should make this a better test to see if it actually needs a rerender.
			// console.log("stop id = " + this.state.stop_id)
			// console.log("next stop id = " + nextProps.stop_id)
			this.setState({stop_id: nextProps.stop_id});
			var todaysDate = new Date();
			var timeNow = todaysDate.getTime();
			fetch(`https://api-v3.mbta.com/predictions?filter[stop]=${nextProps.stop_id}`)
				.then(response => {
					return response.json();
				})
				.then(response => {
					let trips = response.data.map(trip => {
						return (
							<div
								value={trip.id}
								time={trip.attributes.arrival_time}
								direction={trip.attributes.direction_id}
								id={trip.id}
								key={trip.id}
								line={trip.relationships.route.data.id}
							>
								{trip.id}
							</div>
						);

					});
					this.setState({ trips: trips});
					// console.log(trips)
					nextProps.handlePredictedSchedule(trips) // passes trips up. useful?
					let maxLength = 3
					let dir_one_array = trips.filter( trip => trip.props.direction == 1).filter( trip => trip.props.line == this.props.line);
					// filter again here by {trip.props.line}
					let dir_zero_array = trips.filter( trip => trip.props.direction == 0).filter( trip => trip.props.line == this.props.line);
					console.log(dir_one_array)
					// filter again here by {trip.props.line}
					let dir_one_times = dir_one_array.slice(0,maxLength).map( trip => {
						return (this.doTimeMath(trip, timeNow))
					})

					let dir_zero_times = dir_zero_array.slice(0,maxLength).map( trip => {
						return (this.doTimeMath(trip, timeNow))
					})

					this.setState({
						dir_one_array: dir_one_array,
						dir_zero_array: dir_zero_array,
					  dir_zero_times: dir_zero_times,
						dir_one_times: dir_one_times
					})
			});
		}
	}

	doTimeMath(trip, timeNow){
		console.dir(trip)
		try {
			let waitTime = Math.round((Date.parse(trip.props.time) - timeNow) / 60000)
			console.log(trip.props.time)
			if (waitTime > 0) {
				return (
					<div key = {trip.props.time}>
						{String(waitTime)+" Minutes away."}
					</div>
				)
			}
			else {
				console.dir(trip.id)
				//trip.relationships.trip.data.id
				return (
					<div key = {trip.props.id}>
						{"At station."}
					</div>
				)
			}
		} catch (e) {
			console.log('error accessing trip.props.time')
			console.log(e)
		}
	}

  setDirectionLabels(line){
		switch (line) {
			case "Orange":
			case "Green-B":
			case "Green-C":
			case "Green-D":
			case "Green-E":
				this.setState({ line_zero: "West" })
				this.setState({ line_one: "East" })
				break;
			case "Red":
			case "Blue":
				this.setState({ line_zero: "South" })
				this.setState({ line_one: "North" })
				break;
		}
	}
	render() {
		if (this.props.geo_located) {
			var out_string_text = `The stop closest to you is: `
		}
		else {
			var out_string_text = `You have selected: `
		}

		var out_string_station = this.props.stop

		return (
			<div className = "schedule hidden">
				<div className = "stopText">
					<div id="closestStop" className="">
						{out_string_text}
					</div>
					<div id="closestStop" className="station">
						{out_string_station}
					</div>
				</div>

				<div id="dir_one_outer" className="trips">
					<div id="dir_one" className="direction">
						{this.state.line_zero}:
					</div>
					<div className="arrivals">
						{this.state.dir_one_times}
					</div>
				</div>

				<div id="dir_two_outer" className="trips">
					<div id="dir_two" className="direction">
						{this.state.line_one}:
					</div>
					<div className="arrivals">
						{this.state.dir_zero_times}
					</div>
				</div>

			</div>
		);
	}
}
