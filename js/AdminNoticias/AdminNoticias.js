//$(document).ready(function() {

var numeroNoti = "";
var file;
/********************************************************** */
/*SE INICIA FIRESTORE Y STORAGE
/*********************************************************** */
try {
  firebase.initializeApp({
    apiKey: "AIzaSyB3Vk0nWljV4KhsfU9Co4qNNE0P_FhIJC4",
    authDomain: "taksi-d543c.firebaseapp.com",
    databaseURL: "https://taksi-d543c.firebaseio.com",
    projectId: "taksi-d543c",
    storageBucket: "taksi-d543c.appspot.com",
    messagingSenderId: "3651890584",
    appId: "1:3651890584:web:3807da6ea8ba790f560fed",
    measurementId: "G-6VDL057TWQ"
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error(
      "Se produjo un error de inicialización de Firebase",
      err.stack
    );
  }
}
var db = firebase.firestore();
var storageRef = firebase.storage().ref();

/* Funcion lanzada por clase, que extrae el ID de quien lo lanzo, para procesar su imagen de salida*/
$(".selectorImagen").click(function(e) {
  switch (e.target.id) {
    case "imgSubida1":
      inImg = e.target.id;
      $("#imagenNoticia1").click();
      numeroNoti = "1";
      break;
  }
});
/* Se carga la imagen de Perfil en el input correspondiente, unicamente si es un formato válido (png,jpg y jpeg)*/
$("#imagenNoticia1").change(function() {
  file = $("#imagenNoticia" + numeroNoti).val();
  var ext = file.substring(file.lastIndexOf("."));
  if (
    ext == ".jpg" ||
    ext == ".png" ||
    ext == ".JPG" ||
    ext == ".PNG" ||
    ext == ".JPEG" ||
    ext == ".jpeg"
  ) {
    var imgExt = 23;
    if (ext == ".png" || ext == ".PNG") {
      imgExt = 22;
    }
    var preview = document.getElementById("imgSubida" + numeroNoti);
    file = document.getElementById("imagenNoticia" + numeroNoti).files[0];
    extension_PM = ext; //ext de imagen

    $("#imgSubida" + numeroNoti).attr("title", file.name);
    $("#imgSubida" + numeroNoti).attr("alt", imgExt);
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function() {
        preview.src = reader.result;
        //Hace que muestre la img
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  } else {
    $("#imgSubida" + numeroNoti).attr(
      "src",
      "../../Diseno/ICONOS/fotoDefault.svg"
    );
  }
});
/********************************************************** */
/*FUNCION QUE SUBE LA IMG A STORAGE
/*********************************************************** */
function subirImagenAFirebase() {
  var imagenASubir = file;
  var uploadTask = storageRef
    .child("noticias/" + imagenASubir.name)
    .put(imagenASubir);

  uploadTask.on(
    "state_changed",
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      showProgress(progress); //ejecutar progreso
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    function(error) {
      // Handle unsuccessful uploads
    },
    function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        GuardarNoticia_BD(downloadURL);
      });
    }
  );
}
/********************************************************** */
/*GUARDAR URL Y DESCRIPCION EN LA BD
/*********************************************************** */
function GuardarNoticia_BD(url) {
  let descripcion = document.getElementById("descripcion_noticia").value;
  let imagen_url = url;

  db.collection("noticias_web")
    .add({
      url: imagen_url,
      descripcion: descripcion,
      fecha: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function(docRef) {
      console.log("Registro exitoso");
      document.getElementById("descripcion_noticia").value = "";
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
/********************************************************** */
/*CONSULTAR NOTICIAS
/*********************************************************** */
function ConsultaNoticias() {
  let noticiasC = document.getElementById("agregarHijosNoticia");
  db.collection("noticias_web")
    .orderBy("fecha", "desc")
    .onSnapshot(function(querySnapshot) {
      noticiasC.innerHTML = "";
      querySnapshot.forEach(function(doc) {
        noticiasC.innerHTML += `
      <div class="contenedorhijo_noticias mt-3">
        <div class="contenedor_imagen">
            <div class="form-group">
                <img class="selectorImagen imgSubida_estilo" src="${
                  doc.data().url
                }">
            </div>
        </div>
        <div class="caja_texto_noticia">
          <textarea disabled class="caja_texto_noticia m-0 pl-2 text-justify" rows="4" cols="10">${
            doc.data().descripcion
          }</textarea>
        </div>

        <button class="btn btn_noticia_admin btn_noticia_elim p-0" 
        role="link" type="button" onclick="EliminarNoticia('${doc.id}')">
            <img src="../../Diseno/ICONOS/eliminar.svg" class="iconos_admin_j">
          ELIMINAR
        </button>
      </div>
        `;
      });
    });
}
ConsultaNoticias();
/********************************************************** */
/*ELIMINAR NOTICIAS
/*********************************************************** */
function EliminarNoticia(id) {
  db.collection("noticias_web")
    .doc(id)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}
/********************************************************** */
/*SUBIR LA IMAGEN AL DAR CLICK
/*********************************************************** */
$("#btn_subir_noti").click(function(e) {
  e.preventDefault();
  subirImagenAFirebase();
});
/********************************************************** */
/*MOSTRAR PROGRESO
/*********************************************************** */
function showProgress(valor) {
  let convertirInt;
  convertirInt = parseInt(valor);
  let progreso = document.getElementById("progreso_img");
  progreso.innerHTML = "";
  progreso.innerHTML = `
  <div class="progress">
  <div class="progress-bar progress-bar-striped font-weight-bold" 
  role="progressbar" style="width: ${valor}%" aria-valuenow="${valor}"
  aria-valuemin="0" aria-valuemax="100">${convertirInt}%</div>
  </div>`;
}
//});
