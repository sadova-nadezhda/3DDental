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
      
      const getFullHeight = () => {
        // Временно делаем элемент видимым для точного вычисления
        const prevHeight = desc.style.height;
        const prevOpacity = desc.style.opacity;
        const prevMarginTop = desc.style.marginTop;
  
        desc.style.height = 'auto';
        desc.style.opacity = '1';
        desc.style.marginTop = '25px';
        const fullHeight = desc.scrollHeight;
  
        // Возвращаем исходные стили
        desc.style.height = prevHeight;
        desc.style.opacity = prevOpacity;
        desc.style.marginTop = prevMarginTop;
  
        return fullHeight;
      };
  
      const showDescription = () => {
        const fullHeight = getFullHeight(); // Вычисляем высоту только при необходимости
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
  
  if (window.innerWidth > 1024) {
    setCardEvents();
  }

  handleScroll();
  addPadTop();
  initializeSwipers();

  if (menu && link) {
    link.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeMenuOnScroll);
    document.addEventListener("click", closeMenuOnClickOutside);
  }

  const accordionButtons = document.querySelectorAll('.branches__accordion .accordion-button');
  const accordionItems = document.querySelectorAll('.branches__accordion .accordion-item');
  
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

  // services__accordion
  document.querySelectorAll(".services__accordion .accordion-header").forEach((button) => {
    button.addEventListener("click", () => {
      const accordionContent = button.nextElementSibling;

      button.classList.toggle("active");

      if (button.classList.contains("active")) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      } else {
        accordionContent.style.maxHeight = 0;
      }

      // Close other open accordion items
      document.querySelectorAll(".accordion-header").forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.classList.remove("active");
          otherButton.nextElementSibling.style.maxHeight = 0;
        }
      });
    });
  });

  // AOS animate
  AOS.init({
    duration: 1200,
  });

  // tabs

  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // remove active class from all tabs and tab content
      tabs.forEach(tab => tab.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // add active class to current tab and its corresponding tab content
      this.classList.add('active');
      document.getElementById(this.dataset.tabContent).classList.add('active');
    });
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

  let prevScrollpos = window.scrollY;

  window.addEventListener("scroll", ()=> {
    handleScroll();
    activateOnScroll(document.querySelector('.webinar'));
    activateOnScroll(document.querySelector('.knowledge'));

    if(window.innerWidth <= 767) {
      let currentScrollPos = window.scrollY;
      if(prevScrollpos > currentScrollPos){
        header.style.top = "0px";
      }else if(currentScrollPos == 0){
        header.style.top = "0px";
      }else{
        header.style.top = "-50px";
      }
      prevScrollpos = currentScrollPos;
    }

    // Открытие первого аккордеона
    const firstAccordionItem = document.querySelector('.accordion-item');
    const activeAccordion = document.querySelector('.accordion-item.active'); // Проверяем, есть ли уже открытый аккордеон

    if (firstAccordionItem && !activeAccordion && window.innerWidth > 767) { // Открываем первый аккордеон только если никакой другой не активен
      let firstAccordionOffset = firstAccordionItem.getBoundingClientRect().top + window.scrollY;

      if (window.scrollY > firstAccordionOffset - window.innerHeight / 2) {
        const firstContent = firstAccordionItem.querySelector('.accordion-content');
        firstAccordionItem.classList.add('active');
        firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
      }
    }
  });
});
