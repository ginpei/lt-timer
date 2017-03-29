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
					<ControlButton>Start</ControlButton>
					<ControlButton disabled={true}>Pause</ControlButton>
					<ControlButton>Preferences</ControlButton>
				</div>
			</div>;
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
