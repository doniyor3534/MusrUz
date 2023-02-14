let ul = document.querySelector('nav ul');
let body = document.querySelector('.body');
let navresult = false;

function navresultfun(){
   if(navresult){
     ul.innerHTML = `   <a href='.' onclick="kurishfun(1)" >Musr joylarni ko'rish</a>`
     body.innerHTML = `<div id="ariza">
         <form className="arizaform">
             <h2>Ariza yuborish</h2>
             <label for='tel'>telefon nomer</label>
             <input id='tel' type='number' placeholder='telefon nomer kiriting' />
             <label for='photo'>Photo </label>
             <input id='photo' type='file' placeholder='photo kiriting' />
             <label for='izoh'>Izoh qoldiring</label>
             <textarea id='izoh' type='text' placeholder='Izohingizni kiriting' rows='10' ></textarea>
          
             <button class='yuborish' >Yuborish </button>
         </form>
     </div>`      
   }else{
    ul.innerHTML = `    <button  onclick="kurishfun(2)" >Ariza yuborish</button>`
    body.innerHTML = `<div id="map"></div>`
  }
}
navresultfun()

function kurishfun(i){
  if(i=='1'){
    navresult = false
  }else if(i=='2'){
    navresult = true
  }
  navresultfun()
}


function mapfunc(){
  
let map;
let geoposbtn = document.querySelector('.geoposbtn')
let tourStops = [
  [{rasm:'./img/musr1.jpg',soni:10},{ lat: 41.01833, lng: 71.64847 }, "Namangan"],
  [{rasm:'./img/musr2.jpg',soni:50},{ lat: 40.85234, lng: 72.23074 }, "Andijon"],
  [{rasm:'./img/musr1.jpg',soni:16},{ lat: 40.41044, lng: 71.78030 }, "Farg'ona"],
  [{rasm:'./img/musr2.jpg',soni:1111},{ lat: 41.29956, lng: 69.23147 }, "Toshkent"],
  [{rasm:'./img/musr1.jpg',soni:18},{ lat: 40.15062, lng: 67.86917 }, "Jizzax"],
  [{rasm:'./img/musr2.jpg',soni:0},{ lat: 39.61953, lng: 66.94632 }, "Samarqand"],
  [{rasm:'./img/musr1.jpg',soni:101},{ lat: 38.85370, lng: 65.78177 }, "Qarshi"],
  [{rasm:'./img/musr2.jpg',soni:20},{ lat: 39.77169, lng: 64.46341 }, "Buxoro"],
  [{rasm:'./img/musr1.jpg',soni:10},{ lat: 40.31444, lng: 65.46454 }, "Navoiy"],
  [{rasm:'./img/musr2.jpg',soni:60},{ lat: 41.54670, lng: 60.58523 }, "Urganch"],
  [{rasm:'./img/musr1.jpg',soni:55},{ lat: 42.50965, lng: 59.55252 }, "Nukus"],
];

function initMap() {
  console.log('dkkkkkk');
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.31444, lng: 65.46454 },
    zoom: 6,
    mapTypeId: 'roadmap',
  });

  
  // Create an info window to share between markers.
  const infoWindow = new google.maps.InfoWindow();
  const image = './img/icon.png';
 
  // Create the markers.
  function markerfun(){
  tourStops.forEach(([obect,position, title], i) => {
    let marker ;
       marker = new google.maps.Marker({
        position,
        map,
        title: `${title} da musr joylar soni ${obect.soni}ta  <img src=${obect.rasm} class='musrimg' alt="" />`,
        // label: `${obect.soni}`,
        optimized: false,
        draggable: false,
        animation: google.maps.Animation.DROP,
        icon:image,
      });
 

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
  });
}
markerfun()
// buttongpc
geoposbtn.addEventListener('click',()=>{
  if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition((position)=>{
           tourStops.push( [{soni:0},{ lat:position.coords.latitude, lng: position.coords.longitude }, "Men turgan joy"],)
           console.log(tourStops);
           markerfun();
         })
       }
 })
 
}

window.initMap = initMap;

}
mapfunc()