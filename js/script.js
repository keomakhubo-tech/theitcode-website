const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const header = document.getElementById("header");
const navLinks = document.querySelectorAll(".nav-links a");

// Mobile menu toggle
hamburger.onclick = () => {
    hamburger.classList.toggle("active");
    navbar.classList.toggle("active");
    document.body.style.overflow = navbar.classList.contains("active") ? "hidden" : "";
};

// Header background on scroll
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
    setActiveLink();
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a, .menu-btn, .logo, .mobile-logo").forEach(link => {
    link.onclick = () => {
        hamburger.classList.remove("active");
        navbar.classList.remove("active");
        document.body.style.overflow = "";
    };
});

// Close on Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navbar.classList.contains("active")) {
        hamburger.classList.remove("active");
        navbar.classList.remove("active");
        document.body.style.overflow = "";
    }
});

// Highlight active nav link based on scroll position
function setActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.scrollY + 120; // offset for fixed header

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    // Map sections that aren't in the nav to the closest nav item
    const map = {
        problem: "company",
        founder: "company",
        impact: "solutions"
    };
    if (map[current]) current = map[current];

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}

setActiveLink();
