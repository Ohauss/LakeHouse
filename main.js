// FULL HEADER CODE – replace your entire JavaScript with this:
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Initializing full header functionality...");

  // ==================== ELEMENTS ====================
  const header = document.querySelector(".page-header");
  const btnMenu = document.getElementById("btn-menu");
  const mainMenu = document.getElementById("main-menu");

  // Check mobile menu elements
  if (!header || !btnMenu || !mainMenu) {
    console.error("❌ Not all menu elements were found:", {
      header: !!header,
      btnMenu: !!btnMenu,
      mainMenu: !!mainMenu,
    });
    // Continue execution for other features
  } else {
    console.log("✅ Mobile menu elements found");
    initMobileMenu();
  }

  // ==================== MOBILE MENU ====================
  function initMobileMenu() {
    const menuLinks = mainMenu.querySelectorAll("a");

    function closeMenu() {
      header.classList.remove("active");
      btnMenu.classList.remove("active");
      mainMenu.classList.remove("active");
      console.log("📱 Menu is closed");
    }

    function toggleMenu() {
      const isActive = header.classList.contains("active");
      header.classList.toggle("active");
      btnMenu.classList.toggle("active");
      mainMenu.classList.toggle("active");
      console.log(isActive ? "📱 Menu is closed" : "📱 Menu is open");
    }

    // Click on menu button
    btnMenu.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking outside the menu
    document.addEventListener("click", function (e) {
      if (!header.contains(e.target)) {
        if (header.classList.contains("active")) {
          closeMenu();
        }
      }
    });

    // Close when clicking on a menu item
    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setTimeout(closeMenu, 150);
      });
    });

    // Prevent closing when clicking inside the menu
    mainMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    // Close on window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && header.classList.contains("active")) {
        closeMenu();
      }
    });

    console.log("✅ Mobile menu initialized");

    // Return close function for scroll handler
    return closeMenu;
  }

  // ==================== SCROLL HANDLER ====================
  let scrollTimer = null;
  let mobileMenuCloseFunction = null;

  // Get close function
  if (header && btnMenu && mainMenu) {
    const menuLinks = mainMenu.querySelectorAll("a");

    mobileMenuCloseFunction = function () {
      if (header.classList.contains("active")) {
        header.classList.remove("active");
        btnMenu.classList.remove("active");
        mainMenu.classList.remove("active");
      }
    };
  }

  // Unified scroll handler
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    // Header background change (always active)
    if (header) {
      if (scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // Close mobile menu on scroll (if menu exists)
    if (mobileMenuCloseFunction) {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(mobileMenuCloseFunction, 100);
    }
  });

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "#!") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        console.log("🔗 Smooth scroll to:", targetId);
      }
    });
  });

  // ==================== BOOK NOW BUTTONS ====================
  document
    .querySelectorAll(
      '.btn.call-to-action, .btn[href*="book"], .btn[class*="book"]'
    )
    .forEach(function (button) {
      button.addEventListener("click", function (e) {
        if (!this.href || this.href.includes("#")) {
          e.preventDefault();
          alert(
            "Booking system would open here! For now, please call +47 (0) 702 88 12 34 to make a reservation."
          );
          console.log("📞 Book now clicked");
        }
      });
    });

  // ==================== EMAIL SUBSCRIPTION ====================
  const footerForm = document.querySelector("footer form");
  if (footerForm) {
    footerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector(
        'input[type="text"], input[type="email"]'
      );
      const email = emailInput?.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (isValid) {
        alert(
          `Thank you for subscribing! You will receive updates about Lake House at ${email}`
        );
        this.reset();
        console.log("📧 Email subscription:", email);
      } else {
        alert("Please enter a valid email address.");
      }
    });
    console.log("✅ Email subscription initialized");
  }

  // ==================== IMAGE LOADING ANIMATION ====================
  document.querySelectorAll("img").forEach(function (img) {
    const fadeIn = function () {
      img.style.opacity = "0";
      img.style.transition = "opacity 0.5s ease";
      setTimeout(function () {
        img.style.opacity = "1";
      }, 100);
    };

    if (img.complete && img.naturalWidth > 0) {
      fadeIn();
    } else {
      img.addEventListener("load", fadeIn);
      img.addEventListener("error", function () {
        console.warn("❌ Image loading error:", img.src);
      });
    }
  });

  // ==================== SWIPER INITIALIZATION ====================
  if (typeof Swiper !== "undefined") {
    const swiperContainer = document.querySelector(".swiper");
    if (swiperContainer) {
      const swiper = new Swiper(".swiper", {
        direction: "horizontal",
        loop: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      });
      console.log("✅ Swiper initialized");
    }
  }

  // ==================== ACTIVE MENU ITEM ====================
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const menuItems = document.querySelectorAll(".main-nav a");

  menuItems.forEach(function (link) {
    link.classList.remove("active");
    const linkPage = link.getAttribute("href");

    if (
      (currentPage === "index.html" || currentPage === "") &&
      (linkPage === "#" || linkPage === "index.html" || linkPage === "./")
    ) {
      link.classList.add("active");
    } else if (linkPage && linkPage === currentPage) {
      link.classList.add("active");
    } else if (
      currentPage.includes("history") &&
      link.textContent.toLowerCase().includes("history")
    ) {
      link.classList.add("active");
    } else if (
      currentPage.includes("contact") &&
      link.textContent.toLowerCase().includes("contact")
    ) {
      link.classList.add("active");
    }
  });

  console.log("🎉 Header functionality successfully initialized!");
  console.log("📄 Current page:", currentPage);
});

// ==================== GLOBAL FUNCTIONS ====================
// Additional manual control functions
window.toggleMobileMenu = function () {
  const btnMenu = document.getElementById("btn-menu");
  if (btnMenu) {
    btnMenu.click();
  }
};

window.closeMobileMenu = function () {
  const header = document.querySelector(".page-header");
  const btnMenu = document.getElementById("btn-menu");
  const mainMenu = document.getElementById("main-menu");

  if (header && btnMenu && mainMenu) {
    header.classList.remove("active");
    btnMenu.classList.remove("active");
    mainMenu.classList.remove("active");
  }
};
