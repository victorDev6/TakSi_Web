$(document).ready(function () {
	limpiarModalErrores();
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
	//modal pass
	$("#icon-click-modal").click(function () {
		$("#icon-mod").toggleClass("fa-eye-slash");

		var input = $("#inputContraseñaConf");
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
			//consiguiendo placa con variable de session
			var placaAGR = sessionStorage.placaTaxi;
			var sitioAGR = sessionStorage.sitioTaxi;

			if (userCurrent != null) {
				//se obtiene el correo de usuario logeado
				var emailPInfo = user.email;

				$("#editarchofer1").addClass("descBCHOFER");
				$("#editarchofer2").addClass("descBCHOFER");
				$("#editarchofer3").addClass("descBCHOFER");

				$("#eliminarchofer1").addClass("descBCHOFER");
				$("#eliminarchofer2").addClass("descBCHOFER");
				$("#eliminarchofer3").addClass("descBCHOFER");

				$("editarchofer1").attr("disabled", "disabled");
				$("#editarchofer2").attr("disabled", "disabled");
				$("#editarchofer3").attr("disabled", "disabled");

				$("eliminarchofer1").attr("disabled", "disabled");
				$("eliminarchofer2").attr("disabled", "disabled");
				$("eliminarchofer3").attr("disabled", "disabled");


				//LO QUE PEUE
				(function ConsultaryllenarCampos() {
					var cajaNombre;
					var cajaApellidos;
					var cajaTelefono;
					var cajaCorreo;
					var cajaContrasena;
					let cajaImagen = "";
					var cajacornel
					var idFirebaseCh;
					var idenCH;
					db.collection("choferes").where("placa_taxi", "==", placaAGR).where("dueno", "==", emailPInfo).orderBy("fecha_alta_chofer", "asc")
						.onSnapshot(function (querychoferes) {
							var conuntvariablenumcaja = 0;
							querychoferes.forEach(function (docnumchoferes) {
								conuntvariablenumcaja++;

								if (docnumchoferes.exists) {


									$("#editarchofer" + conuntvariablenumcaja).removeAttr("disabled");
									$("eliminarchofer" + conuntvariablenumcaja).removeAttr("disabled");

									$("#editarchofer" + conuntvariablenumcaja).removeClass("descBCHOFER");
									$("#eliminarchofer" + conuntvariablenumcaja).removeClass("descBCHOFER");

									$("#guardarchofer" + conuntvariablenumcaja).addClass("descBCHOFER");
									$("#guardarchofer" + conuntvariablenumcaja).attr("disabled", "disabled");


									$("#inputNombre" + conuntvariablenumcaja).attr("disabled", "disabled");
									$("#inputApellido" + conuntvariablenumcaja).attr("disabled", "disabled");
									$("#inputTelefono" + conuntvariablenumcaja).attr("disabled", "disabled");
									$("#inputEmail" + conuntvariablenumcaja).attr("disabled", "disabled");
									$("#inputPass" + conuntvariablenumcaja).attr("disabled", "disabled");
									$("#imagenTaxiCH" + conuntvariablenumcaja).attr("disabled", "disabled");

									cajaNombre = docnumchoferes.data().nombre;
									cajaApellidos = docnumchoferes.data().apellidos;
									cajaTelefono = docnumchoferes.data().telefono;
									cajaCorreo = docnumchoferes.data().email;
									cajaImagen = docnumchoferes.data().foto;
									cajacornel = docnumchoferes.data().cont;
									idenCH = docnumchoferes.data().identificador;
									idFirebaseCh = docnumchoferes.id;


									//Omitir solo los diez últimos caracteres @gmail.com
									var correoCaja = cajaCorreo.slice(0, -10) // 'Hola EDt'

									var nombreChofer = $("#inputNombre" + conuntvariablenumcaja).val(cajaNombre);
									var apellidoChofer = $("#inputApellido" + conuntvariablenumcaja).val(cajaApellidos);
									var telefonoChofer = $("#inputTelefono" + conuntvariablenumcaja).val(cajaTelefono);
									var emailChofer = $("#inputEmail" + conuntvariablenumcaja).val(correoCaja);
									var emaiP = $("#inputPass" + conuntvariablenumcaja).val(cajacornel);

									$("#imgSubid_" + conuntvariablenumcaja).attr("src", cajaImagen);
									$("#myspanidfirebaseCH" + conuntvariablenumcaja).text(idFirebaseCh);
									$("#myspanidenCH" + conuntvariablenumcaja).text(idenCH);
								} else {
									console.log("No such document!");
								}
							});
						});
				})();









				var estadoGuardarCH = 0;
				var idGuardarChofer;
				//click al boton guardar chofer
				$(".guardarC").click(function () {
					var idBtnGuardarChofer = this.id;
					//se obtiene el id del boton guardar
					idGuardarChofer = idBtnGuardarChofer;
					//obtener solo el numero del id
					var expresionRegularIdCh = "guardarchofer";
					var arrayDeCadenasIdCh = idBtnGuardarChofer.split(expresionRegularIdCh);
					var nuevoIdCh = String(arrayDeCadenasIdCh);
					var solonumeroIdCh = nuevoIdCh.slice(1);

					var cajaNom = $("#inputNombre" + solonumeroIdCh).val();
					var cajaApe = $("#inputApellido" + solonumeroIdCh).val();
					var cajaTel = $("#inputTelefono" + solonumeroIdCh).val();
					var cajaCor = $("#inputEmail" + solonumeroIdCh).val();
					var cajaCon = $("#inputPass" + solonumeroIdCh).val();
					var cajaImg = $("#imgSubid_" + solonumeroIdCh).attr("src");
					var imAlt = $("#imgSubid_" + solonumeroIdCh).attr("alt");

					var mySpanIdCH = $("#myspanidfirebaseCH" + solonumeroIdCh).text();

					let validarBusqueda = $("#chofer"+solonumeroIdCh).data("bootstrapValidator").validate();
					if (validarBusqueda.isValid()) {
						if (cajaNom != "" && cajaApe != "" && cajaTel != "" && cajaCor != "" && cajaCon != "" && cajaImg != "" && imAlt === "23" || imAlt === "22") {
							$("#altaChofer").modal("show");
						}
					}

					if (estadoGuardarCH === 0 && mySpanIdCH == "id") {
						$("#ingrContraseña").removeClass("d-none");
						$("#ingrContraseña").addClass("d-block");
						var mensajemodalChofer = "Para confirmar alta del chofer: " + solonumeroIdCh + " Ingresa tú contraseña.";
					} else if (estadoGuardarCH === 1 && mySpanIdCH !== "id") {
						$("#ingrContraseña").removeClass("d-block");
						$("#ingrContraseña").addClass("d-none");
						var mensajemodalChofer = "¿Seguro desea modificar los datos?";
					} else if (estadoGuardarCH === 1 && mySpanIdCH === "id") {
						$("#ingrContraseña").removeClass("d-none");
						$("#ingrContraseña").addClass("d-block");
						var mensajemodalChofer = "Para confirmar alta del chofer: " + solonumeroIdCh + " Ingresa tú contraseña.";
					}
					document.getElementById("textoModalAltaC").innerHTML = mensajemodalChofer;
					document.getElementById("textoModalAltaC").style.fontWeight = "bold";
				});


				//click al boton editar
				$(".editarC").click(function (e) {
					var idBtnidFormEditarC;
					idBtnidFormEditarC = e.target.id; //ID BTN => tc1
					//extraer el numero para los dato del select
					var expresionRegularED = "editarchofer";
					var arrayDeCadenas = idBtnidFormEditarC.split(expresionRegularED);
					var nuevoID = String(arrayDeCadenas);
					var solonumero = nuevoID.slice(1);

					//alert("id del form: " + idBtnidFormEditarC + "  " + solonumero);

					//activo los campos Nombre-Apellido-Telefono
					$("#inputNombre" + solonumero).removeAttr("disabled");
					$("#inputApellido" + solonumero).removeAttr("disabled");
					$("#inputTelefono" + solonumero).removeAttr("disabled");

					//desactivo boton Eliminar
					$("#eliminarchofer" + solonumero).attr("disabled", "disabled");
					$("#eliminarchofer" + solonumero).addClass("descBCHOFER");

					//desactivo boton Editar
					$("#editarchofer" + solonumero).attr("disabled", "disabled");
					$("#editarchofer" + solonumero).addClass("descBCHOFER");

					$("#guardarchofer" + solonumero).removeAttr("disabled");
					$("#guardarchofer" + solonumero).removeClass("descBCHOFER");
					//desactivo la imagen
					$("#imagenTaxiCH" + solonumero).removeAttr('disabled');

					estadoGuardarCH = 1;
					//console.log("se agrega valor nuevo valor a estadoGuardar1: " + estadoGuardar1);
				});









				//eliminar chofer
				var idDeleteChofer;
				$(".eliminarC").click(function () {
					var idBtnEliminarChofer = this.id;

					var expresionRegularIdChE = "eliminarchofer";
					var arrayDeCadenasIdChE = idBtnEliminarChofer.split(expresionRegularIdChE);
					var nuevoIdChE = String(arrayDeCadenasIdChE);
					var solonumeroIdChE = nuevoIdChE.slice(1);
					idDeleteChofer = solonumeroIdChE;

					var mySpanIdCHE = $("#myspanidfirebaseCH" + solonumeroIdChE).text();
					var mySpanIdenCHE = $("#myspanidenCH" + solonumeroIdChE).text();

					if (mySpanIdCHE !== "id") {
						$("#deleteChofer").modal("show");
						var mensajemodalChoferDelete = "¿Seguro desea eliminar al chofer?";
						document.getElementById("textoModalDeleteCH").innerHTML = mensajemodalChoferDelete;
						document.getElementById("textoModalDeleteCH").style.fontWeight = "bold";

						//alert("doc: "+mySpanIdCHE+"  iden: "+mySpanIdenCHE);
					}
				});






				//modal bnt confirmar delete chofer
				$(".acepatardeleteChofer").click(function () {
					$("#loaderP").addClass("loader"); //CARGANDO LOADER
					$("#deleteChofer").modal("hide");
					//console.log("id: " + idDeleteChofer);
					var mySpanIdCHE_Ac = $("#myspanidfirebaseCH" + idDeleteChofer).text();
					var mySpanIdenCHE_Ac = $("#myspanidenCH" + idDeleteChofer).text();

					if (mySpanIdCHE_Ac !== "id" && mySpanIdenCHE_Ac !== "iden") {

						var ciudad; //consultar ciudad el propietario pra borrar de ciudad
						db.collection("reg_prop_prin_web").where("email", "==", emailPInfo).onSnapshot(function (queryPropietario) {
							queryPropietario.forEach(function (docDuen) {
								if (docDuen.exists) {
									ciudad = docDuen.data().ciudad;
									//borrar de comitan
									db.collection(ciudad).doc(mySpanIdenCHE_Ac).delete().then(function () {
										console.log("Document successfully deleted!");
									}).catch(function (error) {
										console.error("Error al remover document: ", error);
									});
								}
							});
						});
						//borar de choferes
						db.collection("choferes").doc(mySpanIdCHE_Ac).delete().then(function () {
							console.log("Document successfully deleted!");
							$("#loaderP").removeClass("loader");
							document.location.reload();
						}).catch(function (error) {
							console.error("Error al remover document: ", error);
						});
					}
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
					var mySpanIdCH = $("#myspanidfirebaseCH" + nuermoChofer).text();


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
					var numerosaleatorios1 = NumeroAleatorio(100, 900000);

					//si es 0 es porque se generara un nuevo chofer
					if (estadoGuardarCH == 0) {
						//verificar si existe la coleccion chofer
						db.collection("choferes").get().then(function (querySnapshot) {
							//console.log("TAMAÑO DEL ARREGLO: " + querySnapshot.size);
							if (querySnapshot.size != 0) {
								db.collection("choferes").get().then(function (queryIdentificador) {
									queryIdentificador.forEach(function (docidentificador) {
										if (numerosaleatorios1.toString() == docidentificador.data().identificador) {
											console.log("!Si esta en la BD! :" + numerosaleatorios1.toString());
											//si el identficador ya se encuentra en la bd, se vuelve a ejecutar la variable que crea el identificador para crear otro
											numerosaleatorios1 = NumeroAleatorio(100, 100000);
										} else {
											console.log("!No esta en la BD!: " + numerosaleatorios1.toString());
											//a la variable numeroAleatorio2 se le asigna el valor identificador en forma de cadena
										}
									});
								});
							} else {
								console.log("No EXISTE colleccion CHOFERES Y NO HAY REGISTROS");
							}
						});
					}

					//pedir contraseña
					var cajaP = $("#inputContraseñaConf").val();

					if (estadoGuardarCH == 0) {
						if (cajaP != "") {
							//REAUTENTIFICAR AL USUARIO----------------------------------
							var credentials = firebase.auth.EmailAuthProvider.credential(userCurrent.email, cajaP);
							userCurrent.reauthenticateWithCredential(credentials).then(function () {
								firebase.auth().createUserWithEmailAndPassword(emailcompleto, passwordChofer).then(function (result) {
										$("#loaderP").addClass("loader"); //CARGANDO LOADER
										firebase.auth().signInWithEmailAndPassword(userCurrent.email, cajaP).catch(function (error) {
											var errorCode = error.code;
											var errorMessage = error.message;
										});
										let NumeroAleatorio = numerosaleatorios1.toString();
										SubirImgChofer(apellidoChofer, emailPInfo, correoMinuscula, NumeroAleatorio, nombreChofer, placaAGR, telefonoChofer, passwordChofer);
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
							}).catch(function (error) {
								//console.log("INTENTE NUEVAMENTE, SUS DATOS SON INCORRECTOS");
								$("#datosIncorrectos").modal("show");
								var mensajemodalDatInc = "Dato incorrecto.";
								document.getElementById("textoModalDatosInco").innerHTML = mensajemodalDatInc;
								document.getElementById("textoModalDatosInco").style.fontWeight = "bold";
							});
							//FIN REAUTENTIFICAR AL USUARIO-------------------------------------------------
						}
					} else if (estadoGuardarCH == 1) { //Actualizar datos del chofer
						$("#loaderP").addClass("loader"); //CARGANDO LOADER
						let addIDColleccionCh = db.collection("choferes").doc(mySpanIdCH);
						SubirImgTaxiActualizadaCh(nombreChofer, apellidoChofer, telefonoChofer, addIDColleccionCh);
					}









					/** Funcion para subir imagen a firebase*/
					function SubirImgChofer(ApeCh, emailPInfo, emailMin, numAle, nomCh, placaT, tel, passwordChofer) {
						let imagenASubir = file;
						let uploadTask = storageRef.child("Fotos_Choferes/" + imagenASubir.name).put(imagenASubir);

						uploadTask.on("state_changed", function (snapshot) {
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
									GuardarDatosChofer(downloadURL, ApeCh, emailPInfo, emailMin, numAle, nomCh, placaT, tel, passwordChofer);
								});
							}
						);
					}
					//Funcion que que guarda todos los datos
					function GuardarDatosChofer(urlFotoChofer, ApeCh, emailPInfo, emailMin, numAle, nomCh, placaT, tel, passwordChofer) {
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
								cont: passwordChofer,
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
										console.log("Arreglo successfully updated! al documento:  " + idDocTaxi);
										//window.location = "#!/Informacion";
									});
								});

								//insertando a la coleccion comitan de dominguez
								/*Pienso que aca debe ser dinamico, osea que pasaria si nos vamos a otra ciudad?*/


								var ciudad; //consultar ciudad el propietario pra borrar de ciudad
								db.collection("reg_prop_prin_web").where("email", "==", emailPInfo).onSnapshot(function (queryPropietario) {
									queryPropietario.forEach(function (docDuen) {
										if (docDuen.exists) {
											ciudad = docDuen.data().ciudad;
											//inserta de comitan
											db.collection(ciudad).doc(numAle).set({
													dueño: emailPInfo,
													estado: "offline",
													identificador: numAle,
													rotacion: 0,
													sitio: sitioAGR,
													ubicacion: new firebase.firestore.GeoPoint(0.0, 0.0),
												})
												.then(function () {
													console.log("Registro exitoso: " + ciudad + " : " + emailMin);
													//window.location = "#!/chofer";
													window.location = "#!/Informacion";
													$("#loaderP").removeClass("loader"); //REMOVER LOADER
												})
												.catch(function (error) {
													console.error("Error registro de document: ", error);
												});
										}
									});
								});


								/*
								db.collection("Comitán de Domínguez").doc(numAle).set({
										dueño: emailPInfo,
										estado: "offline",
										identificador: numAle,
										rotacion: 0,
										sitio: sitioAGR,
										ubicacion: new firebase.firestore.GeoPoint(0.0, 0.0),
									})
									.then(function () {
										console.log("Registro exitoso COMITAN DE DOMINGUEZ" + emailMin);
										//window.location = "#!/chofer";
										window.location = "#!/Informacion";
										$("#loaderP").removeClass("loader"); //REMOVER LOADER

									})
									.catch(function (error) {
										console.error("Error registro de document: ", error);
									});*/
							})
							.catch(function (error) {
								console.error("Error registro de document: ", error);
							});
					}




					//FUNCION QUE SUBE LA IMG A STORAGE  --ACTUALIZAR
					function SubirImgTaxiActualizadaCh(nombreChofer, apellidoChofer, telefonoChofer, addIDColleccionCh) {
						let imagenASubir = file;
						let uploadTask = storageRef.child("Fotos_Choferes/" + imagenASubir.name).put(imagenASubir);

						uploadTask.on("state_changed",
							function (snapshot) {
								let progress =
									(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
									actualizarChofer(nombreChofer, apellidoChofer, telefonoChofer, addIDColleccionCh, downloadURL);
								});
							}
						);
					}

					//Funcion que que guarda todos los datos actualizados
					function actualizarChofer(nombreChofer, apellidoChofer, telefonoChofer, addIDColleccionCh, downloadURL) {
						return addIDColleccionCh.update({
								nombre: nombreChofer,
								apellidos: apellidoChofer,
								telefono: telefonoChofer,
								foto: downloadURL,
							})
							.then(function () {
								console.log("Document successfully updated!");
								document.location.reload(); //RECARGAR PAGINA
								//$("#loaderP").removeClass("loader"); //REMOVER LOADER
							})
							.catch(function (error) {
								console.error("Error updating document: ", error);
								$("#loaderP").removeClass("loader"); //REMOVER LOADER
							});
					}



					$("#altaChofer").modal("hide");
				}); //BOTON MODAL








				/******************************INICIA SUBIR IMAGEN******************************************************************/
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
							idClickImg = "imagenTaxiCH" + cadenaPartida[1];
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
				/******************************TERMINA SUBIR IMAGEN******************************************************************/

				//se destruye la variable al regresar
				$("#idRetornarATaxis").click(function () {
					sessionStorage.removeItem("placaTaxi");
					window.location = "#!/Informacion";
				});
			}
		} else {} // No user is signed in.
	});

});
