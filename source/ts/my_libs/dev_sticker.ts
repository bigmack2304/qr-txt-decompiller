import "../../styles/less/components/dev_mode_sticker.less";

document.addEventListener("DOMContentLoaded", onLoad);
const body = document.querySelector("body")!;

function onLoad(e: Event) {
    let element = document.createElement("div");
    element.classList.add("development_mode_sticker");
    element.innerText = "DEV version";
    body.prepend(element);
}

export {};
