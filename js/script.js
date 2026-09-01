(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Gallery lightbox
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxClose = document.getElementById("lightboxClose");
  var galleryItems = document.querySelectorAll(".gallery-item");

  function openLightbox(imgSrc, altText, caption) {
    lightboxImg.src = imgSrc;
    lightboxImg.alt = altText;
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var img = item.querySelector("img");
      if (!img) return;
      openLightbox(img.src, img.alt, item.getAttribute("data-caption"));
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
  });

  // Auto-sliding photos on each service card
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".service-photo").forEach(function (photo, cardIndex) {
    var imgs = Array.prototype.slice.call(photo.querySelectorAll("img"));
    if (imgs.length <= 1) return;

    imgs[0].classList.add("is-active");

    var dots = document.createElement("div");
    dots.className = "service-dots";
    imgs.forEach(function (_, i) {
      var dot = document.createElement("span");
      if (i === 0) dot.classList.add("is-active");
      dots.appendChild(dot);
    });
    photo.appendChild(dots);

    if (reduceMotion) return;

    var index = 0;
    function advance() {
      imgs[index].classList.remove("is-active");
      dots.children[index].classList.remove("is-active");
      index = (index + 1) % imgs.length;
      imgs[index].classList.add("is-active");
      dots.children[index].classList.add("is-active");
    }

    setTimeout(function () {
      setInterval(advance, 4000);
    }, cardIndex * 450);
  });
})();
