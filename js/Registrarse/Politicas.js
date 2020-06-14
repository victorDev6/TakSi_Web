$(document).ready(function () {
  //Nombre de la ventana
  window.document.title = "Politicas";
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

  (function ConsultarP() {
    let numeroTelefono = "";
    let correoSoporte = "";
    db.collection("configuracion")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          numeroTelefono = doc.data().telefono_empresa;
          correoSoporte = doc.data().correo_empresa;
        });
        $("#numeroTelefonoP").html(numeroTelefono);
        $("#correoSoporteP").html(correoSoporte);
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  })();
});
