// app.js

document.addEventListener("DOMContentLoaded", () => {
  // --- Percentage Counter Logic ---
  const percentageSection = document.getElementById("percentage-section");
  const percentageElements = [
    { element: document.getElementById("percent-84") },
    { element: document.getElementById("percent-78") },
    { element: document.getElementById("percent-89") },
    { element: document.getElementById("percent-90") },
  ];

  const animateNumber = (element, start, end, duration, suffix = "") => {
    let startTime = null;
    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          percentageElements.forEach((item) => {
            const target = parseInt(item.element.dataset.target);
            if (!isNaN(target)) {
              item.element.textContent = "0%"; // Reset to 0% before animating
              animateNumber(item.element, 0, target, 1500, "%");
            }
          });
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold: 0.5 }
  ); // Trigger when 50% of the section is visible

  if (percentageSection) {
    observer.observe(percentageSection);
  }

  // --- Search Box Expansion Logic ---
  const searchIconContainer = document.getElementById("searchIconContainer");
  const searchBox = document.getElementById("searchBox");

  if (searchIconContainer && searchBox) {
    searchIconContainer.addEventListener("click", () => {
      searchBox.classList.toggle("active");
      if (searchBox.classList.contains("active")) {
        searchBox.focus();
      } else {
        searchBox.value = ""; // Clear text when hiding
      }
    });

    // Close search box and mobile nav if clicked outside
    document.addEventListener("click", (event) => {
      const isClickInsideSearch =
        searchIconContainer.contains(event.target) ||
        searchBox.contains(event.target);
      const isClickInsideHamburger =
        hamburgerIcon && hamburgerIcon.contains(event.target);
      const isClickInsideMobileNav =
        mobileNavLinks && mobileNavLinks.contains(event.target);

      if (!isClickInsideSearch && searchBox.classList.contains("active")) {
        searchBox.classList.remove("active");
        searchBox.value = "";
      }

      // Also close mobile menu if clicking outside it
      if (
        !isClickInsideHamburger &&
        !isClickInsideMobileNav &&
        mobileNavLinks &&
        mobileNavLinks.classList.contains("active")
      ) {
        mobileNavLinks.classList.remove("active");
        if (hamburgerIcon) {
          hamburgerIcon.classList.remove("active"); // Remove active state from hamburger icon
        }
      }
    });
  }

  // --- Hamburger Menu Logic ---
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const mobileNavLinks = document.getElementById("mobileNavLinks");

  if (hamburgerIcon && mobileNavLinks) {
    hamburgerIcon.addEventListener("click", () => {
      mobileNavLinks.classList.toggle("active");
      hamburgerIcon.classList.toggle("active"); // Add/remove active class for icon animation
    });

    // Close menu if a link inside it is clicked (optional)
    mobileNavLinks
      .querySelectorAll(".link, .nav-link-dropdown .link")
      .forEach((link) => {
        link.addEventListener("click", () => {
          if (mobileNavLinks.classList.contains("active")) {
            mobileNavLinks.classList.remove("active");
            hamburgerIcon.classList.remove("active");
          }
        });
      });
  }

  function setupImageChanger() {
    const imageDisplay = document.getElementById("imageDisplay");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    // Select all dots using the common class
    const sliderDots = document.querySelectorAll(".slider-dot-item"); // <--- ADD THIS

    const imageList = [
      "images/group-10000042770.svg",
      "images/pexels-pixabay-264950-10.png",
      "images/pexels-rethaferguson-3059609-20.png",
      "images/pexels-valeriya-1961782-10.png",
    ];

    let currentImageIndex = 0;

    function updateImage() {
      console.log("updateImage() called. Current index:", currentImageIndex);
      imageDisplay.src = imageList[currentImageIndex];
      imageDisplay.alt = `Image ${currentImageIndex + 1}`;

      prevButton.disabled = currentImageIndex === 0;
      nextButton.disabled = currentImageIndex === imageList.length - 1;
      console.log("Previous button disabled:", prevButton.disabled);
      console.log("Next button disabled:", nextButton.disabled);

      // --- Dot Update Logic --- <--- ADD THIS BLOCK
      sliderDots.forEach((dot, index) => {
        if (index === currentImageIndex) {
          dot.classList.add("active"); // Add active class to the current dot
        } else {
          dot.classList.remove("active"); // Remove active class from others
        }
      });
      // --- End Dot Update Logic ---
    }

    prevButton.addEventListener("click", () => {
      console.log("Previous button clicked!");
      if (currentImageIndex > 0) {
        currentImageIndex--;
        updateImage();
      } else {
        console.log("Already at the first image, cannot go back.");
      }
    });

    nextButton.addEventListener("click", () => {
      console.log("Next button clicked!");
      if (currentImageIndex < imageList.length - 1) {
        currentImageIndex++;
        updateImage();
      } else {
        console.log("Already at the last image, cannot go forward.");
      }
    });

    // OPTIONAL: Make dots clickable (if you want this functionality)
    sliderDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentImageIndex = index; // Set index to the clicked dot's index
        updateImage(); // Update the image and active dot
        console.log(`Dot ${index + 1} clicked!`);
      });
    });

    console.log("Image changer setup complete. Initializing image.");
    updateImage(); // Initial call to display the first image and set button/dot states
  }

  // Call the setupImageChanger function to initialize the slider
  setupImageChanger();
  const singleRadio = document.getElementById("singleSubscription");
  const doubleRadio = document.getElementById("doubleSubscription");
  const singleBox = document.getElementById("singleSubscriptionBox");
  const doubleBox = document.getElementById("doubleSubscriptionBox");

  if (singleRadio && doubleRadio && singleBox && doubleBox) {
    singleRadio.addEventListener("change", () => {
      if (singleRadio.checked) {
        singleBox.style.display = "block";
        doubleBox.style.display = "none";
      }
    });

    doubleRadio.addEventListener("change", () => {
      if (doubleRadio.checked) {
        singleBox.style.display = "none";
        doubleBox.style.display = "block";
      }
    });
  }
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    // Select the question div, the answer div, and the plus icon within the current item
    const questionDiv = item.querySelector(".question");
    const plusIcon = item.querySelector("img[class^='plus']"); // Selects img with class starting with 'plus'
    const answerDiv = item.querySelector(".accordion-answer");

    // Add click listener to the entire accordion item
    if (questionDiv && plusIcon && answerDiv) {
      // Ensure all elements exist
      item.addEventListener("click", () => {
        // Toggle 'active' class on the current accordion item
        item.classList.toggle("active");

        // Toggle visibility of the answer div
        if (answerDiv.classList.contains("active")) {
          answerDiv.classList.remove("active");
          // The CSS transitions handle the hide animation
        } else {
          // Optional: Close any other open accordion items for a "single-open" accordion
          document
            .querySelectorAll(".accordion-item.active")
            .forEach((openItem) => {
              if (openItem !== item) {
                // Don't close the current item
                openItem.classList.remove("active");
                openItem
                  .querySelector(".accordion-answer")
                  .classList.remove("active");
                // Reset icon for other open items
                openItem.querySelector("img[class^='plus']").style.transform =
                  "rotate(0deg)";
              }
            });

          answerDiv.classList.add("active");
          // The CSS transitions handle the show animation
        }
      });
    }
  });
});
