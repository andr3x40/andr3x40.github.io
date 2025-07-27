let div;

document.addEventListener("DOMContentLoaded", () => {
    div = document.getElementById("a-div");
})

window.addEventListener("load", () => {
    console.log("This function is executed once the page is fully loaded");
    div.innerHTML = "Test";
});