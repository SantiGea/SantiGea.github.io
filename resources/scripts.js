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

    const columnaService = document.createElement("td");
    const botonService = document.createElement("button");
    botonService.textContent = "Service";
    botonService.addEventListener("click", () => {
      serviceEquipo(index)
    });
      
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

    columnaService.appendChild(botonService);

    fila.appendChild(columnaTipo);
    fila.appendChild(columnaDescripcion);
    fila.appendChild(columnaHoras);
    fila.appendChild(columnaEliminar);
    fila.appendChild(columnaService);

    tbody.appendChild(fila);
  });
}

// Función para eliminar un equipo de la lista
function eliminarEquipo(index) {
  equipos.splice(index, 1);
  localStorage.setItem("Equipos", JSON.stringify(equipos));
  actualizarTablaEquipos();
}


function serviceEquipo(index) {
  
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
        const sumaHoras = (horasEquipo + horasUsuario);
        if (Number(sumaHoras) >= 400){
            alert(`Hacer service, las horas pasaron los 400`);
       } else {
        console.log(sumaHoras);
       }
      }
     });
    }
  });


  // Seleccionar el botón
const generarPDFButton = document.getElementById("generar-pdf");

// Agregar el evento clic al botón
generarPDFButton.addEventListener("click", function() {
  // Crear el contenido del remito
  const descripcionUsuario = document.getElementById("entraDescrip2").value; // Descripción ingresada por el usuario
  const remitoContent = [
    { image: 'data:image/png;base64,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'} ,
    `Equipo: ${descripcionUsuario}`,
    'Fecha: 22 de junio de 2023',
    'Productos:',
    '1. Producto 1',
    '2. Producto 2',  
    '3. Producto 3',
  ];

  // Crear el documento PDF
  const docDefinition = {
    content: remitoContent
  };

  // Generar el remito en PDF
  pdfMake.createPdf(docDefinition).open();
});
