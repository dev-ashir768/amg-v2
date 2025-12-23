$(document).ready(function () {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });

  $(".mobile-menu-btn").click(function () {
    $(".mobile-menu").toggleClass("active");
    $(this).find("i").toggleClass("fa-bars fa-times");
  });

  $('.mobile-nav-link, a[href^="#"]').click(function (e) {
    $(".mobile-menu").removeClass("active");
    $(".mobile-menu-btn i").removeClass("fa-times").addClass("fa-bars");

    let href = $(this).attr("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      let target = $(href);
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          800
        );
      }
    }
  });

  let counterAnimated = false;

  function animateCounter(element) {
    let target = parseInt($(element).data("target"));
    let current = 0;
    let increment = target / 50;

    let timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      $(element).text(Math.floor(current));
    }, 30);
  }

  $(window).scroll(function () {
    if (!counterAnimated) {
      let statsSection = $(".stats-section");
      if (statsSection.length) {
        let scrollTop = $(window).scrollTop();
        let statsTop = statsSection.offset().top;
        let windowHeight = $(window).height();

        if (scrollTop + windowHeight > statsTop + 100) {
          counterAnimated = true;
          $(".counter").each(function () {
            animateCounter(this);
          });
        }
      }
    }
  });

  let sections = $("section");
  let navLinks = $(".nav-link");

  $(window).on("scroll", function () {
    let current = "";

    sections.each(function () {
      let sectionTop = $(this).offset().top;
      let sectionHeight = $(this).outerHeight();

      if ($(window).scrollTop() >= sectionTop - 150) {
        current = $(this).attr("id");
      }
    });

    navLinks.each(function () {
      $(this).removeClass("active");
      if ($(this).attr("href") === "#" + current) {
        $(this).addClass("active");
      }
    });
  });
});
