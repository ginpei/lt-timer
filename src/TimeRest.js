class TimeRest extends React.Component {
	render() {
		let rest = this.props.rest;
		let restSec = Math.ceil(rest / 1000);

		let min = Math.floor(restSec / 60);
		let sec = restSec % 60;
		let sSec = `0${sec}`.slice(-2);  // 9 -> "09"

		return (
			<span className="TimeRest">{min}:{sSec}</span>
		);
	}

	constructor(props) {
		super(props);
	}
}
