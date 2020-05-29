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
	//consiguiendo placa con variable de session
	var placaAGR = sessionStorage.placaTaxi;
	var sitioAGR = sessionStorage.sitioTaxi;


	/* ---------------------------------------------------- */
	/* VISULIZAR LAS CONTRASEÑAS							*/
	/*----------------------------------------------------- */
	$("#icon-click1").click(function () {
		$("#icon1").toggleClass("fa-eye-slash");

		var input = $("#inputPass1");
		if (input.attr("type") === "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});

	$("#icon-click2").click(function () {
		$("#icon2").toggleClass("fa-eye-slash");

		var input = $("#inputPass2");
		if (input.attr("type") === "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});

	$("#icon-click3").click(function () {
		$("#icon3").toggleClass("fa-eye-slash");

		var input = $("#inputPass3");
		if (input.attr("type") === "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});


	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			//obtener el usuario que accedió. Si no accedió ningún usuario, el valor de currentUser es null:
			var userCurrent = firebase.auth().currentUser;
			//console.log(newPassword);
			if (userCurrent != null) {
				//se obtiene el correo de usuario logeado
				var emailPInfo = user.email;



				//LO QUE PEUE
				(function ConsultaryllenarCampos() {
					var cajaNombre;
					var cajaApellidos;
					var cajaTelefono;
					var cajaCorreo;
					var cajaContrasena;
					let cajaImagen = "";
					db.collection("choferes")
						.where("placa_taxi", "==", placaAGR)
						.where("dueno", "==", emailPInfo)
						.orderBy("fecha_alta_chofer", "asc")
						.onSnapshot(function (querychoferes) {
							var conuntvariablenumcaja = 0;
							querychoferes.forEach(function (docnumchoferes) {
								conuntvariablenumcaja++;

								if (docnumchoferes.exists) {
									document.getElementById("inputNombre" + conuntvariablenumcaja).disabled = true;
									document.getElementById("inputApellido" + conuntvariablenumcaja).disabled = true;
									document.getElementById("inputTelefono" + conuntvariablenumcaja).disabled = true;
									document.getElementById("inputEmail" + conuntvariablenumcaja).disabled = true;

									cajaNombre = docnumchoferes.data().nombre;
									cajaApellidos = docnumchoferes.data().apellidos;
									cajaTelefono = docnumchoferes.data().telefono;
									cajaCorreo = docnumchoferes.data().email;
									cajaImagen = docnumchoferes.data().foto;
									//idFirebaseTaxi=docnumtaxi.id;

									//Omitir solo los diez últimos caracteres @gmail.com
									var correoCaja = cajaCorreo.slice(0, -10) // 'Hola EDt'


									//extrallendo valor
									var nombreChofer = (document.getElementById("inputNombre" + conuntvariablenumcaja).value = cajaNombre);
									var apellidoChofer = (document.getElementById("inputApellido" + conuntvariablenumcaja).value = cajaApellidos);
									var telefonoChofer = (document.getElementById("inputTelefono" + conuntvariablenumcaja).value = cajaTelefono);
									var emailChofer = (document.getElementById("inputEmail" + conuntvariablenumcaja).value = correoCaja);
									$("#imgSubida_" + conuntvariablenumcaja).attr("src", cajaImagen);
									//document.getElementById("myspanidfirebase"+ conuntvariable).textContent=idFirebaseTaxi;

								} else {
									console.log("No such document!");
								}
							});
						});
				})();

				var idGuardarChofer;
				$(".guardarC").click(function () {
					$("#altaChofer").modal("show");

					var idBtnGuardarChofer = this.id;
					//se obtiene el id del boton guardar
					idGuardarChofer = idBtnGuardarChofer;

					//obtener solo el numero del id
					var expresionRegularIdCh = "guardarchofer";
					var arrayDeCadenasIdCh = idBtnGuardarChofer.split(expresionRegularIdCh);
					var nuevoIdCh = String(arrayDeCadenasIdCh);
					var solonumeroIdCh = nuevoIdCh.slice(1);

					var mensajemodalChofer =
						"Seguro Deseas dar de Alta al Chofer? " + solonumeroIdCh;
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
					var numeroArregloString = numeroArrglo.toString();

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
						return Math.round(Math.random() * (max - min) + min);
					};
					//se mandan los valores vara crear el numero identificador
					var numerosaleatorios1 = NumeroAleatorio(100, 100000);

					var numeroAleatorio2;

					//verificar si existe la coleccion chofer
					db.collection("choferes").get().then(function (querySnapshot) {
						//console.log("TAMAÑO DEL ARREGLO: " + querySnapshot.size);
						if (querySnapshot.size != 0) {
							console.log("si EXISTE la colleccion CHOFERES Y SI TIENE REGISTROS");
							db.collection("choferes").get().then(function (queryColl) {
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
							});
						} else {
							console.log("No EXISTE colleccion CHOFERES Y NO HAY REGISTROS");
							numeroAleatorio2 = numerosaleatorios1.toString();
						}
					});

					//console.log("ID TAXI: "+idDocTaxi);

					// se crea el usuario en authentication
					firebase.auth().createUserWithEmailAndPassword(emailcompleto, passwordChofer).then(function (result) {
							console.log("se creo el usuario: " + emailcompleto + "contraseña: " + passwordChofer);
							// si se crea el usuario en authentication, entonces tambien se guarda los datos en la colleccion choferes

							/**Aqui tuve que crear una variable y pasarlo a string
							la variable numerosaleatorios1 ya que el numeroAleatorio2
							no me carga, trato de imprimir y dice undefined por eso
							me marcaba error al guardar*/
							let NumeroAleatorio = numerosaleatorios1.toString();
							console.log("Numero aleatorio: " + NumeroAleatorio);
							SubirImgChofer(
								apellidoChofer,
								emailPInfo,
								correoMinuscula,
								NumeroAleatorio,
								nombreChofer,
								placaAGR,
								telefonoChofer
							);
						})
						.catch(function (error) {
							// Handle Errors here.
							var errorCode = error.code;
							var errorMessage = error.message;
							if (errorCode == "auth/email-already-in-use") {
								alert("EL correo ya esta en uso.");
							} else {
								alert(errorMessage);
							}
						});

					$("#altaChofer").modal("hide");
				});

				//se destruye la variable al regresar
				$("#idRetornarATaxis").click(function () {
					sessionStorage.removeItem("placaTaxi");
					window.location = "#!/Informacion";
				});

				/* Funcion lanzada por clase, que extrae el ID de quien lo lanzo, para procesar su imagen de salida*/

				$(".selectorImagen").click(function (e) {
					let idClickImg = ""; //imagenTaxi
					let inImg = ""; //imgSubida
					inImg = e.target.id;
					let cadenaPartida = [];
					switch (inImg) {
						case "" + inImg:
							//inImg = imgSubida1
							cadenaPartida = inImg.split("_");
							idClickImg = "imagenTaxi" + cadenaPartida[1];
							$("#" + idClickImg).click();
							CargarImagenChofer(idClickImg, inImg);
							break;
					}
				});

				/* Se carga la imagen de Perfil en el input correspondiente, unicamente si es un formato válido (png,jpg y jpeg)*/
				var file; //guardara la info de la imagen
				function CargarImagenChofer(idClickImg, inImg) {
					$("#" + idClickImg).change(function () {
						file = $("#" + idClickImg).val(); //imgenTaxi1
						var ext = file.substring(file.lastIndexOf("."));
						//Validar si es un formato valido
						if (
							ext == ".jpg" ||
							ext == ".png" ||
							ext == ".jpeg" ||
							ext == ".JPG" ||
							ext == ".PNG" ||
							ext == ".JPEG"
						) {
							var imgExt = 23;
							if (ext == ".png" || ext == ".PNG") {
								imgExt = 22;
							}

							var preview = document.getElementById(inImg);
							file = document.getElementById(idClickImg).files[0];
							extension_PM = ext; //ext de imagen

							$("#" + inImg).attr("title", file.name);
							$("#" + inImg).attr("alt", imgExt);

							var reader = new FileReader();

							reader.addEventListener(
								"load",
								function () {
									preview.src = reader.result;
									var imagen = preview.src;
									recotarImagen_PM = imagen.slice(imgExt);
								},
								false
							);
							if (file) {
								reader.readAsDataURL(file);
							}
						} else {
							$("#" + inImg).attr(
								"src",
								"../../Diseno/ICONOS/cerrar-sesion-Presionado.svg"
							);
						}
					});
				}

				/** Funcion para subir imagen a firebase*/
				function SubirImgChofer(ApeCh, emailPInfo, emailMin, numAle, nomCh, placaT, tel) {
					let imagenASubir = file;
					let uploadTask = storageRef
						.child("Fotos_Choferes/" + imagenASubir.name)
						.put(imagenASubir);

					uploadTask.on(
						"state_changed",
						function (snapshot) {
							let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
							uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
								//Aqui va el metodo donde se guarda
								GuardarDatosChofer(downloadURL, ApeCh, emailPInfo, emailMin, numAle, nomCh, placaT, tel);
							});
						}
					);
				}

				//Funcion que que guarda todos los datos
				function GuardarDatosChofer(urlFotoChofer, ApeCh, emailPInfo, emailMin, numAle, nomCh, placaT, tel) {
					db.collection("choferes").add({
							apellidos: ApeCh,
							calificacion: "5.0",
							dueno: emailPInfo,
							email: emailMin,
							foto: urlFotoChofer,
							identificador: numAle,
							nombre: nomCh,
							placa_taxi: placaT,
							telefono: tel,
							viajes: 0,
							fecha_alta_chofer: firebase.firestore.FieldValue.serverTimestamp(), //Agrega la fecha directo del servidor
						})
						.then(function (docRef) {
							console.log("Registro exitoso " + emailMin);
							db.collection("taxis").where("placa", "==", placaT).where("correo", "==", emailPInfo).onSnapshot(function (queryidDoc) {
								var idDocTaxi;
								queryidDoc.forEach(function (docIdDoc) {
									idDocTaxi = docIdDoc.id;
									console.log(idDocTaxi);
								});
								let modificarArregloCH = db.collection("taxis").doc(idDocTaxi);
								return modificarArregloCH.update({
									choferes: firebase.firestore.FieldValue.arrayUnion(numAle),
								}).then(function () {
									console.log(
										"Arreglo successfully updated! al documento:  " + idDocTaxi
									);
								});
							});

							//insertando a la coleccion comitan de dominguez
							/*Pienso que aca debe ser dinamico, osea que pasaria si nos vamos a otra ciudad?*/
							db.collection("Comitán de Domínguez").doc(numAle).set({
									dueño: emailPInfo,
									estado: "offline",
									identificador: numAle,
									rotacion: 0,
									sitio: sitioAGR,
									ubicacion: new firebase.firestore.GeoPoint(0.0, 0.0),
								})
								.then(function () {
									console.log("Registro exitoso " + emailMin);
								})
								.catch(function (error) {
									console.error("Error registro de document: ", error);
								});
						})
						.catch(function (error) {
							console.error("Error registro de document: ", error);
						});
				}
			}
		} else {} // No user is signed in.
	});

});
