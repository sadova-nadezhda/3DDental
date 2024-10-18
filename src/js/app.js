import { initializeSwipers } from './swiperSettings.js';

window.addEventListener("load", () => {
  const header = document.querySelector("header");
  const sectionTop = document.querySelector('.section-top');
  const link = document.querySelector(".header__burger");
  const menu = document.querySelector(".header__nav");
  const servicesCards = document.querySelectorAll('.services__card');

  const addPadTop = () => {
    if (sectionTop && header) {
      sectionTop.style.marginTop = `${header.offsetHeight}px`;
    }
  };

  const handleScroll = () => {
    window.scrollY > 50 ? header.classList.add("scroll") : header.classList.remove("scroll");
  };

  const toggleMenu = () => {
    link.classList.toggle("active");
    menu.classList.toggle("open");
  };

  const closeMenuOnScroll = () => {
    if (menu.classList.contains("open")) {
      link.classList.remove("active");
      menu.classList.remove("open");
    }
  };

  const closeMenuOnClickOutside = (e) => {
    const target = e.target;
    if (
      !target.closest(".header__nav") &&
      !target.closest(".header__burger") &&
      !target.closest(".header__cites") &&
      !target.closest(".header__lang")
    ) {
      link.classList.remove("active");
      menu.classList.remove("open");
    }
  };

  const setCardEvents = () => {
    servicesCards.forEach(card => {
      const desc = card.querySelector('.services__card-desc');
      const fullHeight = desc.scrollHeight;

      const showDescription = () => {
        desc.style.height = `${fullHeight}px`;
        desc.style.opacity = '1';
        desc.style.marginTop = '25px';
      };

      const hideDescription = () => {
        desc.style.height = '0';
        desc.style.opacity = '0';
        desc.style.marginTop = '0';
      };

      card.addEventListener('mouseenter', showDescription);
      card.addEventListener('mouseleave', hideDescription);
    });
  };

  handleScroll();
  addPadTop();
  initializeSwipers();

  if (menu && link) {
    link.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeMenuOnScroll);
    document.addEventListener("click", closeMenuOnClickOutside);
  }

  if (window.innerWidth > 1024) {
    setCardEvents();
  }
  

  const accordionButtons = document.querySelectorAll('.accordion-button');
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  if (accordionItems && window.innerWidth > 767) {
    // Аккордеоны по клику
    accordionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const parent = this.parentElement;
        
        accordionItems.forEach(item => {
          const itemContent = item.querySelector('.accordion-content');
          item.classList.remove('active');
          itemContent.style.maxHeight = 0;
        });
    
        if (!parent.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
          parent.classList.add('active');
        }
      });
    });
  }

  // AOS animate
  AOS.init({
    duration: 1200,
  });

  const activateOnScroll = (element, offset = 107) => {
    if (element) {
      const elementOffsetTop = element.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > elementOffsetTop - offset) {
        element.classList.add('active');
      }
    }
  };
  
  window.addEventListener("resize", () => {
    handleScroll();
    addPadTop();
    if (window.innerWidth > 1024) setCardEvents();
  });

  window.addEventListener("scroll", ()=> {
    handleScroll();
    activateOnScroll(document.querySelector('.webinar'));
    activateOnScroll(document.querySelector('.knowledge'));

    // Открытие первого аккордеона
    const firstAccordionItem = document.querySelector('.accordion-item');
    if (firstAccordionItem && window.innerWidth > 767) {
      let firstAccordionOffset = firstAccordionItem.getBoundingClientRect().top + window.scrollY;

      if (window.scrollY > firstAccordionOffset - window.innerHeight / 2) {
        // Открыть первый аккордеон, когда он становится видимым
        const firstContent = firstAccordionItem.querySelector('.accordion-content');
        if (!firstAccordionItem.classList.contains('active')) {
          firstAccordionItem.classList.add('active');
          firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        }
      }
    }
  });
});
