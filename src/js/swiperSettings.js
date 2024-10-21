export function initializeSwipers() {
  const doctorsSwiper = new Swiper(".doctorsSwiper", {
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".doctorsSwiper .swiper-pagination",
      clickable: true,
    },
  });
  const reviewsSwiper = new Swiper(".reviewsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".reviews-button-next",
      prevEl: ".reviews-button-prev",
    },
    breakpoints: {
      767: {
        slidesPerView: 1.5,
      },
      980: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2.5,
      }
    }
  });
  const knowledgeSwiper = new Swiper(".knowledgeSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".knowledge-button-next",
      prevEl: ".knowledge-button-prev",
    },
    breakpoints: {
      980: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      }
    }
  });
  if (window.innerWidth < 768) {
    const branchesSwiper = new Swiper('.accordion-slider', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.branches-button-next',
        prevEl: '.branches-button-prev',
      },
    });
  }
  const comboSwiper = new Swiper(".comboSwiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    navigation: {
      nextEl: ".combo-button-next",
      prevEl: ".combo-button-prev",
    },
  });
}