const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const header = document.getElementById("header");

hamburger.onclick = () => {
    hamburger.classList.toggle("active");
    navbar.classList.toggle("active");
    document.body.style.overflow = navbar.classList.contains("active") ? "hidden" : "";
};

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
});

document.querySelectorAll(".nav-links a, .menu-btn, .logo, .mobile-logo").forEach(link => {
    link.onclick = () => {
        hamburger.classList.remove("active");
        navbar.classList.remove("active");
        document.body.style.overflow = "";
    };
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navbar.classList.contains("active")) {
        hamburger.classList.remove("active");
        navbar.classList.remove("active");
        document.body.style.overflow = "";
    }
});