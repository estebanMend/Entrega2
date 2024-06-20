var g_id_tipo_gestion ="";
function crearTipoGestion(){
    var nombre = document.getElementById("txt_nombre").value;

    if(nombre===""){
        alert("Datos incompletos");
    }else{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Fecha y hora actual 
        var fechaActual = obtenerFecha();

        const raw = JSON.stringify({
        "nombre_tipo_gestion": nombre,
        "fecha_registro": fechaActual
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("http://144.126.210.74:8080/api/tipo_gestion", requestOptions)
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
function listarTipoGestion(){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://144.126.210.74:8080/api/tipo_gestion/?_size=300", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            json.forEach(completarFila);
            $('#tbl_tipo_gestion').DataTable();
        } 
        )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}
function completarFila(element,index,arr){

    var fechaTipoGestion = formatearFecha(element.fecha_registro);
arr[index] = document.querySelector('#tbl_tipo_gestion tbody').innerHTML += 
`<tr>
<td>${element.id_tipo_gestion}</td>
<td>${element.nombre_tipo_gestion}</td>
<td>${fechaTipoGestion}</td>
<td>
<a href='actualizar.html?id=${element.id_tipo_gestion}' class='btn btn-warning btn-sm'>Actualizar</a>
<a href='eliminar.html?id=${element.id_tipo_gestion}' class='btn btn-danger btn-sm'>Eliminar</a>
</td>
</tr>`


}
function obtenerParametroTipoGestionActualizar(){
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_tipo_gestion = parametros.get('id');
    g_id_tipo_gestion = p_id_tipo_gestion;
    obtenerDatosTipoGestionActualizar(p_id_tipo_gestion);


}
function obtenerParametroTipoGestionEliminar(){
    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const p_id_tipo_gestion = parametros.get('id');
    g_id_tipo_gestion = p_id_tipo_gestion;
    obtenerDatosTipoGestionEliminar(p_id_tipo_gestion);


}
function obtenerDatosTipoGestionActualizar(p_id_tipo_gestion){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarFormularioActualizar) 
        )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}
function obtenerDatosTipoGestionEliminar(p_id_tipo_gestion){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarEtiquetaEliminar) 
        )
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

}
function completarEtiquetaEliminar(element,index,arr){
    var nombre_tipo_gestion = element.nombre_tipo_gestion;
    var etiquetaEliminar = document.getElementById('lbl_eliminar');
    etiquetaEliminar.innerHTML = "<p>¿Desea eliminar este tipo de gestión? " + nombre_tipo_gestion + "</p>";
  
}
function completarFormularioActualizar(element,index,arr){
    var nombreTipoGestion = element.nombre_tipo_gestion;
    document.getElementById("txt_nombre").value = nombreTipoGestion;
}
function actualizarTipoGestion(){
    var nombre = document.getElementById("txt_nombre").value;

    //Validamos la entrada
    if(nombre.trim()=== ""){
        alert("Datos incompletos");
    }else{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "nombre_tipo_gestion": nombre
        });

        const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("http://144.126.210.74:8080/api/tipo_gestion/"+g_id_tipo_gestion, requestOptions)
        .then(response => {
            if(response.status == 200) {
                location.href ="listar.html";
            }
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
}
function eliminarTipoGestion(){
 
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

 

    const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/tipo_gestion/"+g_id_tipo_gestion, requestOptions)
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