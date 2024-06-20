var g_id_resultado="";

function agregarUsuario(){
//Variables con elementos de formulario
var txt_id_usuario  = document.getElementById("txt_id_usuario").value;
var txt_dv          = document.getElementById("txt_dv").value;
var txt_nombres     = document.getElementById("txt_nombres").value;
var txt_apellidos   = document.getElementById("txt_apellidos").value;
var txt_email       = document.getElementById("txt_email").value;
var txt_celular     = document.getElementById("txt_celular").value;
var txt_username       = document.getElementById("txt_username").value;
var txt_password       = document.getElementById("txt_password").value;


if(txt_id_usuario && txt_dv && txt_nombres && txt_apellidos && txt_email && txt_celular && txt_username && txt_password){
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

  var fechaActual = obtenerFecha();
  const raw = JSON.stringify({
    "id_usuario": txt_id_usuario,
    "dv": txt_dv,
    "nombres": txt_nombres,
    "apellidos": txt_apellidos,
    "email": txt_email,
    "celular": txt_celular,
    "username": txt_username,
    "password":txt_password,
    "fecha_registro": fechaActual
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
  .then(response => {
    if(response.status == 200) {
        location.href ="listar.html";
    }
    if(response.status == 400) {
      alert('Se ha producido un error');
    }
  })
    
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}else{alert("Datos incompletos")}
}

function listarUsuario(){
  const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
      .then((response) => response.json())
      .then((json) => {
          json.forEach(completarFila);
          $('#tbl_usuario').DataTable();
      } 
      )
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}
function completarFila(element,index,arr){


  var fechaclienteFormateada = formatearFecha(element.fecha_registro);
  
  arr[index] = document.querySelector('#tbl_usuario tbody').innerHTML += 
  `<tr>
  <td>${element.id_usuario}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${element.username}</td>
  <td>${element.password}</td>
  <td>${fechaclienteFormateada}</td>
  <td>
  <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
  
  
  }

function obtenerParametroUsuarioEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_resultado = p_id_usuario;
  obtenerDatosUsuarioEliminar(p_id_usuario);


}
function obtenerDatosUsuarioEliminar(p_id_usuario){
  const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarEtiquetaEliminar) 
      )
      .then((result) => console.log(result))
      .catch((error) => console.error(error));

}
function completarEtiquetaEliminar(element,index,arr){
  var nombre_usuario = element.nombres;
  var etiquetaEliminar = document.getElementById('lbl_eliminar');
  etiquetaEliminar.innerHTML = "<p>¿Desea eliminar este usuario? " + nombre_usuario + "</p>";

}
function eliminarUsuario(){
 
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");



  const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario/"+g_id_resultado, requestOptions)
  .then(response => {
      if(response.status == 200) {
          location.href="listar.html";
      }
      if(response.status==400){
          alert("No es posible eliminar. Registro está siendo utilizado.");
      }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
function obtenerParametroUsuarioActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_resultado = p_id_usuario;
  obtenerDatosUsuarioActualizar(p_id_usuario);


}

function obtenerDatosUsuarioActualizar(p_id_usuario){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarFormularioActualizar) 
        )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}

function completarFormularioActualizar(element,index,arr){
    var nombresUsuario = element.nombres;
    var apellidosUsuario = element.apellidos;
    var emailUsuario = element.email;
    var celularUsuario = element.celular;
    var usernameUsuario = element.username;
    var passwordUsuario = element.password;

    document.getElementById("txt_nombres").value = nombresUsuario;
    document.getElementById("txt_apellidos").value = apellidosUsuario;
    document.getElementById("txt_email").value = emailUsuario;
    document.getElementById("txt_celular").value = celularUsuario;
    document.getElementById("txt_username").value = usernameUsuario;
    document.getElementById("txt_password").value = passwordUsuario;
}
function actualizarUsuario(){
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;
    var username = document.getElementById("txt_username").value;
    var password = document.getElementById("txt_password").value;

    //Validamos la entrada
    if(nombres && apellidos && email && celular && username && password){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "nombres": nombre
        });

        const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("http://144.126.210.74:8080/api/usuario/"+g_id_resultado, requestOptions)
        .then(response => {
            if(response.status == 200) {
                location.href ="listar.html";
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }else{alert("Datos incompletos")}
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