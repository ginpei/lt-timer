export default class Timer {
	isRunning() {
		return Boolean(this.startedAt) && !this._paused;
	}

	start(date) {
		if (!date) {
			date = Date.now();
		}

		this.startedAt = date;
	}

	pause(date) {
		if (!date) {
			date = Date.now();
		}

		this._paused = true;
		this._pausedAt = date;
	}
}
