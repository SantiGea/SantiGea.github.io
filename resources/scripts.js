let equipos = []; // Variable global para almacenar los equipos

// Recuperar los datos del localStorage si existen
if (localStorage.getItem("Equipos")) {
  equipos = JSON.parse(localStorage.getItem("Equipos"));
}

// Llamar a la función para actualizar la tabla
actualizarTablaEquipos();


// Escucha el evento de clic en el botón "Guardar"
const btnGuardar = document.getElementById("Guardar");
btnGuardar.addEventListener("click", guardarDatos);

// Función para guardar los datos ingresados por el usuario
function guardarDatos() {
  // Obtener los valores ingresados por el usuario
  const tipoEquipo = document.querySelector('input[name="tipoEquipo"]:checked').value;
  const descripcionEquipo = document.getElementById("entraDescrip").value;
  const horasEquipo = document.getElementById("entraHoras").value;

  // Crear un objeto con los datos del equipo
  const equipo = {
    tipo: tipoEquipo,
    descripcion: descripcionEquipo,
    horas: horasEquipo
  };

  // Agregar el nuevo equipo a la lista
  equipos.push(equipo);

  // Actualizar la lista en el localStorage
  localStorage.setItem("Equipos", JSON.stringify(equipos));

  // Mostrar un mensaje de confirmación
  alert("Los datos se han guardado correctamente.");
}

function actualizarTablaEquipos() {
  const tablaEquipos = document.getElementById("tablaEquipos");
  const tbody = tablaEquipos.querySelector("tbody");

  // Limpiar el contenido actual de la tabla
  tbody.innerHTML = "";

  // Iterar sobre la lista de equipos y agregar filas a la tabla
  equipos.forEach((equipo, index) => {
    const fila = document.createElement("tr");

    const columnaTipo = document.createElement("td");
    columnaTipo.textContent = equipo.tipo;

    const columnaDescripcion = document.createElement("td");
    columnaDescripcion.textContent = equipo.descripcion;

    const columnaHoras = document.createElement("td");
    columnaHoras.textContent = equipo.horas;

    const columnaEliminar = document.createElement("td");
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
      eliminarEquipo(index);
    });

    columnaEliminar.appendChild(botonEliminar);

    fila.appendChild(columnaTipo);
    fila.appendChild(columnaDescripcion);
    fila.appendChild(columnaHoras);
    fila.appendChild(columnaEliminar);

    tbody.appendChild(fila);
  });
}

// Función para eliminar un equipo de la lista
function eliminarEquipo(index) {
  equipos.splice(index, 1);
  localStorage.setItem("Equipos", JSON.stringify(equipos));
  actualizarTablaEquipos();
}



document.getElementById("entraForm2").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que se envíe el formulario y se recargue la página

  const datosLocalStorage = localStorage.getItem("Equipos");
  if (datosLocalStorage !== null) {
    const equipos = JSON.parse(datosLocalStorage);
    const descripcionUsuario = document.getElementById("entraDescrip2").value; // Descripción ingresada por el usuario

    equipos.forEach(function(equipo) {
      if (equipo.descripcion === descripcionUsuario) {
        const horasEquipo = parseInt(equipo.horas);
        const horasUsuario = parseInt(document.getElementById("entraHoras2").value);
        const diferencia = horasEquipo - horasUsuario;

        alert(`Faltan ${diferencia} para realizar Service`);
      }
    });
  }
});
