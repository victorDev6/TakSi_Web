$(document).ready(function () {


	//https://console.cloud.google.com/marketplace/details/google-cloud-platform/customer-identity?authuser=1&project=taksi-d543c
    //Conectarse a Firebase
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
 		})
 	} catch (err) {
 		if (!/already exists/.test(err.message)) {
 			console.error("Se produjo un error de inicialización de Firebase", err.stack)
 		}
 	}
 	var db = firebase.firestore();
	//var emailP;
	var emailP = "perezrobleroleiver15@gmail.com"; //CORREO DEL PROPIETARIO QUE INICIE SESSSION
    //consiguiendo placa
	var placaAGR = sessionStorage.placaTaxi;
	var sitioAGR = sessionStorage.sitioTaxi;



	/* ---------------------------------------------------- */
	/* VISULIZAR LAS CONTRASEÑAS							*/
	/*----------------------------------------------------- */
	$("#icon-click1").click(function () {
		$("#icon1").toggleClass('fa-eye-slash');

		var input = $("#inputPass1");
		if (input.attr("type") === "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});

	$("#icon-click2").click(function () {
		$("#icon2").toggleClass('fa-eye-slash');

		var input = $("#inputPass2");
		if (input.attr("type") === "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});

	$("#icon-click3").click(function () {
		$("#icon3").toggleClass('fa-eye-slash');

		var input = $("#inputPass3");
		if (input.attr("type") === "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});



	/*firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// usuario está logueado.
			emailP = user.email;
			alert("LOGUEADO -->  CORREO: " + emailP);

		}
	});*/


			(function ConsultaryllenarCampos() {
				var cajaNombre;
				var cajaApellidos;
				var cajaTelefono;
				var cajaCorreo;
				var cajaContrasena;
				db.collection("choferes").where("placa_taxi", "==", placaAGR).where("dueno", "==", emailP).orderBy("fecha_alta_chofer", "asc").onSnapshot(function (querychoferes) {
					var conuntvariablenumcaja = 0;
					querychoferes.forEach(function (docnumchoferes) {
						conuntvariablenumcaja++;

						if (docnumchoferes.exists) {

							//$("#tc"+conuntvariable).addClass("clasedesactivarB");
							//$("#editar"+conuntvariable).removeClass("clasedesactivarB");
							//$("#eliminar"+conuntvariable).removeClass("clasedesactivarB");

							//document.getElementById("editar" + conuntvariable).disabled = false;
							//document.getElementById("eliminar" + conuntvariable).disabled = false;

							document.getElementById("inputNombre" + conuntvariablenumcaja).disabled = true;
							document.getElementById("inputApellido" + conuntvariablenumcaja).disabled = true;
							document.getElementById("inputTelefono" + conuntvariablenumcaja).disabled = true;
							document.getElementById("inputEmail" + conuntvariablenumcaja).disabled = true;


							//$("#cajaSitio" + conuntvariable).removeClass("d-none");
							//$("#cajaSitio" + conuntvariable).addClass("d-block");


							cajaNombre = docnumchoferes.data().nombre;
							cajaApellidos = docnumchoferes.data().apellidos;
							cajaTelefono = docnumchoferes.data().telefono;
							cajaCorreo = docnumchoferes.data().email;
							//idFirebaseTaxi=docnumtaxi.id;

							//extrallendo valor
							var nombreChofer = document.getElementById("inputNombre" + conuntvariablenumcaja).value = cajaNombre;
							var apellidoChofer = document.getElementById("inputApellido" + conuntvariablenumcaja).value = cajaApellidos;
							var telefonoChofer = document.getElementById("inputTelefono" + conuntvariablenumcaja).value = cajaTelefono;
							var emailChofer = document.getElementById("inputEmail" + conuntvariablenumcaja).value = cajaCorreo;
							//document.getElementById("myspanidfirebase"+ conuntvariable).textContent=idFirebaseTaxi;

						} else {
							console.log("No such document!");
						}
					})
				});

			})();




			var idGuardarChofer;
			$(".guardarC").click(function () {
				$('#altaChofer').modal('show');

				var idBtnGuardarChofer = this.id;
				//se obtiene el id del boton guardar
				idGuardarChofer = idBtnGuardarChofer;

				//obtener solo el numero del id
				var expresionRegularIdCh = "guardarchofer";
				var arrayDeCadenasIdCh = idBtnGuardarChofer.split(expresionRegularIdCh);
				var nuevoIdCh = String(arrayDeCadenasIdCh);
				var solonumeroIdCh = nuevoIdCh.slice(1)

				var mensajemodalChofer = "Seguro Deseas dar de Alta al Chofer? " + solonumeroIdCh;
				document.getElementById("textoModalAltaC").innerHTML = mensajemodalChofer;
				document.getElementById("textoModalAltaC").style.fontWeight = "bold";
			});



			//modal bnt confirmar alta chofer
			$(".acepataraltaChofer").click(function () {
				//extraer el numero para los dato del select
				var expresionRChofer = "guardarchofer";
				var arrayChofer = idGuardarChofer.split(expresionRChofer);
				var nuevoIChofer = String(arrayChofer);
				var nuermoChofer = nuevoIChofer.slice(1);

				//valor para actualizar en el arreglo choferes de la colleccion taxi
				var numeroArrglo = nuermoChofer - 1;
				var numeroArregloString = numeroArrglo.toString()

				//extrallendo valor
				var nombreChofer = document.getElementById("inputNombre" + nuermoChofer).value;
				var apellidoChofer = document.getElementById("inputApellido" + nuermoChofer).value;
				var telefonoChofer = document.getElementById("inputTelefono" + nuermoChofer).value;
				var emailChofer = document.getElementById("inputEmail" + nuermoChofer).value;
				var passwordChofer = document.getElementById("inputPass" + nuermoChofer).value;
				var emailcompleto = emailChofer + "@gmail.com";
				//se convierte en minuscula el correo
				var correoMinuscula = emailcompleto.toLowerCase();

				//obtener la fecha para guardarlo en firebase
				var hoy = new Date();
				var utcDateChofer = moment(hoy).utc();
				var myDateChofer = utcDateChofer.toDate();


				//verificar si esta el identificador del chofer
				var NumeroAleatorio = function (min, max) {
					return (Math.round(Math.random() * (max - min) + min));
				}
				//se mandan los valores vara crear el numero identificador
				var numerosaleatorios1 = NumeroAleatorio(100, 100000);

				var numeroAleatorio2;

				//verificar si esta el identificador del chofer
				db.collection("choferes").get().then(function (queryIdentificador) {
					queryIdentificador.forEach(function (docidentificador) {
						if (numerosaleatorios1.toString() == docidentificador.data().identificador) {
							console.log("!Si esta en la BD! :" + numerosaleatorios1.toString());
							//si el identficador ya se encuentra en la bd, se vuelve a ejecutar la variable que crea el identificador para crear otro
							numerosaleatorios1 = NumeroAleatorio(100, 100000);
						} else {
							console.log("!No esta en la BD!: " + numerosaleatorios1.toString());
							//a la variable numeroAleatorio2 se le asigna el valor identificador en forma de cadena
							numeroAleatorio2 = numerosaleatorios1.toString();

						}
					});
				});







				//console.log("ID TAXI: "+idDocTaxi);

				// se crea el usuario en authentication
				firebase.auth().createUserWithEmailAndPassword(emailcompleto, passwordChofer)
					.then(function (result) {
						console.log("se creo el usuario: " + emailcompleto + " contraseña: " + passwordChofer);
						// si se crea el usuario en authentication, entonces tambien se guarda los datos en la colleccion choferes
						db.collection("choferes").add({
							apellidos: apellidoChofer,
							calificacion: "5.0",
							dueno: emailP,
							email: correoMinuscula,
							foto: "https://scontent.fmtt1-1.fna.fbcdn.net/v/t1.0-9/p960x960/69790505_2396650170415277_1287301659680047104_o.jpg?_nc_cat=107&_nc_ohc=Ar694t-nuecAX9K8Bp6&_nc_ht=scontent.fmtt1-1.fna&_nc_tp=6&oh=66e0d38b87a57286dad18ea521a13715&oe=5ECA62BD",
							identificador: numeroAleatorio2,
							nombre: nombreChofer,
							placa_taxi: placaAGR,
							telefono: telefonoChofer,
							viajes: 0,
							fecha_alta_chofer: myDateChofer
						}).then(function (docRef) {
							console.log("Registro exitoso " + correoMinuscula);
							//insertando identificador a la coleccion taxi
							db.collection("taxis").where("placa", "==", placaAGR).where("correo", "==", emailP).onSnapshot(function (queryidDoc) {
								var idDocTaxi;
								queryidDoc.forEach(function (docIdDoc) {
									idDocTaxi = docIdDoc.id;
									console.log(idDocTaxi);
								});

								let modificarArregloCH = db.collection("taxis").doc(idDocTaxi);

								return modificarArregloCH.update({
										"choferes": firebase.firestore.FieldValue.arrayUnion(numeroAleatorio2)
									})
									.then(function () {
										console.log("Arreglo successfully updated! al documento:  " + idDocTaxi);
									});
							});

							//insertando a la coleccion comitan de dominguez
							db.collection("Comitán de Domínguez").doc(numeroAleatorio2).set({
									dueño: emailP,
									estado: "offline",
									identificador: numeroAleatorio2,
									rotacion: 0,
									sitio: sitioAGR,
									ubicacion: [new firebase.firestore.GeoPoint(0.0, 0.0)]
								})
								.then(function () {
									console.log("Registro exitoso " + correoMinuscula);
								})
								.catch(function (error) {
									console.error("Error registro de document: ", error);
								});


						}).catch(function (error) {
							console.error("Error registro de document: ", error);
						});
					}).catch(function (error) {
						// Handle Errors here.
						var errorCode = error.code;
						var errorMessage = error.message;
						if (errorCode == 'auth/email-already-in-use') {
							alert('EL correo ya esta en uso.');
						} else {
							alert(errorMessage);
						}
					});

				$('#altaChofer').modal('hide');
			});


			//se destruye la variable al regresar
			$("#idRetornarATaxis").click(function () {
				sessionStorage.removeItem("placaTaxi");
				window.location = "#!/Informacion";
			});






});







