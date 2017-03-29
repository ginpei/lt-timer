import React from 'react';
import Timer from './models/Timer.js';

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
	constructor() {
		super();
		this._timer = null;
		this._tmCount = null;

		this.state = {
			running: false,
		};
	}

	render() {
		const running = this.state.running;
		const pause = this.pause.bind(this);
		const start = this.start.bind(this);

		return <div className="IndexPage">
				<div className="TimeRest">
					<TimeRestFigure>5</TimeRestFigure>
					<TimeRestDelimiter />
					<TimeRestFigure>0</TimeRestFigure>
					<TimeRestFigure>0</TimeRestFigure>
				</div>
				<div className="IndexPage-controller">
					<ControlButton onClick={start} hidden={running}>Start</ControlButton>
					<ControlButton onClick={pause} hidden={!running}>Pause</ControlButton>
					<ControlButton disabled={running}>Reset</ControlButton>
					<ControlButton>Preferences</ControlButton>
				</div>
			</div>;
	}

	isRunning() {
		return this._timer && this._timer.isRunning();
	}

	start() {
		const timer = this._timer = new Timer();

		timer.start(Date.now());
		this._startCountingDown();

		this.setState({
			running: this.isRunning(),
		});
	}

	pause() {
		this._timer.pause();
		this._stopCountingDown();

		this.setState({
			running: this.isRunning(),
		});
	}

	_startCountingDown() {
		this._tmCount = setInterval(()=>{
			this.tick(Date.now());
		}, 100);
	}

	_stopCountingDown() {
		clearInterval(this._tmCount);
		this._tmCount = null;
	}

	tick(now) {
		const startedAt = this._timer && this._timer.startedAt;
		console.debug('tick', now - startedAt);
	}
}
