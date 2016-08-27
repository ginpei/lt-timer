class IndexPage extends React.Component {
	render() {
		return (
			<div>
				<h1>Timelimit</h1>
				<div>
					<input type="hidden" value={this.state.period} />
					<button onClick={this.startButton_onClick.bind(this)}>Start</button>
					<button onClick={this.stopButton_onClick.bind(this)}>Stop</button>
					<button onClick={this.playWarning_onClick.bind(this)}>Warning</button>
					<button onClick={this.playFinished_onClick.bind(this)}>Finished</button>
				</div>
				<TimeRest rest={this.state.rest}></TimeRest>
				<audio ref="seWarning" src="lib/D0002011516_00000_A_001.m4a"></audio>
				<audio ref="seFinished" src="lib/D0002011522_00000_A_001.m4a"></audio>
			</div>
		);
	}

	constructor(props) {
		super(props);
		let period = 300000;  // 5m
		this.state = {
			period: period,
			rest: period,
		};
	}

	_startCountDown() {
		this._stopCountDown();

		this.setState({
			startedAt: Date.now(),
		});

		this._tmCountDown = window.setInterval(()=>{
			let now = Date.now();
			this.setState({
				rest: this.state.period - (now - this.state.startedAt),
			});
		}, 100);
	}

	_stopCountDown() {
		window.clearInterval(this._tmCountDown);

		this.setState({
			startedAt: null,
		});
	}

	playSound(name) {
		let audio = this.refs[name];
		if (!audio) {
			throw new Error(`Wrong audio name: ${name}`);
		}

		let playingFlagName = `_playing_${name}`;

		if (!this[playingFlagName] || audio.currentTime >= audio.duration) {
			audio.play();
			this[playingFlagName] = true;
		}
		else {
			audio.pause();
			audio.currentTime = 0;
			this[playingFlagName] = false;
		}
	}

	startButton_onClick(event) {
		this._startCountDown();
	}

	stopButton_onClick(event) {
		this._stopCountDown();
	}

	playWarning_onClick(event) {
		this.playSound('seWarning');
	}

	playFinished_onClick(event) {
		this.playSound('seFinished');
	}
}
