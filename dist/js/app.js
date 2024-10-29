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

  // Fancybox
  Fancybox.bind("[data-fancybox]");

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

  // custom select cities
  $(function () {
    oCts.init();
  });
  
  let oCts = {
    eBlock: null,
    eBtn: null,
    eList: null,
    cities: null,
    init: function () {
      (this.eBlock = $(".cities-select")),
        (this.eList = oCts.eBlock.children("ul")),
        (this.eBtn = oCts.eBlock.children("div")),
        this.onChg();
        this.eBtn.text(oCts.eList.find(".active a").text()
      );
      $(document).click(function (e) {
        if ($(e.target).is(oCts.eBtn)) {
          // Div
          if (oCts.eBlock.hasClass("open")) oCts.hide();
          else oCts.show();
        } else if (
          $(e.target).is(oCts.eList.find("a")) &&
          oCts.eBlock.hasClass("open")
        ) {
          // Link
          oCts.eBtn.text($(e.target).text());
          $(e.target).parent().siblings().removeClass("active");
          $(e.target).parent().addClass("active");
          oCts.onChg();
          oCts.hide();
        } else if (oCts.eBlock.hasClass("open")) {
          // Without lng
          oCts.hide();
        }
      });
    },
    show: function () {
      oCts.eBlock.addClass("open");
      oCts.eList.stop().slideDown(150);
    },
    hide: function () {
      oCts.eBlock.removeClass("open");
      oCts.eList.stop().slideUp(150);
    },
    onChg: function () {
      oCts.cities = oCts.eList.find(".active a").data("cities");
      // console.info("Current language: " + oCts.lang);
    }
  };

  // Modals
  function hidePopup(popup) {
    popup.addEventListener('click', function(e) {
      const target = e.target;
      if (
        target.classList.contains("modal__close") ||
        target.classList.contains("modals")
      ) {
        popup.style.transition = "opacity 0.4s";
        popup.style.opacity = "0";
        setTimeout(() => {
          popup.style.display = "none";
          body.classList.remove('modal-open')
        }, 400);
      }
    });
  }
  function showPopup(popup) {
    popup.style.display = "flex";
    setTimeout(() => {
      body.classList.add('modal-open')
      popup.style.transition = "opacity 0.4s";
      popup.style.opacity = "1";
    }, 10);
  } 

  let body = document.querySelector('body')
  let modals = document.querySelector('.modals')
  let modalAll = document.querySelectorAll('.modal')
  let modalBtns = document.querySelectorAll(".modal-btn");
  let modalBranch = document.querySelector('.modal-branch')
  setTimeout(() => {
    showPopup(modals)
    modalBranch.style.display = 'block';
  }, 3000);
  if(modals && modalBtns){
    hidePopup(modals);
    modalBtns.forEach( btn => {
      btn.addEventListener('click', () => {
        showPopup(modals)
        let typeBtn = btn.dataset.type;
        modalAll.forEach( modal => {
          let typeModal = modal.dataset.type;
          modal.style.display = 'none'
          if(typeBtn == typeModal) {
            modal.style.display = 'block'
          }
        });
      })
    })
  }

  // file input

  const inputFile = document.querySelector("#picture__input");
  const pictureBox = document.querySelector(".picture");
  const pictureImage = document.querySelector(".picture__image");
  const pictureImageTxt = "";
  const img = document.createElement("img");
  img.classList.add("picture__img");
  img.src = 'img/file.svg';
  pictureImage.appendChild(img);

  inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function (e) {
        const readerTarget = e.target;
        img.src = readerTarget.result;
        pictureBox.style.padding = 0;
        img.style.objectFit = 'cover';
      });
      reader.readAsDataURL(file);
    } else {
      img.src = 'img/file.svg';
      img.style.objectFit = 'contain';
      pictureBox.style.padding = `15px`;
    }
  });
  
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
