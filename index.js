let header;

document.addEventListener("DOMContentLoaded", () => {
    header = document.getElementById("header");
})

window.addEventListener("load", () => {
    const headerText = "WORK IN PROGRESS";
    for (let i = 0; i < headerText.length; i++) {
        setTimeout(function() {
            s = headerText.substring(0, i + 1);
            header.innerHTML = s;
        }, i * 70);
    }
});