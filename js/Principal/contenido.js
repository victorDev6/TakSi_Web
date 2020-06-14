/********************************************************** */
/*INICIA FIREBASE
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
    measurementId: "G-6VDL057TWQ",
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error(
      "Se produjo un error de inicialización de Firebase",
      err.stack
    );
  }
}

try {
  var db = firebase.firestore();
} catch (error) {
  console.log("verifica tu conexion a internet");
  mensajeM = `¡Error de comunicación!<br>
            Inténtalo mas tarde`;
  colorTodos = "#e24c4b";
  linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
  mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
}

ConsultaNoticias();

/********************************************************** */
/*CONSULTA LAS NOTICIAS
/*********************************************************** */
function ConsultaNoticias() {
  $("#loader").show();
  let contadorClase = 0;
  let nomClase = "";
  let indi, noti;
  let noticias = document.getElementById("add_corousel_noticias");
  let indicador_noti = document.getElementById("add_indicador_carousel");
  db.collection("noticias_web")
    .get()
    .then(function (querySnapshot) {
      noticias.innerHTML = "";
      indicador_noti.innerHTML = "";
      contadorClase = 0;
      querySnapshot.forEach(function (doc) {
        if (contadorClase == 0) {
          nomClase = "active";
        } else {
          nomClase = "";
        }
        //Indicador de la imagen
        indicador_noti.innerHTML += `
                    <li data-target="#secondary-carousel" data-slid-to="${contadorClase}" class="${nomClase}"></li>
      `;
        //Imagen Noticia
        noticias.innerHTML += `
                   <div class="carousel-item ${nomClase}">
                      <a href="${
                        doc.data().url
                      }" id="btn_link_android_pasajero" target="_blank">
                        <div class="carousel-caption d-block">
                            <p class="font-weight-bold text-center">Equipo Tak-si</p>
                            <p class="font-weight-bold text-center">
                            ${doc.data().descripcion}</p>
                        </div>
                        <img class="d-block m-auto img-fluid" 
                        src="${doc.data().url}">
                      </a>
                    </div> 
      `;
        contadorClase++;
      });
      $("#loader").hide();
    })
    .catch(function (error) {
      console.log("Error: " + error);
      mensajeM = `¡Error de comunicación!<br>
            Inténtalo mas tarde`;
      colorTodos = "#e24c4b";
      linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
      mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
    });
}

$(".carousel-control").click(function (event) {
  $("body").css("overflow");
  event.preventDefault();
});

/********************************************************** */
/*REDIRECCIONA A LA SECCION DE DESCARGA DE LA APP
/*********************************************************** */
//Al dar click en app conductor
$("#btn_app_conductor").click(function (e) {
  e.preventDefault();
  moverseA("id_app_conductor");
});

$("#btn_app_conductor_f").click(function (e) {
  e.preventDefault();
  moverseA("id_app_conductor");
  //Para que enfoque el boton nuevamente
  if (location.hash === "#!/Inicio#!%2FInicio") {
    window.document.title = "Inicio";
    $("nav a").removeClass("activo");
    $("#contenedor").addClass("activo");
  }
});

//Al dar click en app pasajero
$("#btn_app_pasajero").click(function (e) {
  e.preventDefault();
  moverseA("id_app_pasajero");
});

$("#btn_app_pasajero_f").click(function (e) {
  e.preventDefault();
  moverseA("id_app_pasajero");
  //Para que enfoque el boton nuevamente
  if (location.hash === "#!/Inicio#!%2FInicio") {
    window.document.title = "Inicio";
    $("nav a").removeClass("activo");
    $("#contenedor").addClass("activo");
  }
});

function moverseA(idDelElemento) {
  location.hash = "#" + idDelElemento;
  window.location = "#!/Inicio" + location.hash;
}

//Funcion de mostrar mensajes modal
function mostrarModalMensaje(mensajeM, colorTodos, linkImagenCuerpo) {
  $("#cabezaModal").css("background-color", colorTodos);
  $("#textoCuerpoModal").css("color", colorTodos);
  $("#botonAceptarModalM").css("background-color", colorTodos);
  $("#imagenCuerpoM").attr("src", linkImagenCuerpo);
  $("#textoCuerpoModal").html(mensajeM);
  $("#modalMensajesM").modal("show");
  //setTimeout(QuitarModalM, 4000);
}
function QuitarModalM() {
  $("#modalMensajesM").modal("hide");
}

//Hacer que las 3 cajas no tengan funcion al hacer click
$("#caja1, #caja2 , #caja3").click(function (e) {
  e.preventDefault();
  console.log("...");
});
