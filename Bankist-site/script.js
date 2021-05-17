'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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
