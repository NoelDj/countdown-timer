class CountdownTimer extends HTMLElement {
    constructor() {
        super()
        this.endTime = new Date(this.getAttribute('expiration')).getTime()
        this.render()
        this.startTimer()
    }

    render() {
        this.innerHTML = `
        <p>Countdown<p>
          <div id="timer">
            <span id="days"></span> days 
            <span id="hours"></span> hours 
            <span id="minutes"></span> minutes 
            <span id="seconds"></span> seconds
          </div>
        `;
    }

    startTimer() {
        const timerInterval = setInterval(() => {
            const now = new Date().getTime()
            const distance = this.endTime - now

            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)

            this.querySelector('#days').textContent = days
            this.querySelector('#hours').textContent = hours
            this.querySelector('#minutes').textContent = minutes
            this.querySelector('#seconds').textContent = seconds
            if (distance < 0) {
                clearInterval(timerInterval);
                this.innerHTML = '<div id="timer">Expired</div>'
            }
        }, 1000)
    }
}

customElements.define('countdown-timer', CountdownTimer)