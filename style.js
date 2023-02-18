



let ul = document.querySelector('nav ul');
let body = document.querySelector('.body');
let navresult = false;

function navresultfun() {
  if (navresult) {
    ul.innerHTML = `   <a href='.' onclick="kurishfun(1)" >Musr joylarni ko'rish</a>`
    body.innerHTML = `<div id="ariza">
         <form className="arizaform" >
             <h2>Ariza yuborish</h2>
             <label for='photo'>Photo </label>
             <input id='photo' type='file' placeholder='photo kiriting' />
             <label for='izoh'>Izoh qoldiring</label>
             <textarea id='izoh' type='text'  placeholder='Izohingizni kiriting' rows='10' ></textarea>
          
             <button type='button' onclick=sendFunc()  class='yuborish' >Yuborish </button>
         </form>
     </div>`
  } else {
    ul.innerHTML = `    <button  onclick="kurishfun(2)" class='arizabtn' >Ariza yuborish</button>`
    body.innerHTML = `<div id="map"></div>`
  }
}
navresultfun()

let sendFunc = () => {
  navresult = false
  navresultfun()
  
}



function kurishfun(i) {
  if (i == '1') {
    navresult = false
  } else if (i == '2') {
    navresult = true
  }
  navresultfun()
}