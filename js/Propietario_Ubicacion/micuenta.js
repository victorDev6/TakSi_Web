//$(document).ready(function () {
/* Conectarse a Firebase*/
try {
	firebase.initializeApp({
		apiKey: "AIzaSyB3Vk0nWljV4KhsfU9Co4qNNE0P_FhIJC4",
		authDomain: "taksi-d543c.firebaseapp.com",
		projectId: "taksi-d543c",
		storageBucket: "taksi-d543c.appspot.com",
	});
} catch (err) {
	if (!/already exists/.test(err.message)) {
		console.error(
			"Se produjo un error de inicialización de Firebase",
			err.stack
		);
	}
}


limpiarModalErrores();

var db = firebase.firestore();
var storageRef = firebase.storage().ref();

// Obtén el usuario con sesión activa
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		//obtener el usuario que accedió. Si no accedió ningún usuario, el valor de currentUser es null:
		var userCurrent = firebase.auth().currentUser;
		//console.log(newPassword);
		if (userCurrent != null) {
			//se obtiene el correo de usuario logeado
			var emailPP = user.email;
			//var emailPP = "perezrobleroleiver15@gmail.com";

			//pasando el parametro correo
			consultarTel(emailPP);
			//consultar telefono
			function consultarTel(emailPP) {
				var tel;
				var idDueño;
				db.collection("reg_prop_prin_web").where("email", "==", emailPP).onSnapshot(function (queryTel) {
					queryTel.forEach(function (docTel) {
						if (docTel.exists) {
							tel = docTel.data().telefono;
							idDueño = docTel.id;
							//llenamos los campos en caso el pago este efectuado
							$("#inputTelefono").val(tel);
							updateTel(idDueño);
						}
					});
				}); //le anexe; por ultimo
			}

			//actulizar telefono
			$("#guardarTelefono").click(function (e) {
				$("#altatelefono").modal("show");
				var mensajeE = "¿Seguro deseas modificar el número de teléfono?";
				document.getElementById("textoModalTel").innerHTML = mensajeE;
				document.getElementById("textoModalTel").style.fontWeight = "bold";
			});

			//modificando el telefono
			function updateTel(idD) {
				$(".acepataraltaTelefonoR").click(function (e) {
					$("#loaderP").addClass("loader"); //CARGANDO LOADER
					$("#altatelefono").modal("hide");
					var cajaT = $("#nuevotelefono").val();
					var dbcollection = db.collection("reg_prop_prin_web").doc(idD);


					return dbcollection.update({
							telefono: cajaT,
						})
						.then(function () {
							console.log("Document successfully updated!");
							$("#nuevotelefono").val("");
							$("#loaderP").removeClass("loader"); //REMOVER LOADER
							document.location.reload();
						})
						.catch(function (error) {
							console.error("Error updating document: ", error);
						});
				});
			}

			//actulizar contraseña se habre el modal
			$("#guardarNuevoPass").click(function (e) {
				$("#updatePass").modal("show");
				var mensajeE = "Seguro deseas cambiar de contraseña?";
				document.getElementById("textoModalUpPass").innerHTML = mensajeE;
				document.getElementById("textoModalUpPass").style.fontWeight = "bold";
			});

			//al confirmar cambio de contraeña y se cierra el modal  para confirmar el cambio
			$(".acepatarUpdPass").click(function (e) {
				$("#updatePass").modal("hide");

				//se manda la verificacion de cambio de contraseña al correo
				var auth = firebase.auth();
				auth.sendPasswordResetEmail(emailPP).then(function () {
					//se habre el modal con la leyenda que se a enviado un correo si fue exitoso el envio del correo
					$("#verificarCorreo").modal("show");
					var mensajeE = "Se te envió un correo de verificación a: " + emailPP;
					document.getElementById("textoModalEnviarCorreo").innerHTML = mensajeE;
					document.getElementById("textoModalEnviarCorreo").style.fontWeight = "bold";

					//al presionar aceptar del modal se cierra el modal y se cierra session
					$(".acepatarEnviarCorreo").click(function (e) {
						$("#verificarCorreo").modal("hide");
						firebase.auth().signOut()
							.then(function () {
								window.location = "../../vistas/Principal/index.html";
							})
							.catch(function (error) {
								console.log(error);
							});
					});
					// Email sent.
				}).catch(function (error) {
					// An error happened.
				});
			});





			var statusPago;
			var placaTaxi;
			var pago;
			let ddmmyyyyInicio;
			let ddmmyyyyFin;
			//consultando a la coleccion "solicitudes_pagos" para imprimir el historial de pago
			db.collection("solicitudes_pagos").where("email", "==", emailPP).onSnapshot(function (queryPagos) {
				var paso = 0;

				if (queryPagos.size == 0) {
					$("#alert-Cuenta").removeClass("d-none");
					$("#alert-Cuenta").addClass("d-block");
					//$(".encierro-Pagos").removeClass(".encierro-Pagos");
					$(".encierroF2").addClass("encierro-Pagos");

				} else {
					$(".encierroF2").removeClass("encierro-Pagos");
				}


				$(".contenedorPGS").empty().prepend(); //limpiar antes de crear
				queryPagos.forEach(function (docP) {
					paso++;
					statusPago = docP.data().estado_pago;
					placaTaxi = docP.data().solicitudes;
					pago = docP.data().opcion_pago;

					//despedasar y consegir el primer parrafo antes del _     GHD-7L-23_200=JaDxBzuVePAPE4uLtyLG>Toyota,
					var str = placaTaxi; //cadena entera
					//separo donde encunentre coma ,
					var despedasarTodo = str.split(",");
					//tamaño de cada array
					var lengt = despedasarTodo.length;

					//RECORREMOS EL ARREGLO
					var contador;
					var cont;
					for (contador = 0; contador < lengt; contador++) {
						//placa con su posicion
						var placs = despedasarTodo[contador];
						//imprime antes de _
						var placa = placs.split("_", 1);
						//imprime antes de =
						var placa_precio = placs.split("=", 1);
						//exprecion pra borrar GHF-3H-34_
						var expresionRegular = new String(placa + "_");
						//de GHF-3H-34_200 solo dejamos 200
						var stringSeparar = new String(placa_precio).split(expresionRegular);
						//convertimos a String
						var nuevoI = String(stringSeparar);
						//le quitamos la ","
						var montoT = nuevoI.slice(1);

						//console.log("placa: " + placa + " :$ " + montoT);

						//FECHA INICIAL
						var timestampfechaIn = docP.data().fecha_inicial_pago;
						var fecha1 = new Date(timestampfechaIn.seconds * 1000);
						var year1 = fecha1.getFullYear(); //Año
						var mes1 = fecha1.getMonth() + 1; //mes
						var diaNumero1 = fecha1.getDate(); //dia
						var hora1 = fecha1.getHours(); //9
						var minutos1 = fecha1.getMinutes(); //23

						var m1es12;
						var ampm1;
						var minutos1;

						if (minutos1 <= 9) {
							minutos1 = "0" + minutos1;
						} else {
							minutos1 = minutos1;
						}
						if (hora1 >= 12) {
							ampm1 = "pm";
						} else {
							ampm1 = "am";
						}
						if (mes1 <= 9) {
							m1es12 = "0" + mes1;
						} else {
							m1es12 = mes1;
						}

						//FECHA INICIAL
						var timestampfechaFn = docP.data().fecha_inicial_pago;
						var fecha2 = new Date(timestampfechaIn.seconds * 1000);
						var year2 = fecha2.getFullYear(); //Año
						var mes2 = fecha2.getMonth() + 1; //mes
						var diaNumero2 = fecha1.getDate(); //dia
						var hora2 = fecha1.getHours(); //9
						var minutos2 = fecha1.getMinutes(); //23

						var m2es12;
						var ampm2;
						var minutos2;

						if (minutos2 <= 9) {
							minutos1 = "0" + minutos2;
						} else {
							minutos1 = minutos2;
						}
						if (hora2 >= 12) {
							ampm2 = "pm";
						} else {
							ampm2 = "am";
						}
						if (mes1 <= 9) {
							m2es12 = "0" + mes1;
						} else {
							m2es12 = mes1;
						}


						//ddmmyyyyInicio = diaNumero1 + "/" + m1es12 + "/" + year1 + " " + hora1 + ":" + minutos1 + " " + ampm1;
						//ddmmyyyyFin    = diaNumero2 + "/" + m2es12 + "/" + year2 + " " + hora2 + ":" + minutos2 + " " + ampm1;

						ddmmyyyyInicio = diaNumero1 + "/" + m1es12 + "/" + year1;
						ddmmyyyyFin = diaNumero2 + "/" + m2es12 + "/" + year2;

						var fecha_In_Fin = ddmmyyyyInicio + " A " + ddmmyyyyFin;

						//console.log(fecha_In_Fin);

						var if_fecha_In_Fin;
						if (statusPago == "Aceptado") {
							if_fecha_In_Fin = fecha_In_Fin;
						}
						if (statusPago == "Rechazado") {
							if_fecha_In_Fin = "No aplica";
						}
						if (statusPago == "Pendiente") {
							if_fecha_In_Fin = "En Proceso";
						}


						$(".contenedorPGS").append('<div class="col-12">\
							<div class="row">\
								<div class="col-12 col-sm-8">\
								<div class="form-group row mb-0">\
								<label class="col-12 col-sm-6 col-md-5  col-lg-4 col-xl-3 col-form-label  text-center text-sm-right labelSbt  pb-0" for="">Estatus pago:</label>\
								<div class="col-12 col-sm-6 col-md-5  col-lg-4 col-xl-3 pl-md-0 pt-0 pb-0">\
								<input type="text" readonly class="form-control-plaintext form-control-sm input-facturacion2 text-center text-sm-left text-md-left color col' + paso + ' pt-0 pb-0" id="" value="' + statusPago + '">\
								</div>\
								</div>\
								</div>\
								<div class="col-12 col-sm-8">\
								<div class="form-group row mb-0">\
								<label class="col-12 col-sm-6 col-md-5  col-lg-4 col-xl-3 col-form-label  text-center text-sm-right labelSbt  pb-0" for="">Placa Taxi:</label>\
								<div class="col-12 col-sm-6 col-md-5  col-lg-4  col-xl-3 pl-md-0 pt-0 pb-0">\
								<input type="text" readonly class="form-control-plaintext form-control-sm input-facturacion2 text-center text-sm-left text-md-left pt-0 pb-0" id="" value="' + placa + '">\
								</div>\
								</div>\
								</div>\
								<div class="col-12 col-sm-8">\
								<div class="form-group row mb-0">\
								<label class="col-12 col-sm-6 col-md-5  col-lg-4 col-xl-3 col-form-label  text-center text-sm-right labelSbt  pb-0" for="">Pago:</label>\
								<div class="col-12 col-sm-6 col-md-5  col-lg-4 col-xl-3 pl-md-0 pt-0 pb-0">\
								<input type="text" readonly class="form-control-plaintext form-control-sm input-facturacion2 text-center text-sm-left text-md-left pt-0 pb-0" id="" value="' + pago + '">\
								</div>\
								</div>\
								</div>\
								<div class="col-12 col-sm-8 col-xl-12">\
								<div class="form-group row mb-0">\
								<label class="col-12 col-sm-6 col-md-5  col-lg-4 col-xl-2 col-form-label  text-center text-sm-right labelSbt  pb-0" for="">Fecha de servicio:</label>\
								<div   class="col-12 col-sm-6 col-md-5  col-lg-4 col-xl-3 pl-md-0 pt-0 pb-0">\
								<input type="text" readonly class="form-control-plaintext form-control-sm input-facturacion2 text-center text-sm-left text-md-left pt-0 pb-0" id="" value="' + if_fecha_In_Fin + '">\
								</div>\
								<label class="col-12 col-sm-6 col-md-5  col-lg-2 col-xl-5 col-form-label  text-center text-sm-right labelSbt pt-2 FontMontoLbl" for="">Monto:</label>\
								<div   class="col-12 col-sm-6 col-md-5  col-lg-2 col-xl-2 pl-md-0 pt-0 pb-0">\
								<input type="text" readonly class="form-control-plaintext form-control-sm input-facturacion2 text-center text-sm-left FontMonto pt-0 pb-0" id="" value="$' + montoT + '">\
								</div>\
								</div>\
								</div>\
								<div class="col-12">\
									<hr>\
								</div>\
								</div>\
								</div>');


						if (statusPago == "Aceptado") {
							$(".col" + paso).removeClass("rechazado");
							$(".col" + paso).addClass("aceptado");
						}
						if (statusPago == "Rechazado") {
							$(".col" + paso).removeClass("aceptado");
							$(".col" + paso).addClass("rechazado");
						}
					}
				});
			});
		}
	} else {} // No user is signed in.
});


/* ---------------------------------------------------- */
/* VISULIZAR LAS CONTRASEÑAS							*/
/*----------------------------------------------------- */
$("#icon-clickM1").click(function () {
	$("#iconM1").toggleClass('fa-eye-slash');

	var input = $("#passM1");
	if (input.attr("type") === "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
});


$("#icon-clickM2").click(function () {
	$("#iconM2").toggleClass('fa-eye-slash');

	var input = $("#passM2");
	if (input.attr("type") === "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	}
});
//});
