class IndexPage extends React.Component {
	render() {
		let classNameList = ['IndexPage'];
		if (this.state.highWorned) {
			if (Math.floor(this.state.rest / 1000) % 2) {
				classNameList.push('is-warned');
			}
		}
		else if (this.state.worned) {
			classNameList.push('is-warned');
		}

		return (
			<div className={classNameList.join(' ')}>
				<TimeRest rest={this.state.rest} width={this.state.width}></TimeRest>
				<div>
					<input type="hidden" value={this.state.period} />
					<button onClick={this.startButton_onClick.bind(this)}>Start</button>
					<button onClick={this.stopButton_onClick.bind(this)}>Stop</button>
					<button onClick={this.playWarning_onClick.bind(this)}>Warning</button>
					<button onClick={this.playFinished_onClick.bind(this)}>Finished</button>
				</div>
				<audio ref="seWarning" src="lib/D0002011516_00000_A_001.m4a"></audio>
				<audio ref="seFinished" src="lib/D0002011522_00000_A_001.m4a"></audio>
			</div>
		);
	}

	constructor(props) {
		super(props);
		let period = 300000;  // 5m
		this.state = {
			highWarningTime: 10000,  // 10s
			period: period,
			rest: period,
			warningTime: 60000,  // 1m
			width: document.body.clientWidth,
		};
	}

	/**
	 * Start counting down.
	 */
	startCountDown() {
		this.stopCountDown();

		this.setState({
			startedAt: Date.now(),
		});

		this._tmCountDown = window.setInterval(()=>{
			this._updateCountDown();
		}, 100);
	}

	_updateCountDown() {
		let worned = (this.state.rest <= this.state.warningTime);
		if (!this.state.worned && worned) {
			this.playSound('seWarning');
		}

		let highWorned = (this.state.rest <= this.state.highWarningTime);

		let now = Date.now();
		let rest = this.state.period - (now - this.state.startedAt);
		if (rest <= 0) {
			rest = 0;
			if (this.state.rest > 0) {
				this.playSound('seFinished');
			}
		}

		this.setState({
			highWorned: highWorned,
			rest: rest,
			worned: worned,
		});
	}

	/**
	 * Stop counting down.
	 */
	stopCountDown() {
		window.clearInterval(this._tmCountDown);

		this.setState({
			rest: this.state.period,
			startedAt: null,
		});
	}

	/**
	 * @param {string} name The name of the sound effect.
	 * @example
	 * this.playSound('seFinished');
	 */
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
		this.startCountDown();
	}

	stopButton_onClick(event) {
		this.stopCountDown();
	}

	playWarning_onClick(event) {
		this.playSound('seWarning');
	}

	playFinished_onClick(event) {
		this.playSound('seFinished');
	}
}
