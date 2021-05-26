'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let mapEvent;

// Using the Geolocation API
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com.br/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      //  Displaying a Map Using Leaflet Library
      map = L.map('map').setView(coords, 13);

      // console.log(map);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

      // Handling clicks on map
      //Displaying a Map Marker
      map.on('click', function (mapE) {
        mapEvent = mapE; // Turning event a global variable

        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    function () {
      alert('Coud not get your position');
    }
  );

// Rendering Workout Input Form
// Enter submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear iput field
  inputCadence.value =
    inputDuration.value =
    inputElevation.value =
    inputDistance.value =
      '';

  // Display marker
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
