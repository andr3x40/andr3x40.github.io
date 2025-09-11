const templates = {
  navbar: `
    <div id="navbar">
      <div><b>andr3x40's Lab</b></div>
      <div><a href="index.html">Home</a></div>
      <div><a href="projects.html">Projects</a></div>
      <div><a href="about.html">About</a></div>
    </div>
  `,
  footer: `
    <div id="footer" class="align-center">
      <div>andr3x40 (C) 2025 - All rights reserved.</div>
      <div>Powered by GitHub Pages and the lack of a framework</div>
    </div>
  `
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[template]").forEach(async el => {
        const name = el.getAttribute("template");
        if (templates[name]) {
            el.innerHTML = templates[name];
        } else {
            console.log(`Couldn't load template ${name}`);
        }
    });
});