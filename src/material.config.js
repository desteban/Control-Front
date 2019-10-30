//Sidenav
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

//Collapsible
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});

//Dropdown
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems);
});

function ocultar() {

  console.log('Hide menu')
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
}

//select
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

//--------------- AUTO COMPLETE----------------------------------------

function empleado() {
  var elems = document.querySelectorAll('.autocomplete');
  var instances = M.Autocomplete.init(elems, {
    data: {
      "Admin": null,
      "Profesor": null
    }
  });
}

function estudiante() {
  var elems = document.querySelectorAll('.autocomplete');
  var instances = M.Autocomplete.init(elems, {
    data: {
      "Administracion": null,
      "Ingerieria de sistemas": null,
      "Zootectia": null,
      "Psicologia": null,
      "Ingenieria ambiental": null
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.autocomplete');
  var instances = M.Autocomplete.init(elems, {
    data: {
      "Admin": null,
      "Profesor": null
    }
  });
});

//--------------- /AUTO COMPLETE----------------------------------------
