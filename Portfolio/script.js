/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 700);

});


/* =====================================================
   TYPING ANIMATION
===================================================== */

const typingElement = document.getElementById("typing");

const roles = [

    "Full Stack Developer",
    ".NET Developer",
    "Java Developer",
    "Angular Developer",
    "Software Engineer",
    "AI Enthusiast"

];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);

            return;

        }

    } else {

        typingElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 90);

}

typeEffect();


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters = document.querySelectorAll("[data-count]");

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const counter = entry.target;

                const target =
                    Number(counter.dataset.count);

                let current = 0;

                const increment =
                    Math.max(1, Math.ceil(target / 50));

                const update = () => {

                    current += increment;

                    if (current >= target) {

                        counter.textContent =
                            target + "+";

                        return;

                    }

                    counter.textContent = current;

                    requestAnimationFrame(update);

                };

                update();

                observer.unobserve(counter);

            }

        });

    },

    {
        threshold: 0.7
    }

);

counters.forEach(counter => {

    observer.observe(counter);

});


/* =====================================================
   MOUSE CURSOR
===================================================== */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", e => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";

});


/* =====================================================
   PROFILE TILT
===================================================== */

const profile = document.querySelector(".profile-container");

document.addEventListener("mousemove", e => {

    if (window.innerWidth < 900) return;

    const x =
        (window.innerWidth / 2 - e.clientX) / 60;

    const y =
        (window.innerHeight / 2 - e.clientY) / 60;

    profile.style.transform =
        `rotateY(${x}deg) rotateX(${y}deg)`;

});


/* =====================================================
   BACK TO TOP
===================================================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});


topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(
    ".section-title, .skill-card, .project-card, .timeline-item, .about-card, .about-content, .contact-container"
);

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(40px)";

    element.style.transition =
        "opacity .8s ease, transform .8s ease";

    revealObserver.observe(element);

});


/* =====================================================
   CONTACT FORM - EMAILJS
===================================================== */

// EmailJS Initialize
emailjs.init({
    publicKey: "RjUa9rz2TDMWX8-Yi"
});

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    // Validation
    if (!name || !email || !subject || !message) {

        formMessage.textContent =
            "Please fill all fields.";

        formMessage.style.color =
            "#ef4444";

        return;
    }


    // Sending animation
    const submitButton =
        contactForm.querySelector("button[type='submit']");

    const originalText =
        submitButton.innerHTML;

    submitButton.innerHTML =
        "Sending...";

    submitButton.disabled = true;


    // Send Email
    emailjs.sendForm(
        "service_nwc9bwz",
        "template_63gkffy",
        contactForm
    )

    .then(function () {

        formMessage.textContent =
            "Message sent successfully! 🚀";

        formMessage.style.color =
            "#22c55e";

        contactForm.reset();

        submitButton.innerHTML =
            "Message Sent ✓";


        // Reset button after 3 seconds
        setTimeout(() => {

            submitButton.innerHTML =
                originalText;

            submitButton.disabled =
                false;

        }, 3000);

    })

    .catch(function (error) {

        console.error(
            "EmailJS Error:",
            error
        );

        formMessage.textContent =
            "Failed to send message. Please try again.";

        formMessage.style.color =
            "#ef4444";

        submitButton.innerHTML =
            originalText;

        submitButton.disabled =
            false;

    });

});

/* =====================================================
   MAGNETIC BUTTON EFFECT
===================================================== */

const buttons =
    document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("mousemove", e => {

        const rect =
            button.getBoundingClientRect();

        const x =
            e.clientX - rect.left - rect.width / 2;

        const y =
            e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform =
            "translate(0,0)";

    });

});


/* =====================================================
   SMOOTH IMAGE PARALLAX
===================================================== */

window.addEventListener("scroll", () => {

    const visual =
        document.querySelector(".hero-visual");

    if (!visual) return;

    if (window.scrollY < window.innerHeight) {

        visual.style.transform =
            `translateY(${window.scrollY * 0.08}px)`;

    }

});