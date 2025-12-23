AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Custom Cursor
let cursor = document.querySelector(".cursor");
let cursorFollower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  }, 100);
});

// Navbar Scroll
$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $(".navbar").addClass("scrolled");
  } else {
    $(".navbar").removeClass("scrolled");
  }
});

// Counter Animation
let counterAnimated = false;
$(window).scroll(function () {
  if (!counterAnimated) {
    let statsSection = $(".stats-section");
    if (statsSection.length) {
      let scrollTop = $(window).scrollTop();
      let statsTop = statsSection.offset().top;

      if (scrollTop + $(window).height() > statsTop + 200) {
        counterAnimated = true;
        $(".counter").each(function () {
          let target = parseInt($(this).data("target"));
          let current = 0;
          let increment = target / 50;
          let element = this;

          let timer = setInterval(function () {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            $(element).text(Math.floor(current));
          }, 40);
        });
      }
    }
  }
});

// Mobile Menu
$(".mobile-menu-btn").click(function () {
  $(".mobile-menu").toggleClass("active");
  $(this).find("i").toggleClass("fa-bars fa-times");
});

$(".mobile-nav-link").click(function () {
  $(".mobile-menu").removeClass("active");
  $(".mobile-menu-btn i").removeClass("fa-times").addClass("fa-bars");
});

// Smooth Scroll
$('a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  let target = $(this.getAttribute("href"));
  if (target.length) {
    $("html, body").animate(
      {
        scrollTop: target.offset().top - 100,
      },
      1000
    );
  }
});
