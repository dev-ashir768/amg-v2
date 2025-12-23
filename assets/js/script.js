// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Navbar scroll effect
$(window).scroll(function () {
  if ($(this).scrollTop() > 50) {
    $(".navbar").addClass("scrolled");
  } else {
    $(".navbar").removeClass("scrolled");
  }
});

// Mobile menu toggle
$(".mobile-menu-btn").click(function () {
  $(".nav-menu").toggleClass("active");
  $(this).find("i").toggleClass("fa-bars fa-times");
});

// Smooth scrolling
$('a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  var target = $(this.getAttribute("href"));
  if (target.length) {
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: target.offset().top - 80,
        },
        1000
      );

    // Update active nav link
    $(".nav-link").removeClass("active");
    $(this).addClass("active");

    // Close mobile menu
    $(".nav-menu").removeClass("active");
    $(".mobile-menu-btn i").removeClass("fa-times").addClass("fa-bars");
  }
});

// Update active nav on scroll
$(window).scroll(function () {
  var scrollPos = $(document).scrollTop() + 100;

  $("section").each(function () {
    var currLink = $(this);
    var refElement = currLink;

    if (
      refElement.position().top <= scrollPos &&
      refElement.position().top + refElement.height() > scrollPos
    ) {
      $(".nav-link").removeClass("active");
      $('.nav-link[href="#' + currLink.attr("id") + '"]').addClass("active");
    }
  });
});

// Counter animation
function animateCounter(element) {
  var target = parseInt($(element).data("target"));
  var current = 0;
  var increment = target / 100;
  var timer = setInterval(function () {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    $(element).text(Math.floor(current));
  }, 20);
}

// Trigger counter when in view
var counterTriggered = false;
$(window).scroll(function () {
  if (!counterTriggered) {
    var statsSection = $(".stats-section");
    if (statsSection.length) {
      var statsTop = statsSection.offset().top;
      var statsBottom = statsTop + statsSection.outerHeight();
      var scrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();

      if (scrollTop + windowHeight > statsTop && scrollTop < statsBottom) {
        counterTriggered = true;
        $(".counter").each(function () {
          animateCounter(this);
        });
      }
    }
  }
});

// FAQ accordion
$(".faq-question").click(function () {
  var $this = $(this);
  var $answer = $this.next(".faq-answer");

  // Close other FAQs
  $(".faq-question").not($this).removeClass("active");
  $(".faq-answer").not($answer).removeClass("active");

  // Toggle current FAQ
  $this.toggleClass("active");
  $answer.toggleClass("active");
});

// Contact form submission
$("#contactForm").submit(function (e) {
  e.preventDefault();

  var $btn = $(this).find('button[type="submit"]');
  var originalText = $btn.find(".btn-text").text();

  // Show loading state
  $btn.prop("disabled", true);
  $btn
    .find(".btn-text")
    .html('<span class="loading-spinner"></span> Sending...');

  // Simulate form submission
  setTimeout(function () {
    $btn.find(".btn-text").text("Message Sent!");

    // Reset form
    $("#contactForm")[0].reset();

    // Reset button after 3 seconds
    setTimeout(function () {
      $btn.prop("disabled", false);
      $btn.find(".btn-text").text(originalText);
    }, 3000);
  }, 2000);
});

// Parallax effect
$(window).scroll(function () {
  var scrolled = $(window).scrollTop();
  $(".parallax-section").css("background-position-y", scrolled * 0.5 + "px");
});

// Prevent default on empty links
$('a[href="#"]').click(function (e) {
  e.preventDefault();
});
