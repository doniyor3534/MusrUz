import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, set, ref, push, child, onChildAdded } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZN9Q1UTmzVbxmrA0jNyQMmjcdXy1Tgxs",
  authDomain: "musr-249c3.firebaseapp.com",
  projectId: "musr-249c3",
  storageBucket: "musr-249c3.appspot.com",
  messagingSenderId: "768138339380",
  appId: "1:768138339380:web:f679d6c1ff773fd23d5661",
  measurementId: "G-58N93X8EHZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
let id = push(child(ref(database), 'messages')).key;

const data = [];
let input = [{ rasm: '', soni: 0 }, { lat: 0, lng: 0 }, ""];
function submitfun(val) {
  let name = 'user1';

  set(ref(database, 'messages/' + id), {
    name: name,
    message: val
  })
}


//  setTimeout(() => {
//      submitfun()
//  }, 2000);


// ////////////////////////
let loader = document.querySelector('.loader')
// ////////////////////
let res = true
const Datamess = ref(database, 'messages/');
onChildAdded(Datamess, (res) => {
  data.push(res.val().message);
  console.log(data);
  if(!data){
    loader.classList.add('active')
  }else{
    loader.classList.remove('active')
  }
  if(res){
    initMap()
    res = false
  }
})
// ////////////////////
let map ,infoWindow;
// let tourStops = [
//   [{ rasm: './img/musr1.jpg', soni: 10 }, { lat: 41.01833, lng: 71.64847 }, "Namangan"],
//   [{ rasm: './img/musr2.jpg', soni: 50 }, { lat: 40.85234, lng: 72.23074 }, "Andijon"],
//   [{ rasm: './img/musr1.jpg', soni: 16 }, { lat: 40.41044, lng: 71.78030 }, "Farg'ona"],
//   [{ rasm: './img/musr2.jpg', soni: 1111 }, { lat: 41.29956, lng: 69.23147 }, "Toshkent"],
//   [{ rasm: './img/musr1.jpg', soni: 18 }, { lat: 40.15062, lng: 67.86917 }, "Jizzax"],
//   [{ rasm: './img/musr2.jpg', soni: 0 }, { lat: 39.61953, lng: 66.94632 }, "Samarqand"],
//   [{ rasm: './img/musr1.jpg', soni: 101 }, { lat: 38.85370, lng: 65.78177 }, "Qarshi"],
//   [{ rasm: './img/musr2.jpg', soni: 20 }, { lat: 39.77169, lng: 64.46341 }, "Buxoro"],
//   [{ rasm: './img/musr1.jpg', soni: 10 }, { lat: 40.31444, lng: 65.46454 }, "Navoiy"],
//   [{ rasm: './img/musr2.jpg', soni: 60 }, { lat: 41.54670, lng: 60.58523 }, "Urganch"],
//   [{ rasm: './img/musr1.jpg', soni: 55 }, { lat: 42.50965, lng: 59.55252 }, "Nukus"],
// ];


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.31444, lng: 65.46454 },
    zoom: 5,
    mapTypeId: 'roadmap',
  });

  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.innerHTML = `<img src="./img/map.png" alt="" />`;
  locationButton.classList.add("sizturganjoy");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Siz shu yerdasiz");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });



  // Create an info window to share between markers.
  const image = './img/trash.png';

  // Create the markers.
  function markerfun() {

    let tourStops = data
    tourStops.forEach(([obect, position, title], i) => {
      let marker;
      marker = new google.maps.Marker({
        position,
        map,
        title: `${title} da musr joylar soni ${obect.soni}ta  <img src=${obect.rasm} class='musrimg' alt="" />`,
        // label: `${obect.soni}`,
        optimized: false,
        draggable: false,
        animation: google.maps.Animation.DROP,
        icon: image,
      });


      // Add a click listener for each marker, and set up the info window.
      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
      });
    });
    
      // //////my position

      // //////my position
  }
  markerfun()
  // setTimeout(() => {
  //   markerfun()
  // }, 3000);


  // buttongpc
  markerfun()
  let arizabtn = document.querySelector('.arizabtn')
   arizabtn.addEventListener('click',()=>{
    let button = document.querySelector('.yuborish')
    let photo = document.querySelector('#photo')
    let izoh = document.querySelector('#izoh')
    if (button) {
      photo.addEventListener('change', (e) => {
        let reader = new FileReader()
        const img = e.target.files[0]
        reader.readAsDataURL(img)
        reader.addEventListener('load', () => {
          input[0].rasm = reader.result
        })
      })
      izoh.addEventListener('keyup', (e) => {
        input[2] = e.target.value
        console.log(input);
      })
      button.addEventListener('click', () => {
        if (navigator.geolocation && photo.value !== '' && izoh.value !== '') {
          navigator.geolocation.getCurrentPosition((position) => {
            input[1].lat = position.coords.latitude
            input[1].lng = position.coords.longitude
            console.log(input);
            submitfun(input)
            markerfun();
            setTimeout(() => {
              location.reload(true)
            },10);
          })
        } else {
          alert(`iltimos malumotni to'liq kirirting`)
        }

      })

    }
   })
  setInterval(() => {
   
  }, 2000);

}

window.initMap = initMap;






