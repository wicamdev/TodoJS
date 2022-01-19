// variables 
const capturaMensaje = document.querySelector("#toDoList #tarea");
const enviarBtn = document.querySelector("#enviaTarea");
const listaPendientes = document.querySelector("#tableInfo");
const formulario = document.querySelector("#toDoList");
const tareaRealizada =document.querySelector("#tareaRealizada")
const btnEliminaPendietes = document.querySelector("eliminar-tarea");
const BtnEliminar = document.querySelector(".elimina-tarea-fin")




//capturar el formulario
formulario.addEventListener("submit", function(e) {
    e.preventDefault();
    const formularioObjeto = new FormData(formulario);
    const tareaObjeto = CrearFormularioObjeto(formularioObjeto);
    GuardaFomulario(tareaObjeto);
    insertarDatosTabla(tareaObjeto);    
    formulario.reset();
    console.log(tareaObjeto);
})

//Escucha de evento

document.addEventListener("DOMContentLoaded", function(e){

    let tareaObjetoArray = JSON.parse(localStorage.getItem("pendientesArray"));
    tareaObjetoArray.forEach( function(i ){
            insertarDatosTabla(i);
     } )
} )

document.addEventListener("DOMContentLoaded", function(e){

    let tareaObjetoArray2= JSON.parse(localStorage.getItem("realizadosArray"));
    tareaObjetoArray2.forEach( function(element ){
    insertarDatosRealizados(element);
     } )
} )

function obtenerNuevoId(){
    let ultimaIdFormulario= localStorage.getItem("ultimaTransaccion") || "-1";
    let nuevaTransacionId = JSON.parse(ultimaIdFormulario) +1;
    localStorage.setItem("ultimaTransaccion", JSON.stringify(nuevaTransacionId));
    return nuevaTransacionId;
}


function  CrearFormularioObjeto(formularioObjeto){
    console.log("creado el objeto mijo")    
    let nombreTarea = formularioObjeto.get("nombreTarea");
    let formularioId = obtenerNuevoId();
    return{
        "nombreTarea" : nombreTarea,
        "formularioId": formularioId
    }
}


//guradar en el local storage

function GuardaFomulario(tareaObjeto){
    let miformularioArray = JSON.parse(localStorage.getItem("pendientesArray")) || [];
    miformularioArray.push(tareaObjeto);
    let miformularioObjetoJSON = JSON.stringify(miformularioArray);
    localStorage.setItem("pendientesArray", miformularioObjetoJSON);
    

}

function GuardaFomulario2(tareaObjeto){
   
    let miformularioArray2 = JSON.parse(localStorage.getItem("realizadosArray")) || [];
    miformularioArray2.push(tareaObjeto);
    let miformularioObjetoJSON2 = JSON.stringify(miformularioArray2);
    localStorage.setItem("realizadosArray", miformularioObjetoJSON2);
}

function eliminarTareaLS(formularioId){
    let tareaObjetoDesdeArray = JSON.parse(localStorage.getItem("pendientesArray"))
    let tareaIndexArray = tareaObjetoDesdeArray.findIndex(e =>e.formularioId ===formularioId )
    tareaObjetoDesdeArray.splice(tareaIndexArray, 1)
    let miformularioObjetoJSON = JSON.stringify(tareaObjetoDesdeArray);
    localStorage.setItem("pendientesArray", miformularioObjetoJSON);
}
function eliminarTarearealizadaLS(formularioId){
    let tareaObjetoDesdeArray2 = JSON.parse(localStorage.getItem("realizadosArray"))
    let tareaIndexArray2 = tareaObjetoDesdeArray2.findIndex(e =>e.formularioId ===formularioId )
    tareaObjetoDesdeArray2.splice(tareaIndexArray2, 1)
    let miformularioObjetoJSON2 = JSON.stringify(tareaObjetoDesdeArray2);
    localStorage.setItem("realizadosArray", miformularioObjetoJSON2);
}





function insertarDatosTabla(tareaObjeto){
    // agregar fila a la tabla
    let agregafila = listaPendientes.insertRow(-1);
    //agregamos celda con la info
    let CeldaMensaje = agregafila.insertCell(0);
    CeldaMensaje.setAttribute("data-id", tareaObjeto["formularioId"])//

    CeldaMensaje.className = "lista-tareas";
    CeldaMensaje.textContent = tareaObjeto["nombreTarea"];
    
    let celdaRealizado = agregafila.insertCell(1);
    let agregarBtn = document.createElement("button");
    agregarBtn.textContent= "↘";
    agregarBtn.className = "pasa-tarea"
    celdaRealizado.appendChild(agregarBtn);
    
    let celdaEliminar = agregafila.insertCell(2);
    agregarBtn2 = document.createElement("button");
    agregarBtn2.textContent= "⛔";
    agregarBtn2.className = "eliminar-tarea"
    celdaEliminar.appendChild(agregarBtn2);
    
  //escucha de evento para eliminar la ela tarea

    
    agregarBtn.addEventListener("click", function (e){
        let botonEliminado = e.target.parentNode.parentNode
        let formularioId = botonEliminado.getAttribute("data-id")
        botonEliminado.remove(tareaObjeto);
        eliminarTareaLS(formularioId);
        GuardaFomulario2(tareaObjeto)
        insertarDatosRealizados(tareaObjeto)
        
        
    })
}
// elimina tareas de tareas por realizar
document.addEventListener("dblclick", function (e){
    if(e.target.classList.contains("eliminar-tarea")){
        let botonEliminado = e.target.parentNode.parentNode
        console.log("se puede eliminar de tareas ralizadas")
        let formularioId = botonEliminado.getAttribute("data-id")
        botonEliminado.remove();
        eliminarTareaLS(formularioId);
    }   

} )


function insertarDatosRealizados(tareaObjeto){
    
    let agregafila2 = tareaRealizada.insertRow(-1);
    let CeldaMensaje2 = agregafila2.insertCell(0);
    CeldaMensaje2.setAttribute("data-id", tareaObjeto["formularioId"])//
    CeldaMensaje2.textContent = tareaObjeto["nombreTarea"];
    CeldaMensaje2.className="tarea-finalizda";
    // CeldaMensaje2.style.textDecoration = "line-through red";
    // CeldaMensaje2.style.color="white";

    
    let celdaEliminarDefinitivo = agregafila2.insertCell(1);
    celdaEliminarDefinitivo.createElement=("button");
    celdaEliminarDefinitivo.textContent="⛔";
    celdaEliminarDefinitivo.className="elimina-tarea-fin";
}


document.addEventListener("dblclick", function (e){
    if(e.target.classList.contains("eliminar-tarea")){
        
            let botonEliminado = e.target.parentNode.parentNode
            let formularioId = botonEliminado.getAttribute("data-id")
            botonEliminado.remove();
    }   

} )

// eliminar tarea ya realizada
document.addEventListener("dblclick", function(e){
if(e.target.classList.contains("elimina-tarea-fin")){

    let eliminarFinal = e.target.parentNode;
    eliminarFinal.remove();
    eliminarTarearealizadaLS();
}

})