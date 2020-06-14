//$(document).ready(function() {
/************************************************************************* */
/*INICIAMOS FIREBASE
/************************************************************************* */
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
var storageRef = firebase.storage().ref();

/*SE AGREGA UNA VARIABLE DONDE OBTIENE EL VALOR DEL SELECT
SELECCIONADO Y ASI SABER QUE PANTALLA ESTA SOLICITANDO LA
BUSQUEDA FILTRADA
/*********************************************************** */
var valorFunBusqueda = 0;

/************************************************************************* */
/*SE USA PARA VALIDAR QUE BOTON FUE PULSADO Y MOSTRAR LA PANTALLA ADECUADA
/************************************************************************* */
(function () {
  let valor;
  $("#btnMenuSitio").click(function () {
    valor = 1;
    Vswitch(valor);
  });
  $("#btnMenuCiudad").click(function () {
    valor = 2;
    Vswitch(valor);
  });
  $("#btnMenuConsesion").click(function () {
    valor = 3;
    Vswitch(valor);
  });
  $("#btnMenuEstado").click(function () {
    valor = 4;
    Vswitch(valor);
  });
  $("#btnMenuCostoKm").click(function () {
    valor = 5;
    Vswitch(valor);
  });
  $("#btnMenuCodigo").click(function () {
    valor = 6;
    Vswitch(valor);
  });
  $("#btnMenuMarcador").click(function () {
    valor = 7;
    Vswitch(valor);
  });
})();

/********************************************************** */
/*FUNCIONES PARA OCULTAR Y DESOCULTAR TABLA Y PAGINACION
/*********************************************************** */
function ocultarTabla_paginacion() {
  $("#esconderTablaCompleta").addClass("d-none");
  $("#esconderPaginacion").addClass("d-none");
  //Ocultar boton y caja de busqueda filtrada
  $("#ocul_caja_bus_sitio").addClass("d-none");
  $("#ocul_btn_bus_sitio").addClass("d-none");
}
function desocultarTabla_paginacion() {
  $("#esconderTablaCompleta").removeClass("d-none");
  $("#esconderPaginacion").removeClass("d-none");
}

/************************************************************************** */
/*SE VALIDAN PARA MOSTRAR LAS RESPECTIVAS PANTALLAS AL SELECCIONAR UN BOTON
/************************************************************************** */
function Vswitch(valor) {
  let mostrarTituloP;
  switch (valor) {
    /**Sitio */
    case 1:
      $("#btnMenuSitio").addClass("activo_btn");
      $(
        "#btnMenuCiudad, #btnMenuConsesion, #btnMenuEstado, #btnMenuCostoKm, #btnMenuCodigo, #btnMenuMarcador"
      ).removeClass("activo_btn");

      $("#mostrarSitio").removeClass("d-none"); //mostrar pantalla
      $(
        "#mostrarCiudad, #mostrarConsesion, #mostrarEstado, #mostrarCosto, #mostrarCodigo, #mostrarMarcador"
      ).addClass("d-none"); //bloquear las otras pantallas

      /**Mostrar Texto referente a la pantalla */
      mostrarTituloP = document.getElementById("textoM_Pantalla");
      mostrarTituloP.innerHTML = "Agregar / Editar Sitio";

      /**Quitar clase a select ciudad */
      $("#ocultarSelectCd").removeClass("d-none");
      $("#ocultarSelectEdo").removeClass("d-none");

      /**Ver espacio donde estara la tabla */
      $("#ocultarTablaSitio").removeClass("d-none");

      /**Ocultar tabla de Marcador Ubicación */
      ocultarTablaUbicacion();

      /**Ocultar Tabla ciudades */
      ocultarTablaCiudades();

      /**Limpiamos tabla */
      ocultarTabla_paginacion();
      ChangeOpcionesBSitio();
      break;
    /**Ciudad */
    case 2:
      $("#btnMenuCiudad").addClass("activo_btn");
      $(
        "#btnMenuSitio, #btnMenuConsesion, #btnMenuEstado, #btnMenuCostoKm, #btnMenuCodigo, #btnMenuMarcador"
      ).removeClass("activo_btn");

      $("#mostrarCiudad").removeClass("d-none"); //mostrar pantalla
      $(
        "#mostrarSitio, #mostrarConsesion, #mostrarEstado, #mostrarCosto, #mostrarCodigo, #mostrarMarcador"
      ).addClass("d-none"); //bloquear las otras pantallas

      /**Mostrar Texto referente a la pantalla */
      mostrarTituloP = document.getElementById("textoM_Pantalla");
      mostrarTituloP.innerHTML = "Agregar / Editar Ciudad";

      /**Ocultar el select ciudad */
      $("#ocultarSelectCd").addClass("d-none");
      $("#ocultarSelectEdo").removeClass("d-none");

      /**Ver espacio donde estara la tabla */
      $("#ocultarTablaSitio").removeClass("d-none");

      /**Ocultar tabla de Marcador Ubicación */
      ocultarTablaUbicacion();

      ocultarTabla_paginacion();
      ChangeOpcionesBCiudad();
      break;
    /**Consesion */
    case 3:
      $("#btnMenuConsesion").addClass("activo_btn");
      $(
        "#btnMenuSitio, #btnMenuCiudad, #btnMenuEstado, #btnMenuCostoKm, #btnMenuCodigo, #btnMenuMarcador"
      ).removeClass("activo_btn");

      $("#mostrarConsesion").removeClass("d-none"); //mostrar pantalla
      $(
        "#mostrarSitio, #mostrarCiudad, #mostrarEstado, #mostrarCosto, #mostrarCodigo, #mostrarMarcador"
      ).addClass("d-none"); //bloquear las otras pantallas

      /**Mostrar Texto referente a la pantalla */
      mostrarTituloP = document.getElementById("textoM_Pantalla");
      mostrarTituloP.innerHTML = "Agregar / Editar Consesión";

      /**Quitar clase a select ciudad */
      $("#ocultarSelectCd").removeClass("d-none");
      $("#ocultarSelectEdo").removeClass("d-none");

      /**Ver espacio donde estara la tabla */
      $("#ocultarTablaSitio").removeClass("d-none");

      /**Ocultar tabla de Marcador Ubicación */
      ocultarTablaUbicacion();

      /**Ocultar Tabla ciudades */
      ocultarTablaCiudades();

      ocultarTabla_paginacion();
      ChangeOpcionesBConsesion();
      break;
    /**Estado */
    case 4:
      $("#btnMenuEstado").addClass("activo_btn");
      $(
        "#btnMenuSitio, #btnMenuCiudad, #btnMenuConsesion, #btnMenuCostoKm, #btnMenuCodigo, #btnMenuMarcador"
      ).removeClass("activo_btn");

      $("#mostrarEstado").removeClass("d-none"); //mostrar pantalla
      $(
        "#mostrarSitio, #mostrarCiudad, #mostrarConsesion, #mostrarCosto, #mostrarCodigo, #mostrarMarcador"
      ).addClass("d-none"); //bloquear las otras pantallas

      /**Mostrar Texto referente a la pantalla */
      mostrarTituloP = document.getElementById("textoM_Pantalla");
      mostrarTituloP.innerHTML = "Agregar / Editar Estado";

      /**Quitar clase a select ciudad */
      $("#ocultarSelectCd").addClass("d-none");
      $("#ocultarSelectEdo").addClass("d-none");

      /**Ver espacio donde estara la tabla */
      $("#ocultarTablaSitio").removeClass("d-none");

      /**Ocultar tabla de Marcador Ubicación */
      ocultarTablaUbicacion();

      /**Ocultar Tabla ciudades */
      ocultarTablaCiudades();

      ocultarTabla_paginacion();
      ChangeOpcionesBEstado();
      break;
    /**Costo */
    case 5:
      $("#btnMenuCostoKm").addClass("activo_btn");
      $(
        "#btnMenuSitio, #btnMenuCiudad, #btnMenuConsesion, #btnMenuEstado, #btnMenuCodigo, #btnMenuMarcador"
      ).removeClass("activo_btn");

      $("#mostrarCosto").removeClass("d-none"); //mostrar pantalla
      $(
        "#mostrarSitio, #mostrarCiudad, #mostrarEstado, #mostrarCodigo, #mostrarMarcador, #mostrarConsesion"
      ).addClass("d-none"); //bloquear las otras pantallas

      /**Mostrar Texto referente a la pantalla */
      mostrarTituloP = document.getElementById("textoM_Pantalla");
      mostrarTituloP.innerHTML = "Agregar / Editar Costo";

      /**Quitar clase a select ciudad y estado */
      $("#ocultarSelectCd").removeClass("d-none");
      $("#ocultarSelectEdo").removeClass("d-none");

      /**Ver espacio donde estara la tabla */
      $("#ocultarTablaSitio").removeClass("d-none");

      /**Ocultar tabla de Marcador Ubicación */
      ocultarTablaUbicacion();

      /**Ocultar Tabla ciudades */
      ocultarTablaCiudades();

      ocultarTabla_paginacion();
      ChangeOpcionesBCosto();
      break;
    /**Codigo */
    case 6:
      $("#btnMenuCodigo").addClass("activo_btn");
      $(
        "#btnMenuSitio, #btnMenuCiudad, #btnMenuConsesion, #btnMenuEstado, #btnMenuCostoKm, #btnMenuMarcador"
      ).removeClass("activo_btn");

      $("#mostrarCodigo").removeClass("d-none"); //mostrar pantalla
      $(
        "#mostrarSitio, #mostrarCiudad, #mostrarEstado, #mostrarCosto, #mostrarMarcador, #mostrarConsesion"
      ).addClass("d-none"); //bloquear las otras pantallas

      /**Mostrar Texto referente a la pantalla */
      mostrarTituloP = document.getElementById("textoM_Pantalla");
      mostrarTituloP.innerHTML = "Agregar / Editar Codigo de Descuento";

      /**Quitar clase a select ciudad */
      $("#ocultarSelectCd").removeClass("d-none");
      $("#ocultarSelectEdo").removeClass("d-none");

      /**Ver espacio donde estara la tabla */
      $("#ocultarTablaSitio").removeClass("d-none");

      /**Ocultar tabla de Marcador Ubicación */
      ocultarTablaUbicacion();

      /**Ocultar Tabla ciudades */
      ocultarTablaCiudades();

      ocultarTabla_paginacion();
      ChangeOpcionesBCodigo();
      break;
    /**Marcador */
    case 7:
      $("#btnMenuMarcador").addClass("activo_btn");
      $(
        "#btnMenuSitio, #btnMenuCiudad, #btnMenuConsesion, #btnMenuEstado, #btnMenuCostoKm, #btnMenuCodigo"
      ).removeClass("activo_btn");

      $("#mostrarMarcador").removeClass("d-none"); //mostrar pantalla
      $(
        "#mostrarSitio, #mostrarCiudad, #mostrarEstado, #mostrarEstado, #mostrarCodigo, #mostrarConsesion"
      ).addClass("d-none"); //bloquear las otras pantallas

      /**Mostrar Texto referente a la pantalla */
      mostrarTituloP = document.getElementById("textoM_Pantalla");
      mostrarTituloP.innerHTML = "Agregar / Editar Marcador Publicidad";

      /**Quitar clase a select ciudad */
      $("#ocultarSelectCd").removeClass("d-none");
      $("#ocultarSelectEdo").removeClass("d-none");

      /**Ver espacio donde estara la tabla */
      $("#ocultarTablaSitio").removeClass("d-none");

      /**Ocultar Tabla ciudades */
      ocultarTablaCiudades();

      ocultarTabla_paginacion();
      ChangeOpcionesBMarcador();
      break;
    default:
      console.log("No es valido");
      break;
  }
}

/********************************************************** */
/*SE AGREGA UN IMAGEN PARA EL MARCADOR
/*********************************************************** */
/* Funcion lanzada por clase, que extrae el ID de quien lo lanzo, para procesar su imagen de salida*/
var numeroTaxi = "";
var file;
$(document).ready(function () {
  $(".selectorImagen").click(function (e) {
    switch (e.target.id) {
      case "imgSubidaM":
        inImg = e.target.id;
        $("#imagenMarcador").click();
        numeroTaxi = "";
        break;
    }
  });
  /* Se carga la imagen de Perfil si es un formato válido (png,jpg y jpeg)*/
  $("#imagenMarcador").change(function () {
    file = $("#imagenMarcador" + numeroTaxi).val();
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
      var preview = document.getElementById("imgSubidaM" + numeroTaxi);
      file = document.getElementById("imagenMarcador" + numeroTaxi).files[0];
      extension_PM = ext; //ext de imagen

      $("#imgSubidaM" + numeroTaxi).attr("title", file.name);
      $("#imgSubidaM" + numeroTaxi).attr("alt", imgExt);
      var reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          preview.src = reader.result;
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      $("#imgSubidaM" + numeroTaxi).attr(
        "src",
        "../../Diseno/ICONOS/fotoDefault.svg"
      );
    }
  });
}); //docuemento ready

/********************************************************** */
/*SE LLENAN LOS SELECT DE ESTADO Y CIUDAD
/*********************************************************** */
(function ObtenerEdo() {
  let estados = [];
  let $selectEdo = $("#selectEdo_AdminA");
  db.collection("estado_ciudad")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        estados.push(doc.id);
      });
      for (const iterator of estados) {
        $selectEdo.append(
          "<option value=" + iterator + ">" + iterator + "</option>"
        );
      }
    });
  /**Accion que realiza el selectEdo para buscar ciudad*/
  const selectEdo = document.querySelector("#selectEdo_AdminA");
  const selectCd = document.querySelector("#selectCd_AdminA");
  const selSitio = document.getElementById("selectSitio_a");
  selectEdo.addEventListener("change", (event) => {
    selectCd.innerHTML = "";
    selectCd.innerHTML = `<option selected>Ciudad</option>`;
    ObtenerCd(event.target.value);
  });
})();
function ObtenerCd(estado) {
  var obj = [];
  let arrayLibreComa = [];
  let $selectCd = $("#selectCd_AdminA");
  var docRef = db.collection("estado_ciudad").doc(estado);
  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        obj = doc.data();
        obj = Object.values(obj);
        arrayLibreComa = obj.toString().split(",");
        arrayLibreComa.forEach(function (valor, indice, array) {
          $selectCd.append(`<option value="${valor}">${valor}</option>`);
        });
      } else {
        console.log("No enontro el documento");
        $selectCd.append(`<option selected>Ciudad</option>`);
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

/*************************************************************** */
/*SE LLENA EL SELECT DE ACUERDO AL ESTADO Y CIUDAD SELECCIONADOS
/*************************************************************** */
function LlenarSelectSitio() {
  let estado = document.getElementById("selectEdo_AdminA").value;
  let ciudad = document.getElementById("selectCd_AdminA").value;
  let sitios = [];
  let $selectSitio = $("#selectSitio_a");
  db.collection("lineas")
    .where("estado", "==", estado)
    .where("ciudad", "==", ciudad)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        sitios.push(doc.data().nombre);
      });
      sitios.forEach(function (valor, indice, array) {
        $selectSitio.append(`<option value="${valor}">${valor}</option>`);
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
      $selectSitio.append(`<option selected>Sitio</option>`);
    });
}
(function ChangeBuscarSitio() {
  /**Accion que realiza el selectCd para buscar Sitio*/
  const selectCd = document.querySelector("#selectCd_AdminA");
  const selSitio = document.getElementById("selectSitio_a");
  selectCd.addEventListener("change", (event) => {
    selSitio.innerHTML = "";
    selSitio.innerHTML = `<option selected>Sitio</option>`;
    LlenarSelectSitio();
  });
})();

/********************************************************** */
/*AGREGA UN NUEVO SITIO
/*********************************************************** */
$("#btn_agregar_sitio").click(function (e) {
  e.preventDefault();
  AgregarSitio();
});
function AgregarSitio() {
  let nombreSitio = document.getElementById("nombre_sitio_a").value;
  let cd_agregar = document.getElementById("selectCd_AdminA").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;
  db.collection("lineas") //registro_prop_princ_web
    .add({
      estado: edo_agregar,
      ciudad: cd_agregar,
      nombre: nombreSitio,
    })
    .then(function (docRef) {
      console.log("Registro exitoso");
      //Limpia los campos
      document.getElementById("nombre_sitio_a").value = "";
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

/********************************************************** */
/*AGREGA UN NUEVO ESTADO
/*********************************************************** */
$("#btnAgregarEdo").click(function (e) {
  e.preventDefault();
  AgregarEstado();
  document.getElementById("nombre_estado_a").value = "";
});
function AgregarEstado() {
  let nombreEstado = document.getElementById("nombre_estado_a").value;
  var data = {};

  return (output = db.collection("estado_ciudad").doc(nombreEstado).set(data));
}

/********************************************************** */
/*AGREGA UNA NUEVA CIUDAD
/*********************************************************** */
$("#btnAgregarCd").click(function (e) {
  e.preventDefault();
  AgregarCiudad();
});
function AgregarCiudad() {
  let nombreCiudad = document.getElementById("nombre_ciudad_a").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;
  let addCiudad = db.collection("estado_ciudad").doc(edo_agregar);
  // Atomically add a new region to the "regions" array field.
  addCiudad.update({
    Ciudades: firebase.firestore.FieldValue.arrayUnion(nombreCiudad),
  });
  document.getElementById("nombre_ciudad_a").value = "";
}

/********************************************************** */
/*AGREGA FOLIO DE CONSESIÓN
/*********************************************************** */
$("#btnAgregarFolio").click(function (e) {
  e.preventDefault();
  AgregarFolio();
});
function AgregarFolio() {
  let cd_agregar = document.getElementById("selectCd_AdminA").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;
  let nombreUser = document.getElementById("nombre_user_a").value;
  let apellidosUser = document.getElementById("ape_user_a").value;
  let num_consesion = document.getElementById("num_cons_a").value;
  let sitio_usuario = document.getElementById("selectSitio_a").value;
  db.collection("folios_consesion")
    .add({
      estado: edo_agregar,
      ciudad: cd_agregar,
      nombre: nombreUser,
      apellido: apellidosUser,
      folio: num_consesion,
      fecha: firebase.firestore.FieldValue.serverTimestamp(),
      sitio: sitio_usuario,
    })
    .then(function (docRef) {
      console.log("Registro exitoso");
      //Limpia los campos
      document.getElementById("nombre_user_a").value = "";
      document.getElementById("ape_user_a").value = "";
      document.getElementById("num_cons_a").value = "";
      document.getElementById("selectSitio_a").value = "Sitio";
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

/********************************************************** */
/*AGREGA EL COSTO POR KILOMETRO
/*********************************************************** */
$("#btnAgregarCostoKm").click(function (e) {
  e.preventDefault();
  AgregarCostoKm();
});
function AgregarCostoKm() {
  let cd_agregar = document.getElementById("selectCd_AdminA").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;
  let costo_foraneo = document.getElementById("costo_foraneo_a").value;
  let costo_km = document.getElementById("costo_km_a").value;
  let tarifa_base = document.getElementById("tarifa_base_a").value;
  let tarifa_km = document.getElementById("tarifa_km_a").value;

  costo_foraneo = parseInt(costo_foraneo);
  costo_km = parseInt(costo_km);
  tarifa_base = parseInt(tarifa_base);
  tarifa_km = parseInt(tarifa_km);

  db.collection("ciudades_afiliadas")
    .add({
      estado: edo_agregar,
      ciudad: cd_agregar,
      costo_foraneo: costo_foraneo,
      costo_kilometro: costo_km,
      tarifa_base: tarifa_base,
      tarifa_kilometros: tarifa_km,
    })
    .then(function (docRef) {
      console.log("Registro exitoso");
      AgregarNuevaColeccion(cd_agregar);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}
function AgregarNuevaColeccion(nomColeccion) {
  var data = {};
  return (output = db
    .collection(nomColeccion)
    .doc(nomColeccion)
    .set(data)
    .then(function (docRef) {
      console.log("Se creo la nueva colección");

      document.getElementById("costo_foraneo_a").value = "";
      document.getElementById("costo_km_a").value = "";
      document.getElementById("tarifa_base_a").value = "";
      document.getElementById("tarifa_km_a").value = "";
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    }));
}

/********************************************************** */
/*AGREGA CODIGO DE DESCUENTO
/*********************************************************** */
$("#btnAgregarCodigoD").click(function (e) {
  e.preventDefault();
  AgregarCodigoD();
});
function AgregarCodigoD() {
  let cd_agregar = document.getElementById("selectCd_AdminA").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;
  let codigoD = document.getElementById("codigo_descuento_a").value;
  let c_descuento = document.getElementById("c_descuento_a").value;
  let total_usos = document.getElementById("total_usos_a").value;
  c_descuento = parseInt(c_descuento);
  total_usos = parseInt(total_usos);

  db.collection("codigos_descuento")
    .add({
      estado: edo_agregar,
      ciudad: cd_agregar,
      codigo: codigoD,
      descuento: c_descuento,
      usos: total_usos,
    })
    .then(function (docRef) {
      console.log("Registro exitoso");
      //Limpia los campos
      document.getElementById("codigo_descuento_a").value = "";
      document.getElementById("c_descuento_a").value = "";
      document.getElementById("total_usos_a").value = "";
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

/********************************************************** */
/*AGREGA Y ANEXA NUEVO REGISTRO DE MARCADORES
/*********************************************************** */
$("#checkAgregarMarcador").change(function (e) {
  e.preventDefault();
  if ($("#checkAgregarMarcador").prop("checked")) {
    $("#imagenMarcador").prop("disabled", true);
    $("#status_marker").prop("disabled", true);
    $("#telefono_empresa").prop("disabled", true);
    $("#descrip_empresa").prop("disabled", true);
  } else {
    $("#imagenMarcador").prop("disabled", false);
    $("#status_marker").prop("disabled", false);
    $("#telefono_empresa").prop("disabled", false);
    $("#descrip_empresa").prop("disabled", false);
  }
});
$("#btnAgregarMarcadorP").click(function (e) {
  e.preventDefault();
  if ($("#checkAgregarMarcador").prop("checked")) {
    buscarIdMarcador();
  } else {
    GuardarIMG_YDatos();
  }
});
function AgregarMarcadorP(url_img) {
  let cd_agregar = document.getElementById("selectCd_AdminA").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;
  let nom_empresa = document.getElementById("nombre_empresa").value;
  let url_logo = url_img;
  let status_marcador = document.getElementById("status_marker").value;
  let telefono = document.getElementById("telefono_empresa").value;
  let descripcion = document.getElementById("descrip_empresa").value;
  let latitud = document.getElementById("latitud_marker").value;
  let longitud = document.getElementById("longitud_marker").value;
  latitud = parseFloat(latitud);
  longitud = parseFloat(longitud);
  db.collection("marcadores_publicidad")
    .add({
      estado: edo_agregar,
      ciudad: cd_agregar,
      empresa: nom_empresa,
      marker: url_logo,
      status: status_marcador,
      telefono: telefono,
      descripcion: descripcion,
      ubicaciones: [new firebase.firestore.GeoPoint(latitud, longitud)],
    })
    .then(function (docRef) {
      console.log("Registro exitoso");
      //Limpia los campos
      document.getElementById("nombre_empresa").value = "";
      document.getElementById("url_logo").value = "";
      document.getElementById("status_marker").value = "";
      document.getElementById("latitud_marker").value = "";
      document.getElementById("longitud_marker").value = "";
      document.getElementById("telefono_empresa").value = "";
      document.getElementById("descrip_empresa").value = "";
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}
function GuardarIMG_YDatos() {
  var imagenASubir = file;
  var uploadTask = storageRef
    .child("markers_publicidad/" + imagenASubir.name)
    .put(imagenASubir);

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    function (error) {
      // Handle unsuccessful uploads
    },
    function () {
      // Handle successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        AgregarMarcadorP(downloadURL);
      });
    }
  );
}
function AnexarOtroMarcador(idMarcador) {
  let latitud = document.getElementById("latitud_marker").value;
  let longitud = document.getElementById("longitud_marker").value;
  latitud = parseFloat(latitud);
  longitud = parseFloat(longitud);
  let addOtroMarker = db.collection("marcadores_publicidad").doc(idMarcador);
  // Atomically add a new region to the "regions" array field.
  addOtroMarker.update({
    ubicaciones: firebase.firestore.FieldValue.arrayUnion(
      new firebase.firestore.GeoPoint(latitud, longitud)
    ),
  });
  console.log("se anexo nueva ubicacion");
  document.getElementById("latitud_marker").value = "";
  document.getElementById("longitud_marker").value = "";
  document.getElementById("nombre_empresa").value = "";
}
function buscarIdMarcador() {
  let cd_agregar = document.getElementById("selectCd_AdminA").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;
  let nom_empresa = document.getElementById("nombre_empresa").value;
  let idMarcador = "";
  db.collection("marcadores_publicidad")
    .where("estado", "==", edo_agregar)
    .where("ciudad", "==", cd_agregar)
    .where("empresa", "==", nom_empresa.trim())
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        idMarcador = doc.id;
      });
      //Agregar el otro marcador
      AnexarOtroMarcador(idMarcador);
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}

/********************************************************** */
/*TODO RELACIONADO A SITIO (TABLAS, BUSQUEDAS)
/*********************************************************** */
function ChangeOpcionesBSitio() {
  let contenedorSelect = document.getElementById("addSelectOpciones");
  contenedorSelect.innerHTML = "";
  contenedorSelect.innerHTML = `<select class="custom-select" name="" id="select_op_bus_filtado">
                                <option selected>Opcion</option>
                                <option value="1">Busqueda General</option>
                                <option value="2">Busqueda Por Estado y Ciudad</option>
                                <option value="3">Busqueda Por Nombre</option>
                                </select>`;
  let selectOpcionBus_sitio = document.getElementById("select_op_bus_filtado");
  let valorSelect;
  selectOpcionBus_sitio.addEventListener("change", (event) => {
    valorSelect = event.target.value;
    desocultarTabla_paginacion();
    switch (valorSelect) {
      case "1":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        mostrarTablaGeneralSitio();
        break;
      case "2":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        console.log("si entro al 2");
        showTableEdoCdSitio();
        break;
      case "3":
        $("#ocul_caja_bus_sitio").removeClass("d-none");
        $("#ocul_btn_bus_sitio").removeClass("d-none");
        valorFunBusqueda = 1; //se agrega el valor para verificar el switch cual ejecutará
        break;

      default:
        console.log("No selecciono nada");
        break;
    }
  });
}
function mostrarTablaGeneralSitio() {
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Nombre</th>
                                <th class="text-nowrap">Sitio</th>
                                <th class="text-nowrap">Editar</th>
                                <th class="text-nowrap">Eliminar</th>`;
  db.collection("lineas").onSnapshot(function (querySnapshot) {
    tabla.innerHTML = "";
    querySnapshot.forEach(function (doc) {
      tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().nombre}</td>
              <td><button class="btn btn-danger" onclick="eliminarSitioA('${
                doc.id
              }')">Eliminar</button></td>
              <td class="text-nowrap">
               <button class="btn btn-warning" 
               onclick="EditarSitioA('${doc.id}', '${doc.data().estado}', 
               '${doc.data().ciudad}', '${doc.data().nombre}')">Editar
               </button></td></td>
							</tr>`;
    });
    paginacionA();
  });
}
function showTableEdoCdSitio() {
  let cd_agregar = document.getElementById("selectCd_AdminA").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Nombre</th>
                                <th class="text-nowrap">Sitio</th>
                                <th class="text-nowrap">Editar</th>
                                <th class="text-nowrap">Eliminar</th>`;
  db.collection("lineas")
    .where("estado", "==", edo_agregar)
    .where("ciudad", "==", cd_agregar)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().nombre}</td>
              <td><button class="btn btn-danger" onclick="eliminarSitioA('${
                doc.id
              }')">Eliminar</button></td>
              <td class="text-nowrap">
               <button class="btn btn-warning" 
               onclick="EditarSitioA('${doc.id}', '${doc.data().estado}', 
               '${doc.data().ciudad}', '${doc.data().nombre}')">Editar
               </button></td></td>
							</tr>`;
      });
      paginacionA();
    });
}
function showTableNombreSitio() {
  let nombreSitio = document.getElementById("busqueda_nom_filtrada").value;
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Nombre</th>
                                <th class="text-nowrap">Sitio</th>
                                <th class="text-nowrap">Editar</th>
                                <th class="text-nowrap">Eliminar</th>`;
  db.collection("lineas")
    .where("nombre", "==", nombreSitio)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().nombre}</td>
              <td><button class="btn btn-danger" onclick="eliminarSitioA('${
                doc.id
              }')">Eliminar</button></td>
              <td class="text-nowrap">
               <button class="btn btn-warning" 
               onclick="EditarSitioA('${doc.id}', '${doc.data().estado}', 
               '${doc.data().ciudad}', '${doc.data().nombre}')">Editar
               </button></td></td>
							</tr>`;
      });
      paginacionA();
    });
}
function eliminarSitioA(idSitio) {
  db.collection("lineas")
    .doc(idSitio)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}
function EditarSitioA(idSitio, estado, ciudad, nombreSitio) {
  document.getElementById("nombre_sitio_a").value = nombreSitio;
  let botonA = document.getElementById("btn_actualizar_sitio");
  $("#ocultar_caja_btn_editar_sitio").removeClass("d-none");
  $("#ocultar_caja_btn_agregar_sitio").addClass("d-none");

  botonA.onclick = function (e) {
    e.preventDefault();
    let selEstado = document.getElementById("selectEdo_AdminA").value;
    let selCiudad = document.getElementById("selectCd_AdminA").value;
    let nombreSitio = document.getElementById("nombre_sitio_a").value;
    console.log(idSitio);
    let editarSitio = db.collection("lineas").doc(idSitio);
    return editarSitio
      .update({
        estado: selEstado,
        ciudad: selCiudad,
        nombre: nombreSitio,
      })
      .then(function () {
        console.log("Document successfully updated!");
        $("#ocultar_caja_btn_agregar_sitio").removeClass("d-none");
        $("#ocultar_caja_btn_editar_sitio").addClass("d-none");
        document.getElementById("nombre_sitio_a").value = "";
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}

/********************************************************** */
/*TODO RELACIONADO A CONSESIÓN (TABLAS, BUSQUEDAS)
/*********************************************************** */
function ChangeOpcionesBConsesion() {
  let contenedorSelect = document.getElementById("addSelectOpciones");
  contenedorSelect.innerHTML = "";
  contenedorSelect.innerHTML = `<select class="custom-select" name="" id="select_op_bus_filtado">
                                <option selected>Opcion</option>
                                <option value="1">Busqueda General</option>
                                <option value="2">Busqueda Por Estado y Ciudad</option>
                                <option value="3">Busqueda Por Estado, Ciudad y Sitio</option>
                                <option value="4">Busqueda Por Nombre de Usuario</option>
                                </select>`;
  let selectOpcionBus_sitio = document.getElementById("select_op_bus_filtado");
  let valorSelect;
  selectOpcionBus_sitio.addEventListener("change", (event) => {
    valorSelect = event.target.value;
    desocultarTabla_paginacion();
    switch (valorSelect) {
      case "1":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        mostrarTablaGeneralConsesion();
        break;
      case "2":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        showTableEdoCdConsesion();
        break;
      case "3":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        showTableEdoCdSitio_consesion();
        break;

      case "4":
        $("#ocul_caja_bus_sitio").removeClass("d-none");
        $("#ocul_btn_bus_sitio").removeClass("d-none");
        valorFunBusqueda = 3; //se agrega el valor para verificar el switch cual ejecutará
        break;

      default:
        console.log("No selecciono nada");
        break;
    }
  });
}
function mostrarTablaGeneralConsesion() {
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">Nombre</th>
                                <th class="text-nowrap">Apellido</th>
                                <th class="text-nowrap">Folio</th>
                                <th class="text-nowrap">Sitio</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("folios_consesion")
    .orderBy("fecha", "desc")
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().nombre}</td>
              <td class="text-nowrap">${doc.data().apellido}</td>
              <td class="text-nowrap">${doc.data().folio}</td>
              <td class="text-nowrap">${doc.data().sitio}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarConsesionA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarConsesionA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().nombre}', 
              '${doc.data().apellido}', '${doc.data().folio}',
              '${doc.data().sitio}')">Editar
              </button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function showTableEdoCdConsesion() {
  let cd_agregar = document.getElementById("selectCd_AdminA").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;

  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">Nombre</th>
                                <th class="text-nowrap">Apellido</th>
                                <th class="text-nowrap">Folio</th>
                                <th class="text-nowrap">Sitio</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("folios_consesion")
    .where("estado", "==", edo_agregar)
    .where("ciudad", "==", cd_agregar)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().nombre}</td>
              <td class="text-nowrap">${doc.data().apellido}</td>
              <td class="text-nowrap">${doc.data().folio}</td>
              <td class="text-nowrap">${doc.data().sitio}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarConsesionA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarConsesionA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().nombre}', 
              '${doc.data().apellido}', '${doc.data().folio}',
              '${doc.data().sitio}')">Editar
              </button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function showTableEdoCdSitio_consesion() {
  let cd_agregar = document.getElementById("selectCd_AdminA").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;
  let sitio_consesion = document.getElementById("selectSitio_a").value;

  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">Nombre</th>
                                <th class="text-nowrap">Apellido</th>
                                <th class="text-nowrap">Folio</th>
                                <th class="text-nowrap">Sitio</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("folios_consesion")
    .where("estado", "==", edo_agregar)
    .where("ciudad", "==", cd_agregar)
    .where("sitio", "==", sitio_consesion)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().nombre}</td>
              <td class="text-nowrap">${doc.data().apellido}</td>
              <td class="text-nowrap">${doc.data().folio}</td>
              <td class="text-nowrap">${doc.data().sitio}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarConsesionA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarConsesionA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().nombre}', 
              '${doc.data().apellido}', '${doc.data().folio}',
              '${doc.data().sitio}')">Editar
              </button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function showTableNombreConsesion() {
  let nombreCons = document.getElementById("busqueda_nom_filtrada").value;
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">Nombre</th>
                                <th class="text-nowrap">Apellido</th>
                                <th class="text-nowrap">Folio</th>
                                <th class="text-nowrap">Sitio</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("folios_consesion")
    .where("nombre", "==", nombreCons)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().nombre}</td>
              <td class="text-nowrap">${doc.data().apellido}</td>
              <td class="text-nowrap">${doc.data().folio}</td>
              <td class="text-nowrap">${doc.data().sitio}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarConsesionA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarConsesionA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().nombre}', 
              '${doc.data().apellido}', '${doc.data().folio}',
              '${doc.data().sitio}')">Editar
              </button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function eliminarConsesionA(idConsesion) {
  db.collection("folios_consesion")
    .doc(idConsesion)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}
function editarConsesionA(idCons, edo, cd, nom, ape, folio, sitio) {
  document.getElementById("nombre_user_a").value = nom;
  document.getElementById("ape_user_a").value = ape;
  document.getElementById("num_cons_a").value = folio;

  let botonA = document.getElementById("btn_actualizar_consesion");
  $("#ocultar_caja_btn_editar_consesion").removeClass("d-none");
  $("#ocultar_caja_btn_agregar_consesion").addClass("d-none");

  botonA.onclick = function (e) {
    e.preventDefault();
    let selEstado = document.getElementById("selectEdo_AdminA").value;
    let selCiudad = document.getElementById("selectCd_AdminA").value;
    let nombreUser = document.getElementById("nombre_user_a").value;
    let apellidosUser = document.getElementById("ape_user_a").value;
    let folioC = document.getElementById("num_cons_a").value;
    let nomSitio = document.getElementById("selectSitio_a").value;
    let editarConsesion = db.collection("folios_consesion").doc(idCons);
    return editarConsesion
      .update({
        estado: selEstado,
        ciudad: selCiudad,
        nombre: nombreUser,
        apellido: apellidosUser,
        folio: folioC,
        sitio: nomSitio,
      })
      .then(function () {
        console.log("Document successfully updated!");
        $("#ocultar_caja_btn_agregar_consesion").removeClass("d-none");
        $("#ocultar_caja_btn_editar_consesion").addClass("d-none");
        document.getElementById("nombre_user_a").value = "";
        document.getElementById("ape_user_a").value = "";
        document.getElementById("num_cons_a").value = "";
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}

/********************************************************** */
/*TODO RELACIONADO A COSTO KILOMETRO (TABLAS, BUSQUEDAS)
/*********************************************************** */
function ChangeOpcionesBCosto() {
  let contenedorSelect = document.getElementById("addSelectOpciones");
  contenedorSelect.innerHTML = "";
  contenedorSelect.innerHTML = `<select class="custom-select" name="" id="select_op_bus_filtado">
                                <option selected>Opcion</option>
                                <option value="1">Busqueda General</option>
                                <option value="2">Busqueda Por Estado y Ciudad</option>
                                </select>`;
  let selectOpcionBus_sitio = document.getElementById("select_op_bus_filtado");
  let valorSelect;
  selectOpcionBus_sitio.addEventListener("change", (event) => {
    valorSelect = event.target.value;
    desocultarTabla_paginacion();
    switch (valorSelect) {
      case "1":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        mostrarTablaGeneralCosto();
        break;
      case "2":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        mostrarTablaEdoCdCosto();
        break;
      default:
        console.log("No selecciono nada");
        break;
    }
  });
}
function mostrarTablaGeneralCosto() {
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">C_Foraneo</th>
                                <th class="text-nowrap">C_Km</th>
                                <th class="text-nowrap">T_Base</th>
                                <th class="text-nowrap">T_Km</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("ciudades_afiliadas").onSnapshot(function (querySnapshot) {
    tabla.innerHTML = "";
    querySnapshot.forEach(function (doc) {
      tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().costo_foraneo}</td>
              <td class="text-nowrap">${doc.data().costo_kilometro}</td>
              <td class="text-nowrap">${doc.data().tarifa_base}</td>
              <td class="text-nowrap">${doc.data().tarifa_kilometros}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarCostoA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarCostoA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().costo_foraneo}', 
              '${doc.data().costo_kilometro}', '${doc.data().tarifa_base}',
              '${doc.data().tarifa_kilometros}')">Editar
              </button></td>
							</tr>`;
    });
    paginacionA();
  });
}
function mostrarTablaEdoCdCosto() {
  let cd_agregar = document.getElementById("selectCd_AdminA").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">C_Foraneo</th>
                                <th class="text-nowrap">C_Km</th>
                                <th class="text-nowrap">T_Base</th>
                                <th class="text-nowrap">T_Km</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("ciudades_afiliadas")
    .where("estado", "==", edo_agregar)
    .where("ciudad", "==", cd_agregar)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().costo_foraneo}</td>
              <td class="text-nowrap">${doc.data().costo_kilometro}</td>
              <td class="text-nowrap">${doc.data().tarifa_base}</td>
              <td class="text-nowrap">${doc.data().tarifa_kilometros}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarCostoA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarCostoA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().costo_foraneo}', 
              '${doc.data().costo_kilometro}', '${doc.data().tarifa_base}',
              '${doc.data().tarifa_kilometros}')">Editar
              </button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function eliminarCostoA(idCosto) {
  db.collection("ciudades_afiliadas")
    .doc(idCosto)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}
function editarCostoA(idCod, edo, cd, c_for, c_km, ta_b, ta_km) {
  document.getElementById("costo_foraneo_a").value = c_for;
  document.getElementById("costo_km_a").value = c_km;
  document.getElementById("tarifa_base_a").value = ta_b;
  document.getElementById("tarifa_km_a").value = ta_km;

  let botonA = document.getElementById("btn_actualizar_costo");
  $("#ocultar_caja_btn_editar_costo").removeClass("d-none");
  $("#ocultar_caja_btn_agregar_costo").addClass("d-none");

  botonA.onclick = function (e) {
    e.preventDefault();
    let selEstado = document.getElementById("selectEdo_AdminA").value;
    let selCiudad = document.getElementById("selectCd_AdminA").value;
    let costo_foraneo = document.getElementById("costo_foraneo_a").value;
    let costo_km = document.getElementById("costo_km_a").value;
    let tarifa_base = document.getElementById("tarifa_base_a").value;
    let tarifa_km = document.getElementById("tarifa_km_a").value;
    costo_foraneo = parseInt(costo_foraneo);
    costo_km = parseInt(costo_km);
    tarifa_base = parseInt(tarifa_base);
    tarifa_km = parseInt(tarifa_km);
    let editarCosto = db.collection("ciudades_afiliadas").doc(idCod);
    return editarCosto
      .update({
        estado: selEstado,
        ciudad: selCiudad,
        costo_foraneo: costo_foraneo,
        costo_kilometro: costo_km,
        tarifa_base: tarifa_base,
        tarifa_kilometros: tarifa_km,
      })
      .then(function () {
        console.log("Document successfully updated!");
        $("#ocultar_caja_btn_agregar_costo").removeClass("d-none");
        $("#ocultar_caja_btn_editar_costo").addClass("d-none");
        document.getElementById("costo_foraneo_a").value = "";
        document.getElementById("costo_km_a").value = "";
        document.getElementById("tarifa_base_a").value = "";
        document.getElementById("tarifa_km_a").value = "";
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}

/********************************************************** */
/*TODO RELACIONADO A CODIGO DE DESCUENTO (TABLAS, BUSQUEDAS)
/*********************************************************** */
function ChangeOpcionesBCodigo() {
  let contenedorSelect = document.getElementById("addSelectOpciones");
  contenedorSelect.innerHTML = "";
  contenedorSelect.innerHTML = `<select class="custom-select" name="" id="select_op_bus_filtado">
                                <option selected>Opcion</option>
                                <option value="1">Busqueda General</option>
                                <option value="2">Busqueda Por Estado y Ciudad</option>
                                <option value="3">Busqueda Por Codigo</option>
                                <option value="4">Busqueda Por Descuento</option>
                                </select>`;
  let selectOpcionBus = document.getElementById("select_op_bus_filtado");
  let valorSelect;
  selectOpcionBus.addEventListener("change", (event) => {
    valorSelect = event.target.value;
    desocultarTabla_paginacion();
    switch (valorSelect) {
      case "1":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        mostrarTablaGeneralCodigo();
        break;
      case "2":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        mostrarTablaEdoCdCodigo();
        break;
      case "3":
        $("#ocul_caja_bus_sitio").removeClass("d-none");
        $("#ocul_btn_bus_sitio").removeClass("d-none");
        valorFunBusqueda = 4; //busqueda por codigo
        break;
      case "4":
        $("#ocul_caja_bus_sitio").removeClass("d-none");
        $("#ocul_btn_bus_sitio").removeClass("d-none");
        valorFunBusqueda = 5; //busqueda por descuento
        break;
      default:
        console.log("No selecciono nada");
        break;
    }
  });
}
function mostrarTablaGeneralCodigo() {
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">Codigo</th>
                                <th class="text-nowrap">Descuento</th>
                                <th class="text-nowrap">Usos</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("codigos_descuento").onSnapshot(function (querySnapshot) {
    tabla.innerHTML = "";
    querySnapshot.forEach(function (doc) {
      tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().codigo}</td>
              <td class="text-nowrap">${doc.data().descuento}</td>
              <td class="text-nowrap">${doc.data().usos}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarCodigoA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarCodigoA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().codigo}', 
              '${doc.data().descuento}', '${doc.data().usos}')">Editar
              </button></td>
							</tr>`;
    });
    paginacionA();
  });
}
function mostrarTablaEdoCdCodigo() {
  let cd_agregar = document.getElementById("selectCd_AdminA").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">Codigo</th>
                                <th class="text-nowrap">Descuento</th>
                                <th class="text-nowrap">Usos</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("codigos_descuento")
    .where("estado", "==", edo_agregar)
    .where("ciudad", "==", cd_agregar)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().codigo}</td>
              <td class="text-nowrap">${doc.data().descuento}</td>
              <td class="text-nowrap">${doc.data().usos}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarCodigoA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarCodigoA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().codigo}', 
              '${doc.data().descuento}', '${doc.data().usos}')">Editar
              </button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function mostrarTablaBusCodigo() {
  let codigo_des = document.getElementById("busqueda_nom_filtrada").value;
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">Codigo</th>
                                <th class="text-nowrap">Descuento</th>
                                <th class="text-nowrap">Usos</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("codigos_descuento")
    .where("codigo", "==", codigo_des)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().codigo}</td>
              <td class="text-nowrap">${doc.data().descuento}</td>
              <td class="text-nowrap">${doc.data().usos}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarCodigoA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarCodigoA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().codigo}', 
              '${doc.data().descuento}', '${doc.data().usos}')">Editar
              </button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function mostrarTablaBusCodDescuento() {
  let codigo_des = document.getElementById("busqueda_nom_filtrada").value;
  codigo_des = parseInt(codigo_des);
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">Codigo</th>
                                <th class="text-nowrap">Descuento</th>
                                <th class="text-nowrap">Usos</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("codigos_descuento")
    .where("descuento", "==", codigo_des)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().codigo}</td>
              <td class="text-nowrap">${doc.data().descuento}</td>
              <td class="text-nowrap">${doc.data().usos}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarCodigoA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarCodigoA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().codigo}', 
              '${doc.data().descuento}', '${doc.data().usos}')">Editar
              </button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function eliminarCodigoA(idCodigo) {
  db.collection("codigos_descuento")
    .doc(idCodigo)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}
function editarCodigoA(idCod, edo, cd, codigo, desc, uso) {
  document.getElementById("codigo_descuento_a").value = codigo;
  document.getElementById("c_descuento_a").value = desc;
  document.getElementById("total_usos_a").value = uso;

  let botonA = document.getElementById("btnEditarCodigoD");
  $("#ocultar_caja_btn_editar_codigo").removeClass("d-none");
  $("#ocultar_caja_btn_agregar_codigo").addClass("d-none");

  botonA.onclick = function (e) {
    e.preventDefault();
    let selEstado = document.getElementById("selectEdo_AdminA").value;
    let selCiudad = document.getElementById("selectCd_AdminA").value;
    let codigo = document.getElementById("codigo_descuento_a").value;
    let descuento = document.getElementById("c_descuento_a").value;
    let usos = document.getElementById("total_usos_a").value;
    descuento = parseInt(descuento);
    usos = parseInt(usos);
    let editarCodigo = db.collection("codigos_descuento").doc(idCod);
    return editarCodigo
      .update({
        estado: selEstado,
        ciudad: selCiudad,
        codigo: codigo,
        descuento: descuento,
        usos: usos,
      })
      .then(function () {
        console.log("Document successfully updated!");
        $("#ocultar_caja_btn_agregar_codigo").removeClass("d-none");
        $("#ocultar_caja_btn_editar_codigo").addClass("d-none");
        document.getElementById("codigo_descuento_a").value = "";
        document.getElementById("c_descuento_a").value = "";
        document.getElementById("total_usos_a").value = "";
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}

/********************************************************** */
/*TODO RELACIONADO A ESTADO (TABLAS, BUSQUEDAS)
/*********************************************************** */
function ChangeOpcionesBEstado() {
  let contenedorSelect = document.getElementById("addSelectOpciones");
  contenedorSelect.innerHTML = "";
  contenedorSelect.innerHTML = `<select class="custom-select" name="" id="select_op_bus_filtado">
                                <option selected>Opcion</option>
                                <option value="1">Busqueda General</option>
                                <option value="2">Busqueda Por Nombre</option>
                                </select>`;
  let selectOpcionBus = document.getElementById("select_op_bus_filtado");
  let valorSelect;
  selectOpcionBus.addEventListener("change", (event) => {
    valorSelect = event.target.value;
    desocultarTabla_paginacion();
    switch (valorSelect) {
      case "1":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        mostrarTablaGeneralEstado();
        break;
      case "2":
        $("#ocul_caja_bus_sitio").removeClass("d-none");
        $("#ocul_btn_bus_sitio").removeClass("d-none");
        //busqueda por nombre de estado
        valorFunBusqueda = 2;
        break;
      default:
        console.log("No selecciono nada");
        break;
    }
  });
}
function mostrarTablaGeneralEstado() {
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Eliminar</th>`;
  db.collection("estado_ciudad").onSnapshot(function (querySnapshot) {
    tabla.innerHTML = "";
    querySnapshot.forEach(function (doc) {
      tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.id}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarEstadoA('${doc.id}')">Eliminar</button></td>
							</tr>`;
    });
    paginacionA();
  });
}
function mostrarTablaBusNom_edo() {
  let nombreEdo = document.getElementById("busqueda_nom_filtrada").value;
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Eliminar</th>`;
  var busEdo = db.collection("estado_ciudad").doc(nombreEdo);
  busEdo
    .get()
    .then(function (doc) {
      if (doc.exists) {
        tabla.innerHTML = "";
        tabla.innerHTML = `<tr>
							<td class="text-nowrap">${doc.id}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarEstadoA('${doc.id}')">Eliminar</button></td>
							</tr>`;
      } else {
        console.log("No enontro el documento");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}
function eliminarEstadoA(idEdo) {
  db.collection("estado_ciudad")
    .doc(idEdo)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}

/********************************************************** */
/*TODO RELACIONADO A CIUDAD (TABLAS, BUSQUEDAS)
/*********************************************************** */
function ChangeOpcionesBCiudad() {
  let contenedorSelect = document.getElementById("addSelectOpciones");
  contenedorSelect.innerHTML = "";
  contenedorSelect.innerHTML = `<select class="custom-select" name="" id="select_op_bus_filtado">
                                <option selected>Opcion</option>
                                <option value="1">Busqueda General</option>
                                <option value="2">Busqueda Por Estado</option>
                                <option value="3">Busqueda Por Ciudad </option>
                                </select>`;
  let selectOpcionBus = document.getElementById("select_op_bus_filtado");
  let valorSelect;
  selectOpcionBus.addEventListener("change", (event) => {
    valorSelect = event.target.value;
    desocultarTabla_paginacion();
    switch (valorSelect) {
      case "1":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        mostrarTablaGeneralCiudad();
        break;
      case "2":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        //mostrarTablaBusCd_Edo();
        break;
      case "3":
        $("#ocul_caja_bus_sitio").removeClass("d-none");
        $("#ocul_btn_bus_sitio").removeClass("d-none");
        //busqueda por nombre de estado
        valorFunBusqueda = 6;
        break;
      default:
        console.log("No selecciono nada");
        break;
    }
  });
}
function mostrarTablaGeneralCiudad() {
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                           <th class="text-nowrap">Ver Ciudades</th>`;
  db.collection("estado_ciudad").onSnapshot(function (querySnapshot) {
    tabla.innerHTML = "";
    querySnapshot.forEach(function (doc) {
      tabla.innerHTML += `<tr>
       					<td class="text-nowrap">${doc.id}</td>
                 <td class="text-nowrap"><button class="btn btn-success"
                 onclick="verCiudadesA('${doc.id}')">Ver Ciudades</button></td>
       					</tr>`;
    });
  });
}
function verCiudadesA(id) {
  //desocultar tabla ubicación
  $("#ocultarTablaCiudades").removeClass("d-none");
  let datosU;
  let tablaCiudades = document.getElementById("tabla_show_cd");
  let nomEstado = document.getElementById("nom_estado_cd");
  nomEstado.innerHTML = "";
  nomEstado.innerHTML = `<span class="font-weight-bold">Estado:</span> ${id} </br>`;
  let docRef = db.collection("estado_ciudad").doc(id);
  docRef.onSnapshot(function (doc) {
    if (doc.exists) {
      datosU = doc.data().Ciudades;
      tablaCiudades.innerHTML = "";
      datosU.forEach(function (data, index) {
        tablaCiudades.innerHTML += `<tr>
       				<td class="text-nowrap">${data}</td>
               <td class="text-nowrap"><button class="btn btn-danger"
               onclick="eliminarCiudadArray('${id}','${data}')">Eliminar</button></td>
       				</tr>`;
      });
    } else {
      console.log("No enontró el documento");
    }
  });
}
function eliminarCiudadArray(id, data) {
  let eliminarMarcador = db.collection("estado_ciudad").doc(id);
  eliminarMarcador.update({
    Ciudades: firebase.firestore.FieldValue.arrayRemove(data),
  });
}
function ocultarTablaCiudades() {
  $("#ocultarTablaCiudades").addClass("d-none");
}

/********************************************************** */
/*TODO RELACIONADO A AGREGAR MARCADOR (TABLAS, BUSQUEDAS)
/*********************************************************** */
function ChangeOpcionesBMarcador() {
  let contenedorSelect = document.getElementById("addSelectOpciones");
  contenedorSelect.innerHTML = "";
  contenedorSelect.innerHTML = `<select class="custom-select" name="" id="select_op_bus_filtado">
                                <option selected>Opcion</option>
                                <option value="1">Busqueda General</option>
                                <option value="2">Busqueda Por Estado</option>
                                <option value="3">Busqueda Por Empresa</option>
                                </select>`;
  let selectOpcionBus = document.getElementById("select_op_bus_filtado");
  let valorSelect;
  selectOpcionBus.addEventListener("change", (event) => {
    valorSelect = event.target.value;
    desocultarTabla_paginacion();
    switch (valorSelect) {
      case "1":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        mostrarTablaGeneralMarcador();
        break;
      case "2":
        $("#ocul_caja_bus_sitio").addClass("d-none");
        $("#ocul_btn_bus_sitio").addClass("d-none");
        mostrarTablaBusEdoCdMarcador();
        break;
      case "3":
        $("#ocul_caja_bus_sitio").removeClass("d-none");
        $("#ocul_btn_bus_sitio").removeClass("d-none");
        //busqueda por nombre de empresa
        valorFunBusqueda = 6;
        break;
      default:
        console.log("No selecciono nada");
        break;
    }
  });
}
function mostrarTablaGeneralMarcador() {
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">Empresa</th>
                                <th class="text-nowrap">Status</th>
                                <th class="text-nowrap">Telefono</th>
                                <th class="text-nowrap">Descripción</th>
                                <th class="text-nowrap">Ver Ubicacion</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("marcadores_publicidad").onSnapshot(function (querySnapshot) {
    tabla.innerHTML = "";
    querySnapshot.forEach(function (doc) {
      tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().empresa}</td>
              <td class="text-nowrap">${doc.data().status}</td>
              <td class="text-nowrap">${doc.data().telefono}</td>
              <td class="text-nowrap">
              <textarea class="text-justify" rows="2" cols="20">
              ${doc.data().descripcion}</textarea></td>
              <td class="text-nowrap"><button class="btn btn-success" 
              onclick="verUbicacionM('${doc.id}', 
              '${doc.data().empresa}','${doc.data().estado}',
              '${doc.data().ciudad}')">Ver Ubicación</button></td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarMarcadorA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarMarcadorA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().empresa}', 
              '${doc.data().marker}', '${doc.data().status}',
              '${doc.data().telefono}', '${doc.data().descripcion}')">Editar
              </button></td>
							</tr>`;
    });
    paginacionA();
  });
}
function mostrarTablaBusEdoCdMarcador() {
  let cd_agregar = document.getElementById("selectCd_AdminA").value;
  let edo_agregar = document.getElementById("selectEdo_AdminA").value;
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">Empresa</th>
                                <th class="text-nowrap">Status</th>
                                <th class="text-nowrap">Telefono</th>
                                <th class="text-nowrap">Descripción</th>
                                <th class="text-nowrap">Ver Ubicacion</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("marcadores_publicidad")
    .where("estado", "==", edo_agregar)
    .where("ciudad", "==", cd_agregar)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().empresa}</td>
              <td class="text-nowrap">${doc.data().status}</td>
              <td class="text-nowrap">${doc.data().telefono}</td>
              <td class="text-nowrap">
              <textarea class="text-justify" rows="2" cols="20">
              ${doc.data().descripcion}</textarea></td>
              <td class="text-nowrap"><button class="btn btn-success" 
              onclick="verUbicacionM('${doc.id}', 
              '${doc.data().empresa}','${doc.data().estado}',
              '${doc.data().ciudad}')">Ver Ubicación</button></td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarMarcadorA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarMarcadorA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().empresa}', 
              '${doc.data().marker}', '${doc.data().status}',
              '${doc.data().telefono}', '${doc.data().descripcion}')">Editar
              </button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function mostrarTablaBusMarcador_empresa() {
  let nombreEmpresa = document.getElementById("busqueda_nom_filtrada").value;
  let tabla = document.getElementById("tabla_general_b");
  let encabezadoT = document.getElementById("agregarEncabezadoTabla");
  encabezadoT.innerHTML = "";
  encabezadoT.innerHTML = `<th class="text-nowrap">Estado</th>
                                <th class="text-nowrap">Ciudad</th>
                                <th class="text-nowrap">Empresa</th>
                                <th class="text-nowrap">Status</th>
                                <th class="text-nowrap">Telefono</th>
                                <th class="text-nowrap">Descripción</th>
                                <th class="text-nowrap">Ver Ubicacion</th>
                                <th class="text-nowrap">Eliminar</th>
                                <th class="text-nowrap">Editar</th>`;
  db.collection("marcadores_publicidad")
    .where("empresa", "==", nombreEmpresa)
    .onSnapshot(function (querySnapshot) {
      tabla.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().estado}</td>
							<td class="text-nowrap">${doc.data().ciudad}</td>
							<td class="text-nowrap">${doc.data().empresa}</td>
              <td class="text-nowrap">${doc.data().status}</td>
              <td class="text-nowrap">${doc.data().telefono}</td>
              <td class="text-nowrap">
              <textarea class="text-justify" rows="2" cols="20">
              ${doc.data().descripcion}</textarea></td>
              <td class="text-nowrap"><button class="btn btn-success" 
              onclick="verUbicacionM('${doc.id}', 
              '${doc.data().empresa}','${doc.data().estado}',
              '${doc.data().ciudad}')">Ver Ubicación</button></td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarMarcadorA('${doc.id}')">Eliminar</button></td>
              <td class="text-nowrap"><button class="btn btn-warning" 
              onclick="editarMarcadorA('${doc.id}', '${doc.data().estado}', 
              '${doc.data().ciudad}', '${doc.data().empresa}', 
              '${doc.data().marker}', '${doc.data().status}',
              '${doc.data().telefono}', '${doc.data().descripcion}')">Editar
              </button></td>
							</tr>`;
      });
      paginacionA();
    });
}
function eliminarMarcadorA(idMarcador) {
  db.collection("marcadores_publicidad")
    .doc(idMarcador)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}
function editarMarcadorA(idM, edo, cd, empresa, marker, status, tel, descrip) {
  document.getElementById("nombre_empresa").value = empresa;
  document.getElementById("url_logo").value = marker;
  document.getElementById("status_marker").value = status;
  document.getElementById("telefono_empresa").value = tel;
  document.getElementById("descrip_empresa").value = descrip;

  let botonA = document.getElementById("btnEditarMarcadorD");
  $("#ocultar_caja_btn_editar_marcador").removeClass("d-none");
  $("#ocultar_caja_btn_agregar_marcador").addClass("d-none");

  botonA.onclick = function (e) {
    e.preventDefault();
    let selEstado = document.getElementById("selectEdo_AdminA").value;
    let selCiudad = document.getElementById("selectCd_AdminA").value;
    let nomEmpresa = document.getElementById("nombre_empresa").value;
    let marker = document.getElementById("url_logo").value;
    let status = document.getElementById("status_marker").value;
    let telefono = document.getElementById("telefono_empresa").value;
    let descripcion = document.getElementById("descrip_empresa").value;
    let editarMarcador = db.collection("marcadores_publicidad").doc(idM);
    return editarMarcador
      .update({
        estado: selEstado,
        ciudad: selCiudad,
        empresa: nomEmpresa,
        marker: marker,
        status: status,
        telefono: telefono,
        descripcion: descripcion,
      })
      .then(function () {
        console.log("Document successfully updated!");
        $("#ocultar_caja_btn_agregar_marcador").removeClass("d-none");
        $("#ocultar_caja_btn_editar_marcador").addClass("d-none");
        document.getElementById("nombre_empresa").value = "";
        document.getElementById("url_logo").value = "";
        document.getElementById("status_marker").value = "";
        document.getElementById("telefono_empresa").value = "";
        document.getElementById("descrip_empresa").value = "";
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
}
function verUbicacionM(idMarcador, empresa, edo, cd) {
  //desocultar tabla ubicación
  $("#ocultarTablaUbicacion").removeClass("d-none");
  let datosU;
  let tablaMarcador = document.getElementById("tabla_marcador");
  let nomEmpresaM = document.getElementById("nom_empresaMarcador");
  let contadorMarcador = 0;
  nomEmpresaM.innerHTML = "";
  nomEmpresaM.innerHTML = `<span class="font-weight-bold">Estado:</span> ${edo} </br>
                          <span class="font-weight-bold">Ciudad:</span> ${cd} </br>
                          <span class="font-weight-bold">Empresa:</span> ${empresa} </br>`;
  let docRef = db.collection("marcadores_publicidad").doc(idMarcador);
  docRef.onSnapshot(function (doc) {
    if (doc.exists) {
      contadorMarcador = 0;
      datosU = doc.data().ubicaciones;
      tablaMarcador.innerHTML = "";
      datosU.forEach(function (data, index) {
        contadorMarcador += 1;
        tablaMarcador.innerHTML += `<tr>
              <td class="text-nowrap">${contadorMarcador}</td>
							<td class="text-nowrap">${data._lat}</td>
							<td class="text-nowrap">${data._long}</td>
              <td class="text-nowrap"><button class="btn btn-danger" 
              onclick="eliminarUbicacionArray('${idMarcador}','${data._lat}','${data._long}')">Eliminar</button></td>
							</tr>`;
      });
    } else {
      console.log("No enontro el documento");
    }
  });
}
function eliminarUbicacionArray(idM, lat, long) {
  let lat1 = parseFloat(lat);
  let long1 = parseFloat(long);
  let eliminarMarcador = db.collection("marcadores_publicidad").doc(idM);
  eliminarMarcador.update({
    ubicaciones: firebase.firestore.FieldValue.arrayRemove(
      new firebase.firestore.GeoPoint(lat1, long1)
    ),
    //ubicaciones: [new firebase.firestore.GeoPoint(latitud, longitud)]
  });
}
function ocultarTablaUbicacion() {
  $("#ocultarTablaUbicacion").addClass("d-none");
}

/********************************************************** */
/*BUSQUEDAS FILTRADAS DE TODAS LAS TABLAS
/*********************************************************** */
$("#btn_busq_filtrada").click(function (e) {
  e.preventDefault();
  switchEjecutarBusquedas(valorFunBusqueda);
});
function switchEjecutarBusquedas(valorFuncion) {
  /**Ejecuta las funciones de busqueda por filtrado de campo de texto */
  switch (valorFuncion) {
    case 1:
      //Ejecutar busqueda de sitio
      showTableNombreSitio();
      break;
    case 2:
      //Busqueda de estado
      mostrarTablaBusNom_edo();
      break;
    case 3:
      //Ejecutar busqueda de consesion
      showTableNombreConsesion();
      break;
    case 4:
      //Ejecutar busqueda por codigo
      mostrarTablaBusCodigo();
      break;
    case 5:
      //Ejecutar busqueda de codigo por descuento
      mostrarTablaBusCodDescuento();
      break;
    case 6:
      //Ejecutar busqueda de por nombre de empresa en marcador
      mostrarTablaBusMarcador_empresa();
      break;
    default:
      console.log("No se ejecutó nada");
      break;
  }
}

/********************************************************** */
/*PAGINACION PARA TODAS LAS TABLAS
/*********************************************************** */
function paginacionA() {
  /*************************************************************************/
  /**							INICIA PAGINACION 							**/
  /*************************************************************************/
  const rowsPerPage = 3;
  const rows = $("#my-table tbody tr");
  const rowsCount = rows.length;
  const pageCount = Math.ceil(rowsCount / rowsPerPage); // evitar decimales
  //const numbers = $('#numbers');
  //var limpiarLi = document.getElementById('numbers');
  //limpiarLi.innerHTML = "";
  displayRows(1); // Muestra el primer conjunto de filas.

  /**#####################################################################**/
  /**					INICIA PAGINACION CON bootpag.min.js				**/
  /**#####################################################################**/
  $("#pagination-here").bootpag({
    total: pageCount,
    page: 1,
    maxVisible: 3,
    leaps: true,
  });

  //al hacer click en el paginador
  $("#pagination-here").on("page", function (event, num) {
    displayRows(num);
  });

  // función que muestra filas de una página específica.
  function displayRows(index) {
    var start = (index - 1) * rowsPerPage;
    var end = start + rowsPerPage;
    rows.hide(); // Ocultar todas las filas
    rows.slice(start, end).show(); // Muestra las filas adecuadas para esta página.
  }
  /*************************************************************************/
  /**							TERMINA PAGINACION 							**/
  /*************************************************************************/
}
//}); //fin del document
