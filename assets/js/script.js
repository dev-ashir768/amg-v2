/* AMG Transport Solutions - Main JavaScript */
/* Freight Forwarding & Shipping Company */

$(document).ready(function () {
  // ==================== INITIALIZE AOS ANIMATIONS ====================
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: "ease-in-out",
  });

  // ==================== NAVBAR SCROLL EFFECT ====================
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });

  // ==================== MOBILE MENU TOGGLE ====================
  $(".mobile-menu-btn").click(function () {
    $(".mobile-menu").toggleClass("active");
    $(this).find("i").toggleClass("fa-bars fa-times");
  });

  // Close mobile menu when clicking on a link
  $(".mobile-nav-link").click(function () {
    $(".mobile-menu").removeClass("active");
    $(".mobile-menu-btn i").removeClass("fa-times").addClass("fa-bars");
  });

  // ==================== SMOOTH SCROLLING ====================
  $('a[href^="#"]').on("click", function (e) {
    let href = $(this).attr("href");

    if (href.startsWith("#") && href !== "#") {
      e.preventDefault();
      let target = $(href);

      if (target.length) {
        // Close mobile menu if open
        $(".mobile-menu").removeClass("active");
        $(".mobile-menu-btn i").removeClass("fa-times").addClass("fa-bars");

        // Smooth scroll to target
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 80,
          },
          800,
          "swing"
        );
      }
    }
  });

  // ==================== COUNTER ANIMATION ====================
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

  // Trigger counter animation when stats section is visible
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

  // ==================== FAQ ACCORDION ====================
  $(".faq-question").click(function () {
    let $this = $(this);
    let $answer = $this.next(".faq-answer");

    // Toggle current FAQ
    $this.toggleClass("active");
    $answer.toggleClass("active");

    // Optional: Close other FAQs when opening one (uncomment if you want this behavior)
    // $('.faq-question').not($this).removeClass('active');
    // $('.faq-answer').not($answer).removeClass('active');
  });

  // ==================== SCROLL TO TOP BUTTON ====================
  // Create scroll to top button
  $("body").append(
    '<button id="scrollTopBtn" style="display:none;" title="Back to top"><i class="fas fa-arrow-up"></i></button>'
  );

  // Style the button
  $("<style>")
    .text(
      "#scrollTopBtn { position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; background: var(--primary); color: white; border: none; border-radius: 50%; cursor: pointer; z-index: 999; box-shadow: 0 4px 15px rgba(196, 30, 58, 0.3); transition: all 0.3s ease; font-size: 1.2rem; } #scrollTopBtn:hover { background: var(--primary-dark); transform: translateY(-3px); box-shadow: 0 8px 25px rgba(196, 30, 58, 0.4); }"
    )
    .appendTo("head");

  // Show/hide scroll to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $("#scrollTopBtn").fadeIn();
    } else {
      $("#scrollTopBtn").fadeOut();
    }
  });

  // Scroll to top when button clicked
  $("#scrollTopBtn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });

  // ==================== CARD HOVER EFFECTS ====================
  $(".service-card, .feature-card").hover(
    function () {
      $(this).addClass("hovered");
    },
    function () {
      $(this).removeClass("hovered");
    }
  );

  // ==================== PREVENT DEFAULT ON EMPTY LINKS ====================
  $('a[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // ==================== TOAST NOTIFICATIONS ====================
  function showToast(title, message, type = "success") {
    // Create container if it doesn't exist
    if (!$(".toast-container").length) {
      $("body").append('<div class="toast-container"></div>');
    }

    const icons = {
      success: '<i class="fas fa-check"></i>',
      error: '<i class="fas fa-exclamation"></i>',
      info: '<i class="fas fa-info"></i>',
    };

    const toastId = "toast-" + Date.now();
    const toastHtml = `
            <div id="${toastId}" class="toast toast-${type}">
                <div class="toast-icon">${icons[type]}</div>
                <div class="toast-content">
                    <span class="toast-title">${title}</span>
                    <span class="toast-message">${message}</span>
                </div>
                <button class="toast-close"><i class="fas fa-times"></i></button>
            </div>
        `;

    const $toast = $(toastHtml);
    $(".toast-container").append($toast);

    // Auto remove
    const removeTimer = setTimeout(() => {
      hideToast($toast);
    }, 4000);

    // Close on click
    $toast.find(".toast-close").click(function () {
      clearTimeout(removeTimer);
      hideToast($toast);
    });

    function hideToast($el) {
      $el.addClass("hiding");
      setTimeout(() => {
        $el.remove();
        if (!$(".toast").length) {
          $(".toast-container").remove();
        }
      }, 400);
    }
  }

  // ==================== FORM VALIDATION (PARSLEY) ====================
  if ($("#contactForm").length) {
    const $form = $("#contactForm");

    // Initialize Parsley
    const parsleyInstance = $form.parsley({
      errorClass: "parsley-error",
      successClass: "parsley-success",
      errorsWrapper: '<ul class="parsley-errors-list"></ul>',
      errorTemplate: "<li></li>",
      trigger: "change focusout",
    });

    // Handle form submission
    $form.on("submit", function (e) {
      e.preventDefault();

      if (parsleyInstance.isValid()) {
        const $submitBtn = $form.find('button[type="submit"]');
        const originalBtnText = $submitBtn.html();

        // Simulate API call
        $submitBtn
          .prop("disabled", true)
          .html('<i class="fas fa-spinner fa-spin"></i> Sending...');

        setTimeout(() => {
          showToast(
            "Message Sent!",
            "Thank you for contacting us. We will get back to you soon.",
            "success"
          );
          $form[0].reset();
          parsleyInstance.reset();
          $submitBtn.prop("disabled", false).html(originalBtnText);
        }, 1500);
      } else {
        showToast(
          "Form Error",
          "Please check the fields marked in red.",
          "error"
        );
      }
    });
  }

  // ==================== LAZY LOAD IMAGES ====================
  $("img[data-src]").each(function () {
    let $img = $(this);
    let src = $img.data("src");

    if ("IntersectionObserver" in window) {
      let observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            $img.attr("src", src);
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(this);
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      $img.attr("src", src);
    }
  });

  // ==================== WINDOW LOAD EVENT ====================
  $(window).on("load", function () {
    // Hide any loading indicators
    $(".loading, .preloader").fadeOut();

    // Add loaded class to body
    $("body").addClass("page-loaded");
  });

  // ==================== CONSOLE MESSAGE ====================
  console.log(
    "%c AMG Transport Solutions ",
    "background: linear-gradient(135deg, #C41E3A, #E8334A); color: white; font-size: 18px; font-weight: bold; padding: 10px 20px; border-radius: 5px;"
  );
  console.log(
    "%c Global Freight Forwarding & Shipping Services ",
    "color: #6B7280; font-size: 12px;"
  );

  // ==================== PERFORMANCE OPTIMIZATION ====================
  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function for resize events
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Use optimized scroll handler
  $(window).on(
    "scroll",
    debounce(function () {
      // Any heavy scroll operations here
    }, 100)
  );

  // Use throttled resize handler
  $(window).on(
    "resize",
    throttle(function () {
      // Any resize operations here
    }, 250)
  );

  // ==================== ACCESSIBILITY IMPROVEMENTS ====================
  // Add keyboard navigation support
  $(".nav-link, .mobile-nav-link, .btn-primary, .btn-secondary").on(
    "keypress",
    function (e) {
      if (e.which === 13 || e.which === 32) {
        // Enter or Space
        e.preventDefault();
        $(this).click();
      }
    }
  );

  // Focus management for mobile menu
  $(".mobile-menu-btn").on("click", function () {
    if ($(".mobile-menu").hasClass("active")) {
      $(".mobile-menu .mobile-nav-link").first().focus();
    }
  });
});

// ==================== UTILITY FUNCTIONS ====================
// Check if element is in viewport
function isInViewport(element) {
  let rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get scroll position
function getScrollPosition() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

// Smooth scroll to element
function smoothScrollTo(element, offset = 80) {
  if (element) {
    $("html, body").animate(
      {
        scrollTop: $(element).offset().top - offset,
      },
      800
    );
  }
}
