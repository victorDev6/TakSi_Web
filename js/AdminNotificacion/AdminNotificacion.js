$(document).ready(function () {
  //efecto zoom
  $(".zoom").hover(
    function () {
      $(this).addClass("transition");
    },
    function () {
      $(this).removeClass("transition");
    }
  );
});

/**Iniciamos firebase */
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

function MostrarNotificacion() {
  let formatDate;
  let date;
  let datevalues = [];
  let dateServer, anoServ, mesServ, diaServ, horaServ, minServ;
  let mostrarTiempo;
  let nuevoMensaje = document.getElementById("agregarItemNoti");

  db.collection("solicitudes_pagos")
    .where("estado_pago", "==", "Pendiente")
    .onSnapshot(function (querySnapshot) {
      nuevoMensaje.innerHTML = "";
      querySnapshot.forEach(function (doc) {
        /**Realiza la conversion de fecha */
        try {
          mostrarTiempo = FechaServidor(doc.data().fecha.seconds);
        } catch (error) {
          console.log("No pasa nada");
        }
        nuevoMensaje.innerHTML += `
        <div id="${doc.id}" class="toast mb-4" 
        role="alert" aria-live="assertive" aria-atomic="true"
        data-autohide="false">
            <div class="toast-header">
                <img class="mr-2 imagenPerfil zoom"
                src="../../Diseno/ICONOS/abrirFoto.svg" alt="">
                      <strong class="mr-auto ml-5">
                      <button class="btn btn-sm btn-link" onclick="redirePagos()">
                      ${doc.data().nombre} ${doc.data().apellido}
                      </button>
                      </strong>
                    <small>${mostrarTiempo}</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
            </div>
            <div class="toast-body">
                <p class="mb-0 pb-2 colorRaya"><span class="font-weight-bold">Concepto:</span> <span
                    class="mr-4">Pago de Suscripción ${
                      doc.data().opcion_pago
                    }</span>
                        <span class="font-weight-bold"> Status: </span> 
                        <span>${doc.data().estado_pago}</span></p>
                        <p class="mb-0 pt-1"><span class="font-weight-bold">Ciudad:
                        </span> ${doc.data().ciudad}, ${doc.data().estado} 
                        <span class="font-weight-bold ml-4">Email:
                         </span> ${doc.data().email}</p>
            </div>
        </div>`;
      });
      $(".toast").toast("show");
    });
}
/**Ejecutar Mostrar Notificacion */
MostrarNotificacion();

function FechaServidor(valor) {
  let dias = ["dom", "lun", "mar", "mie", "jue", "vie", "sáb"];
  let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  //Fecha de Servidor
  dateServer = new Date(valor * 1000);
  anoServ = dateServer.getFullYear();
  mesServ = dateServer.getMonth() + 1;
  diaServ = dateServer.getDate();
  horaServ = dateServer.getHours();
  minServ = dateServer.getMinutes();

  //Fecha Local
  dateLocal = new Date();
  anoLocal = dateLocal.getFullYear();
  mesLocal = dateLocal.getMonth() + 1;
  diaLocal = dateLocal.getDate();
  horaLocal = dateLocal.getHours();
  minLocal = dateLocal.getMinutes();
  let fechaImprimir;

  //Validacion Si es mayor a 30
  if (diaLocal >= diaServ && mesLocal >= mesServ) {
    resta = diaLocal - diaServ;
    if (resta >= 30) {
      //Eliminar registro
    }
    if (resta >= 8 && resta <= 29) {
      //17 Marzo a las 4:40
      if (horaServ >= 13) {
        horaServ = horaServ - 12;
        resulH = horaServ + ":" + minServ + " PM";
      } else {
        resulH = horaServ + ":" + minServ + " AM";
      }
      fechaImprimir =
        diaServ + " " + meses[dateServer.getMonth()] + " a las " + resulH;
    }
    if (resta >= 2 && resta <= 7) {
      // Lun a las 2:30 PM
      if (horaServ >= 13) {
        horaServ = horaServ - 12;
        resulH = horaServ + ":" + minServ + " PM";
      } else {
        resulH = horaServ + ":" + minServ + " AM";
      }
      fechaImprimir = dias[dateServer.getUTCDay()] + " a las " + resulH;
    }
    if (resta === 1) {
      //Ayer a las 2:16 PM
      if (horaServ >= 13) {
        horaServ = horaServ - 12;
        resulH = horaServ + ":" + minServ + " PM";
      } else {
        resulH = horaServ + ":" + minServ + " AM";
      }
      fechaImprimir = "Ayer a las " + resulH;
    }
    if (resta === 0) {
      if (horaLocal > horaServ) {
        restaHora = horaLocal - horaServ;
        //horas
        if (restaHora === 1) {
          fechaImprimir = "Hace una hora";
        } else if (restaHora > 1) {
          fechaImprimir = "Hace " + restaHora + " horas";
        }
      } else {
        restaMinuto = minLocal - minServ;
        if (restaMinuto === 1 || restaMinuto === 0) {
          fechaImprimir = "Hace un minuto";
        } else {
          fechaImprimir = "Hace " + restaMinuto + " minutos";
        }
      }
    }
  }
  return fechaImprimir;
}

/*$("#btn_refrescar_noti").click(function (e) {
  e.preventDefault();
  MostrarNotificacion();
});*/

function EliminarNotificacion(id) {
  /* db.collection("notificacion_pagos")
    .doc(id)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
  */
}

function redirePagos() {
  window.location = "#!/VerificarPagos";
}
