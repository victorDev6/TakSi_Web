$(document).ready(function () {
  ConsultaNoticias();
});

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
var db = firebase.firestore();
ConsultaNoticias();

/********************************************************** */
/*CONSULTA LAS NOTICIAS
/*********************************************************** */
function ConsultaNoticias() {
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
                        <div class="carousel-caption d-block">
                            <p class="font-weight-bold text-center">Equipo Tak-si</p>
                            <p class="font-weight-bold text-center">
                            ${doc.data().descripcion}</p>
                        </div>
                        <img class="d-block m-auto img-fluid" 
                        src="${doc.data().url}">
                    </div> 
      `;
        contadorClase++;
      });
    })
    .catch(function (error) {
      console.log("Error: " + error);
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
});

//Al dar click en app pasajero
$("#btn_app_pasajero").click(function (e) {
  e.preventDefault();
  moverseA("id_app_pasajero");
});

$("#btn_app_pasajero_f").click(function (e) {
  e.preventDefault();
  moverseA("id_app_pasajero");
});

function moverseA(idDelElemento) {
  location.hash = "#" + idDelElemento;
  window.location = "#!/Contenedor" + location.hash;
}

/********************************************************** */
/*AGREGAR LINK AL BOTON PARA PLAY STORE Y APP STORE
/*********************************************************** */
(function ConsultaLinks() {
  let appAndroidConductor = "";
  let appAndroidPasajero = "";
  let appAppleConductor = "";
  let appApplePasajero = "";
  let linkPaginaFacebook = "";
  let linkTwitter = "";
  let correoBD = "";
  let numeroTelefono = "";
  db.collection("configuracion")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (querySnapshot._snapshot.docChanges.length != 0) {
          appAndroidConductor = doc.data().link_app_android_conductor;
          appAndroidPasajero = doc.data().link_app_android_pasajero;
          appAppleConductor = doc.data().link_app_apple_conductor;
          appApplePasajero = doc.data().link_app_apple_pasajero;
          linkPaginaFacebook = doc.data().link_facebook;
          linkTwitter = doc.data().link_twitter;
          correoBD = doc.data().correo_empresa;
          numeroTelefono = doc.data().telefono_empresa;
        }
      });
      $("#btn_link_android_conductor").attr("href", appAndroidConductor);
      $("#btn_link_apple_conductor").attr("href", appAppleConductor);
      $("#btn_link_android_pasajero").attr("href", appAndroidPasajero);
      $("#btn_link_apple_pasajero").attr("href", appApplePasajero);
      $("#link_empresa_isoft").attr("href", linkPaginaFacebook);
      $("#link_facebook").html(linkPaginaFacebook);
      $("#link_twitter").html(linkTwitter);
      $("#tel_empresa").html(numeroTelefono);
      $("#correo_empresa").html(correoBD);
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
})();

/********************************************************** */
/*CONSULTA DE DATOS DE ACERCA DE
/*********************************************************** */
$("#mostrarAcercade").click(function (e) {
  e.preventDefault();
  //$("#modalAcercaDe").modal("show");
  DatosAcercaDe();
});

function DatosAcercaDe() {
  let num_taxis = "";
  let num_usuarios = "";
  let fundacion = "";
  let equipo = "";
  let link_empresa = "";
  let lugar = "";
  let num_colaboradores = "";
  let num_oficinas = "";

  db.collection("taxis")
    .get()
    .then(function (querySnapshot) {
      //console.log(querySnapshot.size);
      num_taxis = querySnapshot.size;
    });

  db.collection("usuarios")
    .get()
    .then(function (querySnapshot) {
      num_usuarios = querySnapshot.size;
      //console.log(querySnapshot.size);
    });

  db.collection("datos_acerca_de")
    .get()
    .then(function (querySnapshot) {
      console.log(querySnapshot.size);
      querySnapshot.forEach(function (doc) {
        fundacion = doc.data().fundacion;
        equipo = doc.data().equipo;
        link_empresa = doc.data().link_empresa;
        lugar = doc.data().lugar;
        num_colaboradores = doc.data().num_colaboradores;
        num_oficinas = doc.data().num_oficinas;
      });
      LlenarModalAcercaDe(
        fundacion,
        lugar,
        equipo,
        num_colaboradores,
        num_oficinas,
        num_taxis,
        num_usuarios,
        link_empresa
      );
    });
}

function LlenarModalAcercaDe(
  fundacion,
  lugar,
  equipo,
  numColab,
  numOfic,
  numTaxis,
  numPasa,
  linkE
) {
  $("#fundacion_acerca").html(fundacion);
  $("#lugar_acerca").html(lugar);
  $("#equipo_acerca").html(equipo);
  $("#num_colab_acerca").html(numColab);
  $("#num_oficina_acerca").html(numOfic);
  $("#num_taxis_acerca").html(numTaxis);
  $("#num_pasajero_acerca").html(numPasa);
  $("#link_empresa_acerca").attr("href", linkE);
  $("#modalAcercaDe").modal("show");
}
