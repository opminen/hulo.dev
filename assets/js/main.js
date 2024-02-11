const root = document.querySelector(":root");
const modal = document.querySelector(".modal");
const playerEl = document.querySelector("iframe")

const wrapper = document.querySelector(".swiper__wrapper")
const line_dots = document.querySelector(".modal__control-line")

const max_slide = contents.length - 4

let count_el = 0;


for (let index = 0; index < contents.length; index++) {
    wrapper.innerHTML += `
    <div class=\"swiper__slide\">
        <img src=\"${contents[index]["image-url"]}\" data-count=\"${index}\"/>
    </div>`
    line_dots.innerHTML += `<span class=\"dot\" data-count=\"${index}\"></span>`
}


document.querySelector(".swiper__control-button--left").addEventListener("click", () => {
    count_el = count_el - 1 < 0 ? max_slide : count_el - 1
    root.style.setProperty("--elView", count_el)
})


document.querySelector(".swiper__control-button--right").addEventListener("click", () => {
    count_el = count_el + 1 > max_slide ? 0 : count_el + 1
    root.style.setProperty("--elView", count_el)
})


wrapper.addEventListener("click", e => {
    if (e.target.localName == "img") {
        modal.style.display = "flex"

        let count = Number(e.target.dataset.count)
        changeContentInModal(count + 1, contents[count]["video-code"])
    };
})


let player
document.querySelector(".modal__control-close").addEventListener("click", () => {
    modal.style.display = "none"
    player.pause()    
})


line_dots.addEventListener("click", e => {
    if (e.target.className == "dot") {
        let count = Number(e.target.dataset.count)
        changeContentInModal(count + 1, contents[count]["video-code"])
    }
})


let current_dot = document.querySelector(`.dot:nth-child(1)`);
function changeContentInModal(futureDot, link) {
    playerEl.innerHTML = ""
    playerEl.src = link 
    player = new Vimeo.Player(playerEl)

    current_dot.style.backgroundColor = "rgba(173, 173, 173, 0.6)"
    current_dot = document.querySelector(`.dot:nth-child(${futureDot})`);
    current_dot.style.backgroundColor = "white";
}
