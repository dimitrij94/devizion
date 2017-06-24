/**
 * Created by Dmitrij on 20.04.2017.
 */
export class Timer {
    start: number;
    remaining: number;
    timerId: any;
    delay: number;
    callback: any;
    index = 0;

    constructor(delay: number, callback: (index?: number) => any) {
        this.timerId = delay;
        this.delay = delay;
        this.start = delay;
        this.remaining = delay;
        this.callback = callback;
        this.resume();
    }

    pause() {
        window.clearInterval(this.timerId);
        this.remaining -= new Date().getDate() - this.start;
    }

    resume() {
        this.start = new Date().getDate();
        window.clearInterval(this.timerId);
        this.timerId = window.setInterval(() => {
                this.index += 1;
                this.callback(this.index);
            }, this.remaining
        );
    }
}
