'use strict';

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Implementing Smooth Scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // Getting coordinates of section1
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); // e.target element with event => btnScrollTo

  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset); // Scroll coordinates

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Event Delegation: Implementing Page Navigation
/* document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();

    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
 */
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target); // Where event happens
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    // console.log('link');
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Building tab components

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // Get btn always => if clicked on the btn or on the span get operations__tab closest

  // Guard clause
  if (!clicked) return; // If its nth clicked fish the function => need to be before

  // Remove active classes
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active'); // dataset - Just .part after data => .tab
});

//// Passing Arguments to Event Handlers ////
// Menu fade animation
const handleHover = function (e) {
  //console.log(this, e.target);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// mouse over bubble and mouse enter not
// Use bind => return a enw function
// Passing "arguments" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5)); // THIS VARIABLE ARE SET TO 0.5

nav.addEventListener('mouseout', handleHover.bind(1)); // THIS VARIABLE ARE SET TO 0.5
/* nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
}); */

//// Implementing a Sticky Navigation: The Scroll Event ////
/* const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function (e) {
  console.log(window.scrollY);

  if (window.screenY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}); */

//// A Better Way: The Intersection Observer API - Implementing a Sticky Navigation ////

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; // Interesting font of infos nav.getBoundingClientRect()
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries; // [entry] = entry[0] => must to be be entry 0 in this case
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // margin box aplly outside target element
});
headerObserver.observe(header);

//// Revealing Elements on Scroll ////
const allSelections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries; // Just one threshold - Get just the section that we are = target
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // Stop observer after all: ;
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // watching viewport
  threshold: 0.1, // At 10%
});

allSelections.forEach(function (section) {
  sectionObserver.observe(section); // Adding observer to all classes
  section.classList.add('section--hidden'); // Hidden before scroll all sections
});

//// Lazy Loading Images ////
const imgTaregts = document.querySelectorAll('img[data-src]'); // Selecting all images with property of data-src

const loadImg = function (entries, observer) {
  const [entry] = entries; // Just one threshold
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img'); // Do not use bacause blur can be removed before img loads

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // To load before threshold hold be load
});

imgTaregts.forEach(img => imgObserver.observe(img));

//// Building a Slider Component ////

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length; // We can read length property in node lists
  // console.log(maxSlide);

  // ** FUNCTIONS ** //
  const creatDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active'); // Selecting element with data-slide atribute set to the correspondent slide
  };

  // 0% 100% 200% 300%
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      // -1 cause length is not 0 based and index is
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0); // Calling function in the beginning => initial order slides
    creatDots(); // Calling function in the beginning => create dots
    activateDot(0); // Calling function in the beginning => First slide with dot active
  };
  init();

  // ** EVENT HANDLERS //
  // Next slide
  btnRight.addEventListener('click', nextSlide);
  // -100% 0% 100% 200%

  // Previous slide
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e);

    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; // === const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
///////////////////////////////////////////////////////////////////////////
// Lectures /////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

/* ///// Selecting Elements /////
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); // Select first element
const allSelections = document.querySelectorAll('.section'); // NodeList (do not update itself) => Select all elements
console.log(allSelections);

document.getElementById('section--1'); // get elements by id

const allButtons = document.getElementsByTagName('button'); // HTMLCollection (update itself)=> get elements by tag name
console.log(allButtons);

document.getElementsByClassName('btn'); // get elements by class

///// Creating Elements /////

const message = document.createElement('div'); // storing a element created
message.classList.add('cookie-message'); // Adding class
// message.textContent = 'We use cookied for improved functionality and analytics.'; // Adding text content
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; // Creating html
// header.prepend(message); // Adding html => prepend = first child of element
header.append(message); // Adding html => append = last child of element
// header.append(message.cloneNode(true)); // Cloning to the same element be in 2 places
header.before(message); // Adding html before element
// header.after(message); // Adding html after element

///// Creating Elements /////
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

///// Styles /////
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); // Do not show because don't set inline style
console.log(message.style.backgroundColor); // Shows because don't set inline style

console.log(getComputedStyle(message).color); // Computed style
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered'); // Changing css variables

///// Attributes /////
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beutiful minimalist logo';

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist'); // Setting atribute

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use
logo.className = 'Tiago'; */

//// Types of Events and Event Handlers ////

/* const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  // Mouse hover event
  alert('addEventListener: Great you are reading the heading :)');

  // h1.removeEventListener('mouseenter', alertH1); // Removing event after 1 occur
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); // Removing event after a time */

// old way to listen to events
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great you are reading the heading');
// };

//// Event Propagation: Bubbling and Capturing ////

/* const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(0, 255);

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    e.preventDefault();
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true // Listing event travel down the dom NOT bubbling
); */

/* //// DOM Traversing  ////
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // Children of h1 with highlight class
console.log(h1.childNodes); // Every single node and every single type
console.log(h1.children); // Elements inside h1 => direct children
console.log(h1.firstElementChild);
h1.firstElementChild.style.color = 'white'; // Styling just first children
h1.lastElementChild.style.color = 'blueviolet'; // Styling just last children

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // Closest parent => in this case closest header

h1.closest('h1').style.background = 'var(--gradient-primary)'; // Itself

// Going sideways: siblings
console.log(h1.previousElementSibling); // Just previus and next one
console.log(h1.nextElementSibling); // Just previus and next one

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); // How acess all siblings
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
 */

//// A Better Way: The Intersection Observer API ////
/* const obsCallback = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};

const obsOptions = {
  root: null, // target intersecting root  (null entire viewport)
  threshold: [0, 0.2], // intersecting at threshold in (%) => 0 every time te taget get out of view or enter in view
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); // section = target
 */

//// Lifecycle DOM Events ////

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree builT!', e);
}); // Fired when finishing parsing HTML

window.addEventListener('load', function (e) {
  console.log('Page fully loaded!', e);
});

/* window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
}); */

//// Efficient Script Loading: defer and async ////
