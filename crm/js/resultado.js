var g_id_resultado="";

function agregarResultado(){
//Variables con elementos de formulario
var txt_resultado  = document.getElementById("txt_resultado").value;
if(txt_resultado.trim()=== ""){
  alert("Datos incompletos");
}else{
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var fechaActual = obtenerFecha();
  const raw = JSON.stringify({

    "nombre_resultado": txt_resultado,
    "fecha_registro": fechaActual
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
  .then(response => {
    if(response.status == 200) {
        location.href ="listar.html";
    }
    if(response.status == 400) {
        alert("Se ha producido un error");
    }
  })
    
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }
}
function listarResultado(){
  const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
      .then((response) => response.json())
      .then((json) => {
          json.forEach(completarFila);
          $('#tbl_resultado').DataTable();
      } 
      )
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}
function completarFila(element,index,arr){


  var fechaResultadoFormateada = formatearFecha(element.fecha_registro);
  
  arr[index] = document.querySelector('#tbl_resultado tbody').innerHTML += 
  `<tr>
  <td>${element.id_resultado}</td>
  <td>${element.nombre_resultado}</td>
  <td>${fechaResultadoFormateada}</td>
  <td>
  <a href='actualizar.html?id=${element.id_resultado}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_resultado}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
  
  
  }

function obtenerParametroResultadoEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;
  obtenerDatosResultadoEliminar(p_id_resultado);


}
function obtenerDatosResultadoEliminar(p_id_resultado){
  const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/resultado/"+p_id_resultado, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarEtiquetaEliminar) 
      )
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

}
function completarEtiquetaEliminar(element,index,arr){
  var nombre_resultado = element.nombre_resultado;
  var etiquetaEliminar = document.getElementById('lbl_eliminar');
  etiquetaEliminar.innerHTML = "<p>¿Desea eliminar este resultado? " + nombre_resultado + "</p>";

}
function eliminarResultado(){
 
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");



  const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/resultado/"+g_id_resultado, requestOptions)
  .then(response => {
      if(response.status == 200) {
          location.href ="listar.html";
      }
      if(response.status==400){
          alert("No es posible eliminar. Registro está siendo utilizado.");
      }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
function obtenerParametroResultadoActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;
  obtenerDatosResultadoActualizar(p_id_resultado);


}

function obtenerDatosResultadoActualizar(p_id_cliente){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://144.126.210.74:8080/api/resultado/"+p_id_cliente, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarFormularioActualizar) 
        )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}

function completarFormularioActualizar(element,index,arr){
    var nombreResutado = element.nombre_resultado;
    document.getElementById("txt_resultado").value = nombreResutado;
}
function actualizarResultado(){
    var nombre_resultado = document.getElementById("txt_resultado").value;

    //Validamos la entrada
    if(nombre_resultado.trim()=== ""){
        alert("Datos incompletos");
    }else{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "nombre_resultado": nombre_resultado
        });

        const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("http://144.126.210.74:8080/api/resultado/"+g_id_resultado, requestOptions)
        .then(response => {
            if(response.status == 200) {
                location.href ="listar.html";
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
}

  function obtenerFecha(){
    var fechaActual = new Date();
    var fechaFormateada = fechaActual.toLocaleString('es-ES',{
        hour12 :false,
        year:'numeric',
        month:'2-digit',
        day:'2-digit',
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
    }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
    return fechaFormateada;
}

function formatearFecha(fecha_registro){

//Formateamos la fecha
var fechaGestion = new Date(fecha_registro);
var fechaFormateada = fechaGestion.toLocaleString('es-ES',{
    hour12 :false,
    year:'numeric',
    month:'2-digit',
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
    timeZone:'UTC'
}).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5');
return fechaFormateada;
    
}