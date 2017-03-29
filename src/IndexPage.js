import React from 'react';

function TimeRestFigure(props) {
	const style = {
		fontSize: '300px',
	};
	return <span style={style} {...props} className="TimeRest-figure" />;
}

function TimeRestDelimiter() {
	return <TimeRestFigure>:</TimeRestFigure>;
}

function ControlButton(props) {
	return <button {...props} className="IndexPage-controller-button" />;
}

export default class IndexPage extends React.Component {
	render() {
		return <div className="IndexPage">
				<div className="TimeRest">
					<TimeRestFigure>5</TimeRestFigure>
					<TimeRestDelimiter />
					<TimeRestFigure>0</TimeRestFigure>
					<TimeRestFigure>0</TimeRestFigure>
				</div>
				<div className="IndexPage-controller">
					<ControlButton hidden={!this.isRunning()}>Start</ControlButton>
					<ControlButton hidden={this.isRunning()}>Pause</ControlButton>
					<ControlButton disabled={this.isRunning()}>Reset</ControlButton>
					<ControlButton>Preferences</ControlButton>
				</div>
			</div>;
	}

	isRunning() {
		return true;
	}
}
