class IndexPage extends React.Component {
	render() {
		return (
			<div>
				<h1>Timelimit</h1>
				<div>
					<input type="hidden" value={this.state.period} />
					<button onClick={this.startButton_onClick.bind(this)}>Start</button>
					<button onClick={this.stopButton_onClick.bind(this)}>Stop</button>
				</div>
				<TimeRest rest={this.state.rest}></TimeRest>
			</div>
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			period: 300000,  // 5m
			rest: 0,
		};
	}

	_startCountDown() {
		this._stopCountDown();

		this._tmCountDown = window.setInterval(()=>{
			let now = Date.now();
			this.setState({
				rest: this.state.period - (now - this.state.startedAt),
			});
		}, 100);
	}

	_stopCountDown() {
		window.clearInterval(this._tmCountDown);
	}

	startButton_onClick(event) {
		this.setState({
			startedAt: Date.now(),
		});
		this._startCountDown();
	}

	stopButton_onClick(event) {
		this.setState({
			startedAt: null,
		});
		this._stopCountDown();
	}
}
