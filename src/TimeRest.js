class TimeRest extends React.Component {
	render() {
		let rest = this.props.rest;
		let restSec = Math.ceil(rest / 1000);

		let min = Math.floor(restSec / 60);
		let sec = restSec % 60;
		let sSec = `0${sec}`.slice(-2);  // 9 -> "09"
		let sSec2 = sSec.charAt(0);
		let sSec1 = sSec.charAt(1);

		let totalWidth = this.props.width;
		let figureWidth = totalWidth * 2 / 8;
		let delimiterWidth = totalWidth * 1 / 8;
		let fontSize = figureWidth * 1.5;
		let figureStyle = {  fontSize: `${fontSize}px`, width: `${figureWidth}px` };
		let delimiterStyle = { fontSize: `${fontSize}px`, width: `${delimiterWidth}px` };

		return (
			<span className="TimeRest">
				<span style={figureStyle} className="TimeRest-figure">{min}</span>
				<span style={delimiterStyle} className="TimeRest-figure">:</span>
				<span style={figureStyle} className="TimeRest-figure">{sSec2}</span>
				<span style={figureStyle} className="TimeRest-figure">{sSec1}</span>
			</span>
		);
	}

	constructor(props) {
		super(props);
	}
}
