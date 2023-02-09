let map;
let geoposbtn = document.querySelector('.geoposbtn')
let tourStops = [
  [{soni:10},{ lat: 41.01833, lng: 71.64847 }, "Namangan"],
  [{soni:50},{ lat: 40.85234, lng: 72.23074 }, "Andijon"],
  [{soni:16},{ lat: 40.41044, lng: 71.78030 }, "Farg'ona"],
  [{soni:1111},{ lat: 41.29956, lng: 69.23147 }, "Toshkent"],
  [{soni:18},{ lat: 40.15062, lng: 67.86917 }, "Jizzax"],
  [{soni:0},{ lat: 39.61953, lng: 66.94632 }, "Samarqand"],
  [{soni:101},{ lat: 38.85370, lng: 65.78177 }, "Qarshi"],
  [{soni:20},{ lat: 39.77169, lng: 64.46341 }, "Buxoro"],
  [{soni:10},{ lat: 40.31444, lng: 65.46454 }, "Navoiy"],
  [{soni:60},{ lat: 41.54670, lng: 60.58523 }, "Urganch"],
  [{soni:55},{ lat: 42.50965, lng: 59.55252 }, "Nukus"],
];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.31444, lng: 65.46454 },
    zoom: 6,
    mapTypeId: 'roadmap',
  });

  
  // Create an info window to share between markers.
  const infoWindow = new google.maps.InfoWindow();
  const image = './img/cleaning (2).png'
 
  // Create the markers.
  function markerfun(){
  tourStops.forEach(([obect,position, title], i) => {
    let marker ;
       marker = new google.maps.Marker({
        position,
        map,
        title: `${title} da musr joylar soni ${obect.soni}`,
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
           markerfun()
         })
       }
 })
 // buttongpc






}

window.initMap = initMap;



