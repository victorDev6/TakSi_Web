$(document).ready(function () {
  /**Agregar codigo cuando sea pequeño la pantalla
  que el menu quede estatico y no este flotando */
  function MediaQueryMenu_y(y) {
    if (y.matches) {
      //Normal
      $("header").removeClass("header2");

      $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
          $("header").addClass("header2");
          $(".header2").css("position", "fixed");
        } else {
          $("header").removeClass("header2");
          $("header").css("position", "inherit");
        }
      });
    } else {
      //Se bloquea el menu flotante
      $("header").addClass("header2");
      $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
          $("header").addClass("header2");
          $(".header2").css("position", "static");
        } else {
          $("header").addClass("header2");
          $(".header2").css("position", "static");
        }
      });
    }
  }
  var y = window.matchMedia("(min-width: 850px)"); //Cuando rebase los 632 se pone en rosa
  MediaQueryMenu_y(y); // Call listener function at run time
  y.addListener(MediaQueryMenu_y); // Funcion siempre escuchando

  //Cuando esta en modo horizontal
  //  @media (min-width: 700px) and (orientation: landscape) { ... }

  //Boton al dar click se cambia de color el boton del menu
  $("#contenedor").click(function (e) {
    e.preventDefault();
    $("nav a").removeClass("activo");
    $(this).addClass("activo");
    window.location = "#!/Inicio";
    window.document.title = "Inicio";
  });

  $("#registro").click(function (e) {
    e.preventDefault();
    $("nav a").removeClass("activo");
    $(this).addClass("activo");
    window.location = "#!/Registrarse";
  });

  $("#iniciosesion").click(function (e) {
    e.preventDefault();
    $("nav a").removeClass("activo");
    $(this).addClass("activo");
    window.location = "#!/InicioSesion";
  });

  if (
    location.hash === "#!/Inicio" ||
    location.hash === "#!/Inicio#!%2FInicio"
  ) {
    $("nav a").removeClass("activo");
    $("#contenedor").addClass("activo");
  }
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

(function ConsultaLinks() {
  let appAndroidConductor = "";
  let appAndroidPasajero = "";
  //let appAppleConductor = "";
  //let appApplePasajero = "";
  let linkPaginaFacebook = "";
  let linkPaginaFacebookIsoft = "";
  //let linkInstagram = "";
  let correoBD = "";
  //let numeroTelefono = "";
  db.collection("configuracion")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (querySnapshot._snapshot.docChanges.length != 0) {
          appAndroidConductor = doc.data().link_app_android_conductor;
          appAndroidPasajero = doc.data().link_app_android_pasajero;
          //appAppleConductor = doc.data().link_app_apple_conductor;
          //appApplePasajero = doc.data().link_app_apple_pasajero;
          linkPaginaFacebook = doc.data().link_facebook;
          linkPaginaFacebookIsoft = doc.data().link_empresa_fb;
          // linkInstagram = doc.data().link_instagram;
          correoBD = doc.data().correo_empresa;
          // numeroTelefono = doc.data().telefono_empresa;
        }
      });
      $("#btn_link_android_conductor").attr("href", appAndroidConductor);
      //$("#btn_link_apple_conductor").attr("href", appAppleConductor);
      $("#btn_link_android_pasajero").attr("href", appAndroidPasajero);
      //$("#btn_link_apple_pasajero").attr("href", appApplePasajero);
      $("#link_empresa_isoft").attr("href", linkPaginaFacebookIsoft);
      $("#link_facebook").html(linkPaginaFacebook);
      $("#verFacebookTaksi").attr("href", linkPaginaFacebook);
      // $("#link_instagram").html(linkInstagram);
      // $("#verInstagram").attr("href", linkInstagram);
      // $("#tel_empresa").html(numeroTelefono);
      $("#correo_empresa").html(correoBD);
    })
    .catch(function (error) {
      console.log("Error: " + error);
      mensajeM = `¡Error de comunicación!<br>
            Inténtalo mas tarde`;
      colorTodos = "#e24c4b";
      linkImagen = "../../Diseno/ICONOS/icon_modal_error.svg";
      mostrarModalMensaje(mensajeM, colorTodos, linkImagen);
    });
})();

//Id de correo de la empresa hacer que no tenga funcion al darle click
$("#correo_empresa").click(function (e) {
  e.preventDefault();
  console.log("...");
});

function LlenarModalAcercaDe(
  fundacion,
  lugar,
  equipo,
  numColab,
  numOfic,
  numTaxis,
  numPasa,
  linkE,
  parrafo1,
  parrafo2,
  parrafo3,
  textoBoton
) {
  $("#fundacion_acerca").html(fundacion);
  $("#lugar_acerca").html(lugar);
  $("#equipo_acerca").html(equipo);
  $("#num_colab_acerca").html(numColab);
  $("#num_oficina_acerca").html(numOfic);
  $("#num_taxis_acerca").html(numTaxis);
  $("#num_pasajero_acerca").html(numPasa);
  $("#link_empresa_acerca").attr("href", linkE);
  $("#parrafo_1").html(parrafo1);
  $("#parrafo_2").html(parrafo2);
  $("#parrafo_3").html(parrafo3);
  $("#link_empresa_acerca").text(textoBoton);
  $("#modalAcercaDe").modal("show");
}

$("#mostrarAcercade").click(function (e) {
  e.preventDefault();
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
  let parrafo1,
    parrafo2,
    parrafo3,
    textoBotonE = "";

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
        parrafo1 = doc.data().parrafo1;
        parrafo2 = doc.data().parrafo2;
        parrafo3 = doc.data().parrafo3;
        textoBotonE = doc.data().textoBoton;
      });
      LlenarModalAcercaDe(
        fundacion,
        lugar,
        equipo,
        num_colaboradores,
        num_oficinas,
        num_taxis,
        num_usuarios,
        link_empresa,
        parrafo1,
        parrafo2,
        parrafo3,
        textoBotonE
      );
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

$("#btn_terminos_uso").click(function (e) {
  e.preventDefault();
  window.open("#!/Terminos", "_blank");
});

$("#btn_aviso_privacidad").click(function (e) {
  e.preventDefault();
  window.open("#!/Politicas", "_blank");
});

//pantalla de ayuda
$("#btn_ayuda_principal").click(function (e) {
  e.preventDefault();
  window.open("#!/Ayuda", "_blank");
});

//Funcion de mostrar mensajes modal
function mostrarModalMensaje(mensajeM, colorTodos, linkImagenCuerpo) {
  $("#cabezaModal").css("background-color", colorTodos);
  $("#textoCuerpoModal").css("color", colorTodos);
  $("#botonAceptarModalM").css("background-color", colorTodos);
  $("#imagenCuerpoM").attr("src", linkImagenCuerpo);
  $("#textoCuerpoModal").html(mensajeM);
  $("#modalMensajesM").modal("show");
}
