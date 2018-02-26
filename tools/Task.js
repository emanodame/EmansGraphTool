class Task {
    constructor(iterator, ms = 1750) {
        this.step = this.step.bind(this);

        this.iterator = iterator;
        this.ms = ms;
    }

    step() {
        this.result = this.iterator.next((this.result || {}).value);
    }

    pause() {
        if (this.ref) {
            clearInterval(this.ref);
            this.ref = null;
        }
    }

    resume(ms = this.ms) {
        if (ms !== this.ms) {
            this.pause();
            this.ms = ms;
        }

        if (!this.ref) {
            this.step();
            this.ref = setInterval(this.step, this.ms);
        }
    }
}