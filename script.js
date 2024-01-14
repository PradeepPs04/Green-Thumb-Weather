var crsr = document.querySelector("#cursor");
var crsr_blr = document.querySelector("#cursor-blurr");
document.addEventListener("mousemove", function (dets) {
    crsr.style.left = dets.x + "px";
    crsr.style.top = dets.y + "px";
    crsr_blr.style.left = dets.x - 250 + "px";
    crsr_blr.style.top = dets.y - 250 + "px";
});

var cardAll = document.querySelectorAll(".card");
cardAll.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        crsr.style.scale = 3;
        crsr.style.border = "1px solid #fff";
        crsr.style.backgroundColor = "transparent";
        crsr_blr.style.backgroundColor = "purple";
    });
    elem.addEventListener("mouseleave", function () {
        crsr.style.scale = 1;
        crsr.style.border = "0px solid #95C11E";
        crsr.style.backgroundColor = "#95C11E";
        crsr_blr.style.backgroundColor = "rgba(150, 193, 30, 0.3)";
    });
});

var h3All = document.querySelectorAll("#footer h3");
h3All.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        crsr.style.scale = 3;
        crsr.style.border = "1px solid #fff";
        crsr.style.backgroundColor = "transparent";
    });
    elem.addEventListener("mouseleave", function () {
        crsr.style.scale = 1;
        crsr.style.border = "0px solid #95C11E";
        crsr.style.backgroundColor = "#95C11E";
    });
});

gsap.to("#nav", {
    backgroundColor: "#000",
    duration: 0.5,
    height: "110px",
    scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        start: "top -10%",
        end: "top: -11%",
        scrub: 1
    }
});

gsap.to("#main", {
    backgroundColor: "#000",
    scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        start: "top -25%",
        end: "top -70%",
        scrub: 2
    }
});

gsap.from("#about-us img, #about-us-in", {
    y: 90,
    opacity: 0,
    stagger: 0.3,
    duration: 1,
    scrollTrigger: {
        trigger: "#about-us",
        scroller: "body",
        start: "top 70%",
        end: "top 65%",
        scrub: 4
    }
});

gsap.from("#page-3-heading", {
    y: 90,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: "#page-3-heading",
        scroller: "body",
        start: "top 60%",
        end: "top 55%",
        scrub: 1
    }
});

gsap.from(".card", {
    y: 90,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: ".card",
        scroller: "body",
        start: "top 60%",
        end: "top 55%",
        scrub: 0
    }
});



var menu = document.querySelector("#menu-bar h3");
var fullScrMenu = document.querySelector("#full-scr-menu");
var navLinks = document.querySelectorAll("#nav2 a");
var flag = 0;
function populateMenuLinks() {
    fullScrMenu.innerHTML = "";
    navLinks.forEach(function (link) {
        var clonedLink = link.cloneNode(true);
        fullScrMenu.appendChild(clonedLink);
    });
}

menu.addEventListener('click', function () {
    flag = 1 - flag;
    if (flag == 1) {
        fullScrMenu.style.top = 0;
        populateMenuLinks();
    }
    else {
        fullScrMenu.style.top = "-100%";
    }
});

var section = document.querySelectorAll('section');
var navLink = document.querySelectorAll('#nav #nav2 a');
window.onscroll = () => {
    section.forEach(sec => {
        var top = window.scrollY;
        var offset = sec.offsetTop - 150;
        var height = sec.offsetHeight;
        var id = sec.getAttribute('id');
        if (top > offset && top < offset + height) {
            navLink.forEach(links => {
                links.classList.remove('active');
                document.querySelector('#nav #nav2 a[href*=' + id + ']').classList.add('active');
            });
        }
    });
}

var card1 = document.getElementById('card-1');
var card2 = document.getElementById('card-2');
var card3 = document.getElementById('card-3');
card1.addEventListener('click', function () {
    window.open("weather/index.html", "_blank");
});
card2.addEventListener('click', function () {
    window.open("news/index.html", "_blank");
});
card3.addEventListener('click', function () {
    window.open("helper/index.html", "_blank");
});