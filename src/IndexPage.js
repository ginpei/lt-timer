import React from 'react';

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
					<button className="IndexPage-controller-button">Start</button>
					<button className="IndexPage-controller-button">Pause</button>
					<button className="IndexPage-controller-button">Preferences</button>
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
