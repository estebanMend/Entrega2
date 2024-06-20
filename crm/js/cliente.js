var g_id_resultado="";

function agregarCliente(){
//Variables con elementos de formulario
var txt_id_cliente  = document.getElementById("txt_id_cliente").value;
var txt_dv          = document.getElementById("txt_dv").value;
var txt_nombres     = document.getElementById("txt_nombres").value;
var txt_apellidos   = document.getElementById("txt_apellidos").value;
var txt_email       = document.getElementById("txt_email").value;
var txt_celular     = document.getElementById("txt_celular").value;

if(txt_id_cliente && txt_dv && txt_nombres && txt_apellidos && txt_email && txt_celular){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var fechaActual = obtenerFecha();
  const raw = JSON.stringify({
    "id_cliente": txt_id_cliente,
    "dv": txt_dv,
    "nombres": txt_nombres,
    "apellidos": txt_apellidos,
    "email": txt_email,
    "celular": txt_celular,
    "fecha_registro": fechaActual
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
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
}else{alert("Datos incompletos")}
}

function listarCliente(){
  const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
      .then((response) => response.json())
      .then((json) => {
          json.forEach(completarFila);
          $('#tbl_cliente').DataTable();
      } 
      )
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}
function completarFila(element,index,arr){


  var fechaclienteFormateada = formatearFecha(element.fecha_registro);
  
  arr[index] = document.querySelector('#tbl_cliente tbody').innerHTML += 
  `<tr>
  <td>${element.id_cliente}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${fechaclienteFormateada}</td>
  <td>
  <a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
  
  
  }

function obtenerParametroClienteEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_resultado = p_id_cliente;
  obtenerDatosClienteEliminar(p_id_cliente);


}
function obtenerDatosClienteEliminar(p_id_cliente){
  const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarEtiquetaEliminar) 
      )
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

}
function completarEtiquetaEliminar(element,index,arr){
  var nombre_cliente = element.nombres;
  var etiquetaEliminar = document.getElementById('lbl_eliminar');
  etiquetaEliminar.innerHTML = "<p>¿Desea eliminar este cliente? " + nombre_cliente + "</p>";

}
function eliminarCliente(){
 
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");



  const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente/"+g_id_resultado, requestOptions)
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
function obtenerParametroClienteActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_cliete = parametros.get('id');
  g_id_resultado = p_id_cliete;
  obtenerDatosClienteActualizar(p_id_cliete);


}

function obtenerDatosClienteActualizar(p_id_cliente){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarFormularioActualizar) 
        )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}

function completarFormularioActualizar(element,index,arr){
    var nombresCliente = element.nombres;
    var apellidosCliente = element.apellidos;
    var emailCliente= element.email;
    var celularCliente = element.celular;

    document.getElementById("txt_nombres").value = nombresCliente;
    document.getElementById("txt_apellidos").value = apellidosCliente;
    document.getElementById("txt_email").value = emailCliente;
    document.getElementById("txt_celular").value = celularCliente;

}
function actualizarCliente(){
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;
    //Validamos la entrada
    if(nombres && apellidos && email && celular){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular

        });

        const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("http://144.126.210.74:8080/api/cliente/"+g_id_resultado, requestOptions)
        .then(response => {
            if(response.status == 200) {
                location.href ="listar.html";
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }else{alert("Datos incompletos")};
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