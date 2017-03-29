import React from 'react';

function ControlButton(props) {
	return <button {...props} className="IndexPage-controller-button" />;
}

export default class IndexPage extends React.Component {
	render() {
		const { figureStyle, delimiterStyle } = this._buildRenderVars();

		return <div className="IndexPage">
				<div className="TimeRest">
					<span style={figureStyle} className="TimeRest-figure">5</span>
					<span style={delimiterStyle} className="TimeRest-figure">:</span>
					<span style={figureStyle} className="TimeRest-figure">0</span>
					<span style={figureStyle} className="TimeRest-figure">0</span>
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

	_buildRenderVars() {
		const figureStyle = {
			fontSize: '300px',
		};

		const delimiterStyle = {
			fontSize: '300px',
		};

		return {
			figureStyle,
			delimiterStyle,
		};
	}
}
