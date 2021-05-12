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

// Lectures /////////////////////////////////////////////////////////////////////

///// Selecting Elements /////
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
