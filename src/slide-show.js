class SlideShow extends HTMLElement {
    constructor() {
        super()
        this.slideIndex = 1
        this.render()
        this.attachStyles()
    }

    attachStyles() {
        const style = document.createElement("style")
        style.textContent = `
            * { box-sizing: border-box; }
            .slideshow-container { max-width: 1000px; position: relative; margin: auto; }
            .mySlides { display: none; }
            .prev, .next { cursor: pointer; position: absolute; top: 50%; width: auto; margin-top: -22px; padding: 16px; color: white; font-weight: bold; font-size: 18px; transition: 0.6s ease; border-radius: 0 3px 3px 0; user-select: none; }
            .next { right: 0; border-radius: 3px 0 0 3px; }
            .prev:hover, .next:hover { background-color: rgba(0, 0, 0, 0.8); }
            .text { color: #f2f2f2; font-size: 15px; padding: 8px 12px; position: absolute; bottom: 8px; width: 100%; text-align: center; }
            .numbertext { color: #f2f2f2; font-size: 12px; padding: 8px 12px; position: absolute; top: 0; }
            .dot { cursor: pointer; height: 15px; width: 15px; margin: 0 2px; background-color: #bbb; border-radius: 50%; display: inline-block; transition: background-color 0.6s ease; }
            .active, .dot:hover { background-color: #717171; }
            .fade { animation-name: fade; animation-duration: 1.5s; }
            @keyframes fade { from { opacity: .4; } to { opacity: 1; } }
        `
        this.appendChild(style)
    }

    connectedCallback() {
        this.showSlides(this.slideIndex)

        this.querySelector(".prev").addEventListener("click", () => this.plusSlides(-1))
        this.querySelector(".next").addEventListener("click", () => this.plusSlides(1))

        const dots = this.querySelectorAll(".dot")
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => this.currentSlide(index + 1))
        });
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n)
    }

    currentSlide(n) {
        this.showSlides(this.slideIndex = n)
    }

    showSlides(n) {
        let i;
        const slides = this.querySelectorAll(".mySlides")
        const dots = this.querySelectorAll(".dot")

        if (n > slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = slides.length
        }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"
        }

        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active")
        }

        slides[this.slideIndex - 1].style.display = "block"
        dots[this.slideIndex - 1].classList.add("active")
    }

    render() {
        this.innerHTML = `
            <div class="slideshow-container">
                <div class="mySlides fade">
                    <div class="numbertext">1 / 3</div>
                    <img src="slide-one.png" style="width:100%">
                    <div class="text">Caption Text</div>
                </div>
                <div class="mySlides fade">
                    <div class="numbertext">2 / 3</div>
                    <img src="slide-two.png" style="width:100%">
                    <div class="text">Caption Two</div>
                </div>
                <div class="mySlides fade">
                    <div class="numbertext">3 / 3</div>
                    <img src="slide-three.png" style="width:100%">
                    <div class="text">Caption Three</div>
                </div>
                <a class="prev">&#10094;</a>
                <a class="next">&#10095;</a>
            </div>
            <br>
            <div style="text-align:center">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        `;
    }
}

customElements.define('slide-show', SlideShow)
