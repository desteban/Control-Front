//Sidenav
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

//Collapsible
 document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});

//Dropdown
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems);
});


function ocultar(){
  console.log('Hide')
  var elementos = document.getElementById('mobile-demo')
  //ocultar menu
  elementos.style.transform = "translateX(-150%)"

  //esconder div
  var elementos = document.getElementsByClassName('sidenav-overlay')
  if(elementos.length > 0){
    for (let i = 0; i < elementos.length; i++)
      elementos[i].style.cssText = "display: none; opacity: 0;";
  }

}
