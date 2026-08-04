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

// SMOOTH FADE-IN ON SCROLL
const fadeElements = document.querySelectorAll (
    ".section-label, .section-title, .section-lead, .two-col > div, .card, .future-products, .contact-info, .contact-form, .hero-content"
);

fadeElements.forEach(el => el.classList.add("fade-in"));

const observer = new IntersectionObserver (
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                //Optional: stop observing aafter it has appeared
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    }
);


fadeElements.forEach(el => observer.observe(el));

// FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase Config (copied from Firebase Console)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle Contact Form Submission
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formResponse = document.getElementById("formResponse");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // UI Loading State
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        formResponse.className = "form-response";
        formResponse.style.display = "none";

        // Collect Form Data
        const formData = {
            fullName: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value || "N/A",
            reason: document.getElementById("reason").value,
            message: document.getElementById("message").value,
            timestamp: serverTimestamp()
        };

        try {
            // Save to Firestore Collection named 'contact_messages'
            await addDoc(collection(db, "contact_messages"), formData);

            // Success feedback
            formResponse.textContent = "Thank you! Your message has been sent successfully.";
            formResponse.classList.add("success");
            contactForm.reset();
        } catch (error) {
            console.error("Error submitting form: ", error);
            formResponse.textContent = "Oops! Something went wrong. Please try again or email us directly.";
            formResponse.classList.add("error");
        } finally {
            // Reset Button State
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
        }
    });
}