//APUNTE
//<a ui-sref="choferes" class="btn btn-secondary btn-sm active btn-block m-auto btnAgregarChofer" id="agr' + paso + '" role="button">\
//verificar QUE EL SELECT SALGA DE LA COLLECION LINEA

$(document).ready(function () {

	limpiarModalErrores();







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

	var db = firebase.firestore();
	var storageRef = firebase.storage().ref();

	//document.location.reload();

	firebase.auth().onAuthStateChanged(function (user) {

		if (user) {
			//obtener el usuario que accedió. Si no accedió ningún usuario, el valor de currentUser es null:
			var userCurrent = firebase.auth().currentUser;
			//console.log(newPassword);
			if (userCurrent != null) {

				//sessionStorage.removeItem("co");
				//sessionStorage.removeItem("uno");
				//se obtiene el correo de usuario logeado
				var emailPInfo = user.email;


				function ConsultaryllenarCampos() {
					var cajaTax;
					var cajaChofer;
					var cajaPlac;
					var cajaMrc;
					var cajaModel;
					var cajaNseri;
					var cajaSit;
					var cajaImgTaxi;
					var idFirebaseTaxi;
					var status_pago;
					//db.collection("taxis").where("correo", "==", emailPInfo).orderBy("fecha_alta_taxi", "asc").get().then(function(querytaxis) {
					db.collection("taxis").where("correo", "==", emailPInfo).orderBy("fecha_alta_taxi", "asc").onSnapshot(function (querytaxis) {
						var conuntvariable = 0;
						querytaxis.forEach(function (docnumtaxi) {
							conuntvariable++;
							if (docnumtaxi.exists) {
								$("#tc" + conuntvariable).addClass("clasedesactivarB");
								$("#editar" + conuntvariable).removeClass("clasedesactivarB");
								$("#eliminar" + conuntvariable).removeClass("clasedesactivarB");
								$("#agr" + conuntvariable).removeClass("clasedesactivarB");
								$("#agr" + conuntvariable).removeClass("btnAgregarChoferDesactivado");


								$("#eliminar" + conuntvariable).removeAttr("disabled");
								$("#editar" + conuntvariable).removeAttr("disabled");
								$("#agr" + conuntvariable).removeAttr("disabled");

								$("#tc" + conuntvariable).attr("disabled", "disabled");
								$("#cajaNtaxi" + conuntvariable).attr("disabled", "disabled");
								$("#cajaPlaca" + conuntvariable).attr("disabled", "disabled");
								$("#jacaMarca" + conuntvariable).attr("disabled", "disabled");
								$("#cajaModelo" + conuntvariable).attr("disabled", "disabled");
								$("#cajaNSerie" + conuntvariable).attr("disabled", "disabled");
								$("#cajaSitio" + conuntvariable).attr("disabled", "disabled");
								$("#imagenTaxi" + conuntvariable).attr("disabled", "disabled");

								//Para habilitar de nuevo, el método adecuado es usar .removeAttr()
								//$("#editar").removeAttr('disabled');
								//Para desabilitar de nuevo, el método adecuado es usar .attr("", "");
								// $("#editar"+conuntvariable).removeAttr("disabled");

								$("#selectSitio" + conuntvariable).removeClass("d-block");
								$("#selectSitio" + conuntvariable).addClass("d-none");
								$("#cajaSitio" + conuntvariable).removeClass("d-none");
								$("#cajaSitio" + conuntvariable).addClass("d-block");

								cajaTax = docnumtaxi.data().numero;
								cajaPlac = docnumtaxi.data().placa;
								cajaMrc = docnumtaxi.data().marca;
								cajaModel = docnumtaxi.data().modelo;
								cajaSit = docnumtaxi.data().sitio;
								cajaNseri = docnumtaxi.data().numero_serie;
								cajaImgTaxi = docnumtaxi.data().foto_taxi;
								status_pago = docnumtaxi.data().status_pago;
								idFirebaseTaxi = docnumtaxi.id;


								//limpio todo antes de llenar
								$('#notaxi' + conuntvariable).empty();
								//$('#notaxi' + conuntvariable).append("");
								if (status_pago == "false") {
									//ocultamos el formulario en caso el pago No este efectuado
									$("#cajaH" + conuntvariable).removeClass("d-block");
									$("#cajaHH" + conuntvariable).removeClass("d-block");
									$("#cajaHHH" + conuntvariable).removeClass("d-block");

									$("#cajaH" + conuntvariable).addClass("d-none");
									$("#cajaHH" + conuntvariable).addClass("d-none");
									$("#cajaHHH" + conuntvariable).addClass("d-none");

									//mostramos la leyenda
									$("#notaxi" + conuntvariable).removeClass("d-none");
									$("#notaxi" + conuntvariable).addClass("d-block");

									//se llena la leyenda bloqueada de los taxis que no han echo el pago con el sig texto
									var leyendaTaxi = '<a class="btn btn-sm active btn-block redirecpagos" id="numetaxiApagosTaxi">Verifique el pago de su taxi <strong>#' + cajaTax + '</strong></a>';
									$('#notaxi' + conuntvariable).append(leyendaTaxi);
								} else {
									//llenamos los campos en caso el pago este efectuado
									$("#cajaNtaxi" + conuntvariable).val(cajaTax);
									$("#cajaPlaca" + conuntvariable).val(cajaPlac);
									$("#jacaMarca" + conuntvariable).val(cajaMrc);
									$("#cajaModelo" + conuntvariable).val(cajaModel);
									$("#cajaNSerie" + conuntvariable).val(cajaNseri);
									$("#cajaSitio" + conuntvariable).val(cajaSit);
									$("#imgSubida_" + conuntvariable).attr("src", cajaImgTaxi);
									$("#myspanidfirebase" + conuntvariable).text(idFirebaseTaxi);
									$("#myspanplaca" + conuntvariable).text(cajaPlac);




									//mostramos el formulario en caso el pago este efectuado
									$("#cajaH" + conuntvariable).removeClass("d-none");
									$("#cajaHH" + conuntvariable).removeClass("d-none");
									$("#cajaHHH" + conuntvariable).removeClass("d-none");

									$("#cajaH" + conuntvariable).addClass("d-block");
									$("#cajaHH" + conuntvariable).addClass("d-block");
									$("#cajaHHH" + conuntvariable).addClass("d-block");

									//ocultamos la leyenda
									$("#notaxi" + conuntvariable).removeClass("d-block");
									$("#notaxi" + conuntvariable).addClass("d-none");
								}

							} else {
								console.log("No such document!");
							}
							//pintar los iconos de los choferes si esque lo hay
							var vari = conuntvariable;
							db.collection("choferes").where("placa_taxi", "==", docnumtaxi.data().placa).where("dueno", "==", emailPInfo).onSnapshot(function (count) {
								var conuntc = 0;
								count.forEach(function (docnumchoferes) {
									conuntc++;
									$(".iconochofer" + conuntc + vari).addClass("iconochoferesC");
									$(".iconochofer" + conuntc + vari).removeClass("iconochoferesS");
								});
							});
						});

						//Reedirecciona al Modulo de Pagos
						$(".redirecpagos").click(function (e) {
							e.preventDefault();
							window.location = "#!/Pagos";
						});


					});
				}


				var numtaxisaltas;
				var idDocumento;
				var paso;
				db.collection("reg_prop_prin_web").where("email", "==", emailPInfo).onSnapshot(function (queryNumtaxi) {
					queryNumtaxi.forEach(function (docnumtaxi) {
						numtaxisaltas = docnumtaxi.data().num_taxis;
						idDocumento = docnumtaxi.id; //id colleccion dueño
						$(".container").empty().prepend(); //limpiar antes de crear


						for (paso = 1; paso <= numtaxisaltas; paso++) {
							$(".container").append('<div class="">\
			<form id="form' + paso + '" class="pt-2 tc' + paso + '" action="javascript:void(0)">\
			<div class="row encierroI p-2">\
				<div class="col-12  col-sm-12  col-md-8 col-lg-8  p-1 taxis" id="cajaH' + paso + '">\
					<div class="row  justify-content-center align-items-center taxx">\
						<span class="titulos">TAXI # ' + paso + ' <img class="iconotaxi"></span>\
					</div>\
					<div class="row pl-4 pr-4">\
						<div class="col-6 col-lg-6">\
							<div class="form-group row mb-0 pb-1">\
								<label for="" class="col-12  col-sm-12  col-md-4  col-lg-3   col-form-label  text-center text-md-right px-0 subtitulo">N° Taxi:</label>\
								<div class="col-12  col-sm-12  col-md-8  col-lg-9">\
									<input type="text" class="form-control form-control-sm" id="cajaNtaxi' + paso + '" name="cajaNtaxi' + paso + '" placeholder="Ingrese No de Taxi..">\
								</div>\
							</div>\
							<div class="form-group row mb-0 pb-1">\
								<label for="" class="col-12  col-sm-12  col-md-4  col-lg-3  col-form-label  text-center text-md-right px-0 subtitulo">Placa:</label>\
								<div class="col-12  col-sm-12  col-md-8  col-lg-9">\
									<input type="text" class="form-control form-control-sm" id="cajaPlaca' + paso + '" name="cajaPlaca' + paso + '" placeholder="Ingrese la Placa..">\
								</div>\
							</div>\
							<div class="form-group row mb-0 pb-1">\
								<label for="" class="col-12  col-sm-12   col-md-4	col-lg-3  col-form-label  text-center text-md-right px-0 subtitulo">Marca:</label>\
								<div class="col-12  col-sm-12   col-md-8  col-lg-9">\
									<input type="text" class="form-control form-control-sm" id="jacaMarca' + paso + '" name="jacaMarca' + paso + '" placeholder="Ingrese la Marca..">\
								</div>\
							</div>\
							<div class="form-group row mb-0 pb-1">\
								<label for="" class="col-12  col-sm-12   col-md-4   col-lg-3   col-form-label  text-center text-md-right px-0 subtitulo">Modelo:</label>\
								<div class="col-12  col-sm-12  col-md-8  col-lg-9">\
									<input type="text" class="form-control form-control-sm" id="cajaModelo' + paso + '" name="cajaModelo' + paso + '" placeholder="Ingrese el Modelo..">\
								</div>\
							</div>\
						</div>\
							<div class="col-6 col-lg-6">\
								<div class="form-group row mb-0 pb-1">\
								<label for="" class="col-12  col-sm-12   col-md-4   col-lg-3   col-form-label  text-center text-md-right px-0 subtitulo">No. Serie:</label>\
								<div class="col-12  col-sm-12  col-md-8  col-lg-9">\
									<input type="text" class="form-control form-control-sm" id="cajaNSerie' + paso + '" name="cajaNSerie' + paso + '" placeholder="Ingrese No de Serie..">\
								</div>\
							</div>\
							<div class="form-group row mb-0 pb-1">\
								<label for="" class="col-12   col-sm-12   col-md-4   col-lg-3    col-form-label  text-center text-md-right px-0 subtitulo">Sitio:</label>\
								<div class="col-12 col-sm-12 col-md-8  col-lg-9">\
									<select class="form-control form-control-sm d-block selectLinea" name="selectSitio' + paso + '" id="selectSitio' + paso + '">\
									<option value="-1" selected>Seleccionar Sitio</option>\
									</select>\
									<input type="text" class="form-control form-control-sm d-none" id="cajaSitio' + paso + '" disabled>\
								</div>\
							</div>\
							<div class="form-group row mb-0 pt-1 justify-content-center align-items-center">\
								<div class=" offset-md-3">\
									<input type="file"  accept=".png, .jpg, .jpeg" id="imagenTaxi' + paso + '" name="imagenTa' + paso + '" class="d-none">\
									<img class="selectorImagen imgSubida_estilo" id="imgSubida_' + paso + '"  src="">\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="col-12  col-sm-12  col-md-1 col-lg-1  p-1 pt-md-4 cuatro" id="cajaHHH' + paso + '">\
					<div class="row justify-content-center align-items-center p-1 pt-md-4">\
						<div class="col-4 col-sm-4 col-md-12 col-lg-8 pb-md-4">\
							<button class="btn guardar d-block m-auto" id="tc' + paso + '"></button>\
						</div>\
						<div class="col-4 col-sm-4  col-md-12 col-lg-8 pb-md-4">\
							<button class="btn editar d-block m-auto" id="editar' + paso + '" ></button>\
						</div>\
						<div class="col-4 col-sm-4  col-md-12 col-lg-8">\
							<button class="btn eliminar d-block m-auto" id="eliminar' + paso + '" ></button>\
						</div>\
					</div>\
				</div>\
				<div class="col-12  col-sm-12  col-md-3  col-lg-3" id="cajaHH' + paso + '">\
					<div class="row  justify-content-center align-items-center titulochof">\
						<span class="titulos">CHOFERES</span>\
					</div>\
					<div class="form-group row justify-content-center align-items-center pt-md-4">\
						<div class="col-3 col-sm-4  col-md-4 pb-sm-4 pb-md-0  pt-md-0 ">\
							<img class="iconochoferesS iconochofer1' + paso + '  d-block m-auto" id="">\
						</div>\
						<div class="col-3 col-sm-4  col-md-4 pb-sm-4 pb-md-0">\
							<img class="iconochoferesS iconochofer2' + paso + '  d-block m-auto" id="">\
						</div>\
						<div class="col-3 col-sm-4  col-md-4 pb-sm-4 pb-md-0">\
							<img class="iconochoferesS iconochofer3' + paso + '  d-block m-auto" id="">\
						</div>\
					</div>\
					<div class="row justify-content-center align-items-center mt-2">\
						<div class="p-1 col-12" id="agrd' + paso + '">\
							<a class="btn btn-secondary btn-sm active btn-block m-auto btnAgregarChofer disable-links" id="agr' + paso + '" role="button">\
								<span class="fas fa-plus float-right pr-4 Ipropietario" id="agrsp' + paso + '"></span>Agregar\
							</a>\
						</div>\
					</div>\
					<span class="d-none" id="myspanidfirebase' + paso + '">id</span>\
					<span class="d-none" id="myspanplaca' + paso + '">placa</span>\
				</div>\
				<div class="alert alert-secondary d-none p-2 m-auto " role="alert" id="notaxi' + paso + '">\
		    	</div>\
			</div>\
		</form>\
	</div>');
							$("#editar" + paso).addClass("clasedesactivarB");
							$("#eliminar" + paso).addClass("clasedesactivarB");
							$("#agr" + paso).addClass("clasedesactivarB");
							$("#agr" + paso).addClass("btnAgregarChoferDesactivado");

							$("#eliminar" + paso).attr("disabled", "disabled");
							$("#editar" + paso).attr("disabled", "disabled");
							$("#agr" + paso).attr("disabled", "disabled");



						}

						ConsultaryllenarCampos();




						//VALIDACION DEL FORMULARIO TAXI 1
						$("#form1").bootstrapValidator({
								message: "Este valor no es valido",
								fields: {
									cajaNtaxi1: {
										validators: {
											notEmpty: {
												message: "El campo No Taxi no contiene datos",
											},
											regexp: {
												regexp: /^([0-9])+$/,
												message: "Campo No Taxi solo acepta números",
											},
										},
									},

									cajaPlaca1: {
										validators: {
											notEmpty: {
												message: "El campo Placa no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Placa solo debe contener letras y numeros",
											},
										},
									},

									jacaMarca1: {
										validators: {
											notEmpty: {
												message: "El campo Marca no contiene datos",
											},
											regexp: {
												regexp: /^([a-zA-ZáéíóúÁÉÍÓÚ ])+$/,
												message: "Campo Mmarca solo debe contener letras",
											},
										},
									},

									cajaModelo1: {
										validators: {
											notEmpty: {
												message: "El campo Modelo no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Modelo solo debe contener letras y numeros",
											},
										},
									},

									cajaNSerie1: {
										validators: {
											notEmpty: {
												message: "El campo No Serie no contiene datos",
											},
										},
									},

									selectSitio1: {
										validators: {
											callback: {
												message: 'Seleccione una opción del campo sitio',
												callback: function (value, validator, $field) {
													var value = validator.getFieldElements('selectSitio1').val();
													return (value != null && value != -1);
												},
											},
										},
									},

									imagenTaxi1: {
										validators: {
											notEmpty: {
												message: "Seleccione una imagen",
											},
										},
									},

								},
							})
							.on("error.field.bv", function (e, data) {
								var messages = data.bv.getMessages(data.element);
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								$("#showErrors").show();
								for (var i in messages) {
									// Create new 'li' element to show the message
									$("<li/>")
										.attr("data-field", data.field)
										.wrapInner(
											$("<a/>")
											.attr("href", "javascript: void(0);")
											.html(messages[i])
											.on("click", function (e) {
												// Focus on the invalid field
												data.element.focus();
											})
										)
										.appendTo("#errors");
								}
								data.element
									.data("bv.messages")
									.find('.help-block[data-bv-for="' + data.field + '"]')
									.hide();
							})
							.on("success.field.bv", function (e, data) {
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								if ($("ul#errors li").length == 0) {
									$("#showErrors").hide();
								}
							});

						//VALIDACION DEL FORMULARIO TAXI 2
						$("#form2").bootstrapValidator({
								message: "Este valor no es valido",
								fields: {
									cajaNtaxi2: {
										validators: {
											notEmpty: {
												message: "El campo No Taxi no contiene datos",
											},
											regexp: {
												regexp: /^([0-9])+$/,
												message: "Campo No Taxi solo acepta números",
											},
										},
									},

									cajaPlaca2: {
										validators: {
											notEmpty: {
												message: "El campo Placa no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Placa solo debe contener letras y numeros",
											},
										},
									},

									jacaMarca2: {
										validators: {
											notEmpty: {
												message: "El campo Marca no contiene datos",
											},
											regexp: {
												regexp: /^([a-zA-ZáéíóúÁÉÍÓÚ ])+$/,
												message: "Campo Mmarca solo debe contener letras",
											},
										},
									},

									cajaModelo2: {
										validators: {
											notEmpty: {
												message: "El campo Modelo no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Modelo solo debe contener letras y numeros",
											},
										},
									},

									cajaNSerie2: {
										validators: {
											notEmpty: {
												message: "El campo No Serie no contiene datos",
											},
										},
									},

									selectSitio2: {
										validators: {
											callback: {
												message: 'Seleccione una opción del campo sitio',
												callback: function (value, validator, $field) {
													var value = validator.getFieldElements('selectSitio2').val();
													return (value != null && value != -1);
												},
											},
										},
									},

									imagenTaxi2: {
										validators: {
											notEmpty: {
												message: "Seleccione una imagen",
											},
										},
									},

								},
							})
							.on("error.field.bv", function (e, data) {
								var messages = data.bv.getMessages(data.element);
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								$("#showErrors").show();
								for (var i in messages) {
									// Create new 'li' element to show the message
									$("<li/>")
										.attr("data-field", data.field)
										.wrapInner(
											$("<a/>")
											.attr("href", "javascript: void(0);")
											.html(messages[i])
											.on("click", function (e) {
												// Focus on the invalid field
												data.element.focus();
											})
										)
										.appendTo("#errors");
								}
								data.element
									.data("bv.messages")
									.find('.help-block[data-bv-for="' + data.field + '"]')
									.hide();
							})
							.on("success.field.bv", function (e, data) {
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								if ($("ul#errors li").length == 0) {
									$("#showErrors").hide();
								}
							});

						//VALIDACION DEL FORMULARIO TAXI 3
						$("#form3").bootstrapValidator({
								message: "Este valor no es valido",
								fields: {
									cajaNtaxi3: {
										validators: {
											notEmpty: {
												message: "El campo No Taxi no contiene datos",
											},
											regexp: {
												regexp: /^([0-9])+$/,
												message: "Campo No Taxi solo acepta números",
											},
										},
									},

									cajaPlaca3: {
										validators: {
											notEmpty: {
												message: "El campo Placa no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Placa solo debe contener letras y numeros",
											},
										},
									},

									jacaMarca3: {
										validators: {
											notEmpty: {
												message: "El campo Marca no contiene datos",
											},
											regexp: {
												regexp: /^([a-zA-ZáéíóúÁÉÍÓÚ ])+$/,
												message: "Campo Mmarca solo debe contener letras",
											},
										},
									},

									cajaModelo3: {
										validators: {
											notEmpty: {
												message: "El campo Modelo no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Modelo solo debe contener letras y numeros",
											},
										},
									},

									cajaNSerie3: {
										validators: {
											notEmpty: {
												message: "El campo No Serie no contiene datos",
											},
										},
									},

									selectSitio3: {
										validators: {
											callback: {
												message: 'Seleccione una opción del campo sitio',
												callback: function (value, validator, $field) {
													var value = validator.getFieldElements('selectSitio3').val();
													return (value != null && value != -1);
												},
											},
										},
									},

									imagenTaxi3: {
										validators: {
											notEmpty: {
												message: "Seleccione una imagen",
											},
										},
									},

								},
							})
							.on("error.field.bv", function (e, data) {
								var messages = data.bv.getMessages(data.element);
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								$("#showErrors").show();
								for (var i in messages) {
									// Create new 'li' element to show the message
									$("<li/>")
										.attr("data-field", data.field)
										.wrapInner(
											$("<a/>")
											.attr("href", "javascript: void(0);")
											.html(messages[i])
											.on("click", function (e) {
												// Focus on the invalid field
												data.element.focus();
											})
										)
										.appendTo("#errors");
								}
								data.element
									.data("bv.messages")
									.find('.help-block[data-bv-for="' + data.field + '"]')
									.hide();
							})
							.on("success.field.bv", function (e, data) {
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								if ($("ul#errors li").length == 0) {
									$("#showErrors").hide();
								}
							});

						//VALIDACION DEL FORMULARIO TAXI 4
						$("#form4").bootstrapValidator({
								message: "Este valor no es valido",
								fields: {
									cajaNtaxi4: {
										validators: {
											notEmpty: {
												message: "El campo No Taxi no contiene datos",
											},
											regexp: {
												regexp: /^([0-9])+$/,
												message: "Campo No Taxi solo acepta números",
											},
										},
									},

									cajaPlaca4: {
										validators: {
											notEmpty: {
												message: "El campo Placa no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Placa solo debe contener letras y numeros",
											},
										},
									},

									jacaMarca4: {
										validators: {
											notEmpty: {
												message: "El campo Marca no contiene datos",
											},
											regexp: {
												regexp: /^([a-zA-ZáéíóúÁÉÍÓÚ ])+$/,
												message: "Campo Mmarca solo debe contener letras",
											},
										},
									},

									cajaModelo4: {
										validators: {
											notEmpty: {
												message: "El campo Modelo no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Modelo solo debe contener letras y numeros",
											},
										},
									},

									cajaNSerie4: {
										validators: {
											notEmpty: {
												message: "El campo No Serie no contiene datos",
											},
										},
									},

									selectSitio4: {
										validators: {
											callback: {
												message: 'Seleccione una opción del campo sitio',
												callback: function (value, validator, $field) {
													var value = validator.getFieldElements('selectSitio4').val();
													return (value != null && value != -1);
												},
											},
										},
									},

									imagenTaxi4: {
										validators: {
											notEmpty: {
												message: "Seleccione una imagen",
											},
										},
									},

								},
							})
							.on("error.field.bv", function (e, data) {
								var messages = data.bv.getMessages(data.element);
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								$("#showErrors").show();
								for (var i in messages) {
									// Create new 'li' element to show the message
									$("<li/>")
										.attr("data-field", data.field)
										.wrapInner(
											$("<a/>")
											.attr("href", "javascript: void(0);")
											.html(messages[i])
											.on("click", function (e) {
												// Focus on the invalid field
												data.element.focus();
											})
										)
										.appendTo("#errors");
								}
								data.element
									.data("bv.messages")
									.find('.help-block[data-bv-for="' + data.field + '"]')
									.hide();
							})
							.on("success.field.bv", function (e, data) {
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								if ($("ul#errors li").length == 0) {
									$("#showErrors").hide();
								}
							});

						//VALIDACION DEL FORMULARIO TAXI 5
						$("#form5").bootstrapValidator({
								message: "Este valor no es valido",
								fields: {
									cajaNtaxi5: {
										validators: {
											notEmpty: {
												message: "El campo No Taxi no contiene datos",
											},
											regexp: {
												regexp: /^([0-9])+$/,
												message: "Campo No Taxi solo acepta números",
											},
										},
									},

									cajaPlaca5: {
										validators: {
											notEmpty: {
												message: "El campo Placa no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Placa solo debe contener letras y numeros",
											},
										},
									},

									jacaMarca5: {
										validators: {
											notEmpty: {
												message: "El campo Marca no contiene datos",
											},
											regexp: {
												regexp: /^([a-zA-ZáéíóúÁÉÍÓÚ ])+$/,
												message: "Campo Mmarca solo debe contener letras",
											},
										},
									},

									cajaModelo5: {
										validators: {
											notEmpty: {
												message: "El campo Modelo no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Modelo solo debe contener letras y numeros",
											},
										},
									},

									cajaNSerie5: {
										validators: {
											notEmpty: {
												message: "El campo No Serie no contiene datos",
											},
										},
									},

									selectSitio5: {
										validators: {
											callback: {
												message: 'Seleccione una opción del campo sitio',
												callback: function (value, validator, $field) {
													var value = validator.getFieldElements('selectSitio5').val();
													return (value != null && value != -1);
												},
											},
										},
									},

									imagenTa5: {
										validators: {
											notEmpty: {
												message: "Seleccione una imagen",
											},
										},
									},

								},
							})
							.on("error.field.bv", function (e, data) {
								var messages = data.bv.getMessages(data.element);
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								$("#showErrors").show();
								for (var i in messages) {
									// Create new 'li' element to show the message
									$("<li/>")
										.attr("data-field", data.field)
										.wrapInner(
											$("<a/>")
											.attr("href", "javascript: void(0);")
											.html(messages[i])
											.on("click", function (e) {
												// Focus on the invalid field
												data.element.focus();
											})
										)
										.appendTo("#errors");
								}
								data.element
									.data("bv.messages")
									.find('.help-block[data-bv-for="' + data.field + '"]')
									.hide();
							})
							.on("success.field.bv", function (e, data) {
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								if ($("ul#errors li").length == 0) {
									$("#showErrors").hide();
								}
							});

						//VALIDACION DEL FORMULARIO TAXI 6
						$("#form6").bootstrapValidator({
								message: "Este valor no es valido",
								fields: {
									cajaNtaxi6: {
										validators: {
											notEmpty: {
												message: "El campo No Taxi no contiene datos",
											},
											regexp: {
												regexp: /^([0-9])+$/,
												message: "Campo No Taxi solo acepta números",
											},
										},
									},

									cajaPlaca6: {
										validators: {
											notEmpty: {
												message: "El campo Placa no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Placa solo debe contener letras y numeros",
											},
										},
									},

									jacaMarca6: {
										validators: {
											notEmpty: {
												message: "El campo Marca no contiene datos",
											},
											regexp: {
												regexp: /^([a-zA-ZáéíóúÁÉÍÓÚ ])+$/,
												message: "Campo Mmarca solo debe contener letras",
											},
										},
									},

									cajaModelo6: {
										validators: {
											notEmpty: {
												message: "El campo Modelo no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Modelo solo debe contener letras y numeros",
											},
										},
									},

									cajaNSerie5: {
										validators: {
											notEmpty: {
												message: "El campo No Serie no contiene datos",
											},
										},
									},

									selectSitio6: {
										validators: {
											callback: {
												message: 'Seleccione una opción del campo sitio',
												callback: function (value, validator, $field) {
													var value = validator.getFieldElements('selectSitio6').val();
													return (value != null && value != -1);
												},
											},
										},
									},

									imagenTaxi6: {
										validators: {
											notEmpty: {
												message: "Seleccione una imagen",
											},
										},
									},

								},
							})
							.on("error.field.bv", function (e, data) {
								var messages = data.bv.getMessages(data.element);
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								$("#showErrors").show();
								for (var i in messages) {
									// Create new 'li' element to show the message
									$("<li/>")
										.attr("data-field", data.field)
										.wrapInner(
											$("<a/>")
											.attr("href", "javascript: void(0);")
											.html(messages[i])
											.on("click", function (e) {
												// Focus on the invalid field
												data.element.focus();
											})
										)
										.appendTo("#errors");
								}
								data.element
									.data("bv.messages")
									.find('.help-block[data-bv-for="' + data.field + '"]')
									.hide();
							})
							.on("success.field.bv", function (e, data) {
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								if ($("ul#errors li").length == 0) {
									$("#showErrors").hide();
								}
							});

						//VALIDACION DEL FORMULARIO TAXI 7
						$("#form7").bootstrapValidator({
								message: "Este valor no es valido",
								fields: {
									cajaNtaxi7: {
										validators: {
											notEmpty: {
												message: "El campo No Taxi no contiene datos",
											},
											regexp: {
												regexp: /^([0-9])+$/,
												message: "Campo No Taxi solo acepta números",
											},
										},
									},

									cajaPlaca7: {
										validators: {
											notEmpty: {
												message: "El campo Placa no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Placa solo debe contener letras y numeros",
											},
										},
									},

									jacaMarca7: {
										validators: {
											notEmpty: {
												message: "El campo Marca no contiene datos",
											},
											regexp: {
												regexp: /^([a-zA-ZáéíóúÁÉÍÓÚ ])+$/,
												message: "Campo Mmarca solo debe contener letras",
											},
										},
									},

									cajaModelo7: {
										validators: {
											notEmpty: {
												message: "El campo Modelo no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Modelo solo debe contener letras y numeros",
											},
										},
									},

									cajaNSerie7: {
										validators: {
											notEmpty: {
												message: "El campo No Serie no contiene datos",
											},
										},
									},

									selectSitio7: {
										validators: {
											callback: {
												message: 'Seleccione una opción del campo sitio',
												callback: function (value, validator, $field) {
													var value = validator.getFieldElements('selectSitio7').val();
													return (value != null && value != -1);
												},
											},
										},
									},

									imagenTaxi7: {
										validators: {
											notEmpty: {
												message: "Seleccione una imagen",
											},
										},
									},

								},
							})
							.on("error.field.bv", function (e, data) {
								var messages = data.bv.getMessages(data.element);
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								$("#showErrors").show();
								for (var i in messages) {
									// Create new 'li' element to show the message
									$("<li/>")
										.attr("data-field", data.field)
										.wrapInner(
											$("<a/>")
											.attr("href", "javascript: void(0);")
											.html(messages[i])
											.on("click", function (e) {
												// Focus on the invalid field
												data.element.focus();
											})
										)
										.appendTo("#errors");
								}
								data.element
									.data("bv.messages")
									.find('.help-block[data-bv-for="' + data.field + '"]')
									.hide();
							})
							.on("success.field.bv", function (e, data) {
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								if ($("ul#errors li").length == 0) {
									$("#showErrors").hide();
								}
							});

						//VALIDACION DEL FORMULARIO TAXI 8
						$("#form8").bootstrapValidator({
								message: "Este valor no es valido",
								fields: {
									cajaNtaxi8: {
										validators: {
											notEmpty: {
												message: "El campo No Taxi no contiene datos",
											},
											regexp: {
												regexp: /^([0-9])+$/,
												message: "Campo No Taxi solo acepta números",
											},
										},
									},

									cajaPlaca8: {
										validators: {
											notEmpty: {
												message: "El campo Placa no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Placa solo debe contener letras y numeros",
											},
										},
									},

									jacaMarca8: {
										validators: {
											notEmpty: {
												message: "El campo Marca no contiene datos",
											},
											regexp: {
												regexp: /^([a-zA-ZáéíóúÁÉÍÓÚ ])+$/,
												message: "Campo Mmarca solo debe contener letras",
											},
										},
									},

									cajaModelo8: {
										validators: {
											notEmpty: {
												message: "El campo Modelo no contiene datos",
											},
											regexp: {
												regexp: /^([0-9a-zA-Z ])+$/,
												message: "Campo Modelo solo debe contener letras y numeros",
											},
										},
									},

									cajaNSerie8: {
										validators: {
											notEmpty: {
												message: "El campo No Serie no contiene datos",
											},
										},
									},

									selectSitio8: {
										validators: {
											callback: {
												message: 'Seleccione una opción del campo sitio',
												callback: function (value, validator, $field) {
													var value = validator.getFieldElements('selectSitio8').val();
													return (value != null && value != -1);
												},
											},
										},
									},

									imagenTaxi8: {
										validators: {
											notEmpty: {
												message: "Seleccione una imagen",
											},
										},
									},

								},
							})
							.on("error.field.bv", function (e, data) {
								var messages = data.bv.getMessages(data.element);
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								$("#showErrors").show();
								for (var i in messages) {
									// Create new 'li' element to show the message
									$("<li/>")
										.attr("data-field", data.field)
										.wrapInner(
											$("<a/>")
											.attr("href", "javascript: void(0);")
											.html(messages[i])
											.on("click", function (e) {
												// Focus on the invalid field
												data.element.focus();
											})
										)
										.appendTo("#errors");
								}
								data.element
									.data("bv.messages")
									.find('.help-block[data-bv-for="' + data.field + '"]')
									.hide();
							})
							.on("success.field.bv", function (e, data) {
								$("#errors")
									.find('li[data-field="' + data.field + '"]')
									.remove();
								if ($("ul#errors li").length == 0) {
									$("#showErrors").hide();
								}
							});









						//metodos para llenar los select con los sitios de Taxi
						const lineasTaxi = [];
						var vueltas = 0;
						db.collection("lineas").onSnapshot(function (querySnapshot) {

							querySnapshot.forEach(function (doc) {
								vueltas++;
								lineasTaxi.push(doc.data().nombre);

							});
							cargar_provincias(lineasTaxi, vueltas);
						});

						function cargar_provincias(lineasTaxi, vueltas) {
							if (lineasTaxi.length == vueltas) {
								for (var i in lineasTaxi) {
									var repetir;
									for (repetir = 1; repetir <= numtaxisaltas; repetir++) {
										document.getElementById("selectSitio" + repetir).innerHTML += "<option value='" + i + "'>" + lineasTaxi[i] + "</option>";
									}
								}
							}
						}
						//Fin metodos select

						//llena los campos con los datos si es que existen





						var campos_max = 8; //max de 9 taxis
						var x = paso;
						$("#activarmodal").click(function (e) {
							$("#confirmaragregartaxi").modal("show");
							if (x <= campos_max) {
								var mensajeE = "Seguro deseas agregar el taxi No?" + x;
								document.getElementById("textoModal").innerHTML = mensajeE;
								document.getElementById("textoModal").style.fontWeight = "bold";
							} else {
								var mensajeE = "Has llegado al limite de taxis";
								document.getElementById("textoModal").innerHTML = mensajeE;
								document.getElementById("textoModal").style.color = "#BF2503";
								document.getElementById("textoModal").style.fontWeight = "bold";
							}
						});

						$(".acepNtxi").click(function (e) {
							$("#confirmaragregartaxi").modal("hide");
							e.preventDefault(); //prevenir clicks
							if (x <= campos_max) {
								$("#loaderP").addClass("loader"); //CARGANDO LOADER
								db.collection("reg_prop_prin_web").doc(idDocumento).update({
										num_taxis: x,
									})
									.then(function () {
										console.log("¡actualizado exitosamente!");
										document.location.reload();
										$("#agr" + paso).attr("disabled", "disabled");
										$("#loaderP").removeClass("loader"); //REMOVER LOADER
									})
									.catch(function (error) {
										console.error("Error al actualizar el documento: ", error);
									});
							}
							x++;
						});






						var estadoGuardar1 = 0;
						var idBtnidForm;
						$(".guardar").click(function (e) {
							idBtnidForm = e.target.id; //ID BTN => tc1
							//para saver si los botones estan desabilitado
							var expresionRegularDisabled = "tc";
							var arrayDeCadenasDisabled = idBtnidForm.split(expresionRegularDisabled);
							var nuevoDisabled = String(arrayDeCadenasDisabled);
							var solonumeroDisabled = nuevoDisabled.slice(1);

							//llenamos los campos en caso el pago este efectuado
							var cajaNTaxi = $("#cajaNtaxi" + solonumeroDisabled).val();
							var cajaPlaca = $("#cajaPlaca" + solonumeroDisabled).val();
							var cajaMarca = $("#jacaMarca" + solonumeroDisabled).val();
							var cajaModel = $("#cajaModelo" + solonumeroDisabled).val();
							var cajaNumSe = $("#cajaNSerie" + solonumeroDisabled).val();
							var cajaNumCi = $("#cajaSitio" + solonumeroDisabled).val();
							var cajaImgen = $("#imgSubida_" + solonumeroDisabled).attr("src");
							var imAlttaxi = $("#imgSubida_" + solonumeroDisabled).attr("alt");

							var mySpanIdTax = $("#myspanidfirebase" + solonumeroDisabled).text();


							let validarBusquedat = $("#form" + solonumeroDisabled).data("bootstrapValidator").validate();
							if (validarBusquedat.isValid()) {

								if (imAlttaxi === "22" || imAlttaxi === "23" && cajaImgen != "") {
									$("#altadetaxi").modal("show");
								} else {
									$("#seleccioneimg").modal("show");

									var mensajeESelectimg = "Seleccione una imagen.";
									document.getElementById("textoModalselectimg").innerHTML = mensajeESelectimg;
									document.getElementById("textoModalselectimg").style.fontWeight = "bold";
									//llena los campos nuevamente

								}



								guardarTa(idBtnidForm);

								if (estadoGuardar1 === 0 && mySpanIdTax == "id") {
									var mensajeE = "Seguro Deseas dar de Alta al Nuevo Taxi?";
								} else if (estadoGuardar1 === 1 && mySpanIdTax !== "id") {
									var mensajeE = "Seguro Deseas Editar el Registro?";
								} else if (estadoGuardar1 === 1 && mySpanIdTax === "id") {
									var mensajeE = "Seguro Deseas dar de Alta al Nuevo Taxi?";
								}

								document.getElementById("textoModalAlta").innerHTML = mensajeE;
								document.getElementById("textoModalAlta").style.fontWeight = "bold";
							}
						});




						//llena los campos nuevamente
						$(".cancelaltatxi").click(function (e) {
							ConsultaryllenarCampos();
						});


						function guardarTa(idfor) {
							//confirmar modal para guardar los datos del taxi
							$(".acepaltatxi").click(function (e) {
								$("#altadetaxi").modal("hide");
								var elemento = document.getElementsByClassName(idfor); //CLASE FORM => tc1

								var id = elemento[0].getAttribute("id"); //ID DEL FORM => form1
								//extraer el numero para los dato del select
								var expresionRegular = "form";
								var arrayDeCadenas = id.split(expresionRegular);
								var nuevoI = String(arrayDeCadenas);
								var vuenvo = nuevoI.slice(1);

								var cajaNtaxi = document.getElementById("cajaNtaxi" + vuenvo).value;
								var cajaPlaca = document.getElementById("cajaPlaca" + vuenvo).value;
								var cajaMarca = document.getElementById("jacaMarca" + vuenvo).value;
								var cajaModelo = document.getElementById("cajaModelo" + vuenvo).value;
								var cajaNumeroSerie = document.getElementById("cajaNSerie" + vuenvo).value;
								var cajaSitio = $("#selectSitio" + vuenvo + " option:selected").text();
								var mySpanId = $("#myspanidfirebase" + vuenvo).text();

								var num = vuenvo;

								if (estadoGuardar1 == 0) {
									SubirImgTaxi(emailPInfo, cajaMarca, cajaModelo, cajaNtaxi, cajaPlaca, cajaSitio, cajaNumeroSerie);
								} else if (estadoGuardar1 == 1) {
									$("#loaderP").addClass("loader"); //CARGANDO LOADER
									let addIDColleccion = db.collection("taxis").doc(mySpanId);
									SubirImgTaxiActualizada(cajaMarca, cajaModelo, cajaNtaxi, cajaPlaca, cajaSitio, cajaNumeroSerie, addIDColleccion, num);
								}
							});
						}

						//click al boton editar
						$(".editar").click(function (e) {
							var idBtnidFormEditar;
							idBtnidFormEditar = e.target.id; //ID BTN => tc1
							//extraer el numero para los dato del select
							var expresionRegularED = "editar";
							var arrayDeCadenas = idBtnidFormEditar.split(expresionRegularED);
							var nuevoID = String(arrayDeCadenas);
							var solonumero = nuevoID.slice(1);

							//alert("id del form: "+idBtnidFormEditar+"  "+solonumero);
							document.getElementById("tc" + solonumero).disabled = false;
							document.getElementById("cajaNtaxi" + solonumero).disabled = false;
							document.getElementById("cajaPlaca" + solonumero).disabled = false;
							document.getElementById("jacaMarca" + solonumero).disabled = false;
							document.getElementById("cajaModelo" + solonumero).disabled = false;
							document.getElementById("cajaNSerie" + solonumero).disabled = false;
							document.getElementById("cajaSitio" + solonumero).disabled = false;


							//desactivo boton Editar
							$("#editar" + solonumero).attr("disabled", "disabled");
							$("#editar" + solonumero).addClass("clasedesactivarB")
							//desactivo boton Editar
							$("#eliminar" + solonumero).attr("disabled", "disabled");
							$("#eliminar" + solonumero).addClass("clasedesactivarB");
							//activo boton guardar
							$("#tc" + solonumero).removeClass("clasedesactivarB");
							//$("#guardarchofer" + solonumero).removeAttr("disabled");

							$("#selectSitio" + solonumero).removeClass("d-none");
							$("#selectSitio" + solonumero).addClass("d-block");
							$("#cajaSitio" + solonumero).removeClass("d-block");
							$("#cajaSitio" + solonumero).addClass("d-none");
							$("#imagenTaxi" + solonumero).removeAttr('disabled');

							estadoGuardar1 = 1;
						});


						var idBtneliminar;
						$(".eliminar").click(function (e) {

							idBtneliminar = e.target.id; //ID BTN => eliminar1

							//extraer el numero para los dato del select
							var expresionRegularEL = "eliminar";
							var arrayDeCadenas = idBtneliminar.split(expresionRegularEL);
							var nuevoEL = String(arrayDeCadenas);
							var solonumeroel = nuevoEL.slice(1);

							var placaCrr = $("#cajaPlaca" + solonumeroel).val();

							//alert(idBtneliminar+" : "+solonumeroel+" placa: "+placaCrr);
							db.collection("choferes").where("placa_taxi", "==", placaCrr).where("dueno", "==", emailPInfo).get().then(function (querychoferes) {
								if (querychoferes.size != 0) {
									$("#nodeletetaxi").modal("show");
									var mensajeNoDeletetaxi = "No se puede eliminar, contiene chofer.";
									document.getElementById("textoModalno").innerHTML = mensajeNoDeletetaxi;
									document.getElementById("textoModalno").style.fontWeight = "bold";
								} else {
									//borrar de comitan
									var mySpanIdEL = $("#myspanidfirebase" + solonumeroel).text();
									db.collection("taxis").doc(mySpanIdEL).delete().then(function () {
										console.log("Document successfully deleted!");
										ConsultaryllenarCampos();
									}).catch(function (error) {
										console.error("Error al remover document: ", error);
									});
								}
							});
						});
					});



					//click al boton agregar chofer
					$(".btnAgregarChofer").on("click", function (event) {
						var idBtnAGRChofer = this.id;
						//si esta desabilitado no se hace nada de lo contrario se prosigue
						if ($(this).is("[disabled]")) {
							event.preventDefault();
						} else {
							//extraer el numero para los dato del select
							var expresionRegularAGR = "agr";
							var arrayDeCadenasAGR = idBtnAGRChofer.split(expresionRegularAGR);
							var nuevoIDAGR = String(arrayDeCadenasAGR);
							var solonumeroAGR = nuevoIDAGR.slice(1);

							var cajaPlaca = document.getElementById("cajaPlaca" + solonumeroAGR).value;
							var cajasitio = document.getElementById("cajaSitio" + solonumeroAGR).value;

							//alert("voy a redireccionar a chofer -- Placa: "+cajaPlaca);
							window.location = "#!/chofer";

							sessionStorage.removeItem("placaTaxi");
							sessionStorage.removeItem("sitioTaxi");
							sessionStorage.placaTaxi = cajaPlaca;
							sessionStorage.sitioTaxi = cajasitio;

						}
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
								CargarImagen(idClickImg, inImg);
								break;
						}
					});
					/* Se carga la imagen de Perfil en el input correspondiente, unicamente si es un formato válido (png,jpg y jpeg)*/
					var file; //guardara la info de la imagen
					function CargarImagen(idClickImg, inImg) {
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
										//console.log(recotarImagen_PM);
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

					/********************************************************** */
					/*FUNCION QUE SUBE LA IMG A STORAGE --GUARDAR
					/*********************************************************** */
					function SubirImgTaxi(mail, cMarca, cModelo, cNtaxi, cPlaca, cSitio, cNumeroSerie) {
						let imagenASubir = file;
						let uploadTask = storageRef.child("Fotos_taxis/" + imagenASubir.name).put(imagenASubir);

						uploadTask.on("state_changed",
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
									GuardarTaxis(mail, downloadURL, cMarca, cModelo, cNtaxi, cPlaca, cSitio, cNumeroSerie);
								});
							}
						);
					}

					function GuardarTaxis(emailPInfo, url_foto, cajaMarca, cajaModelo, cajaNtaxi, cajaPlaca, cajaSitio, cajaNumeroSerie) {

						var estado;
						var ciudad;
						//consultar estado y ciudad el propietario pra insertarlo en la coleccion taxi
						db.collection("reg_prop_prin_web").where("email", "==", emailPInfo).onSnapshot(function (queryPropietario) {
							queryPropietario.forEach(function (docDuen) {
								if (docDuen.exists) {
									estado = docDuen.data().estado;
									ciudad = docDuen.data().ciudad;

									estadoCiudad(estado, ciudad);
								}
							});
						});

						function estadoCiudad(estado, ciudad) {
							//console.log("estado: " + estado + " ciudad: " + ciudad);
							db.collection("taxis").add({
									choferes: [],
									correo: emailPInfo,
									foto_taxi: url_foto,
									marca: cajaMarca,
									modelo: cajaModelo,
									numero: cajaNtaxi,
									placa: cajaPlaca,
									sitio: cajaSitio,
									numero_serie: cajaNumeroSerie,
									status_pago: "false",
									fecha_alta_taxi: firebase.firestore.FieldValue.serverTimestamp(), //guarda la fecha del servidor en formato timestamp
									suma_descuentos: 0,
									estado: estado,
									ciudad: ciudad,
								})
								.then(function (docRef) {
									console.log("Registro exitoso");

								})
								.catch(function (error) {
									console.error("Error adding document: ", error);
								});
						}


					}


					/********************************************************** */
					/*FUNCION QUE SUBE LA IMG A STORAGE  --ACTUALIZAR
					/*********************************************************** */
					function SubirImgTaxiActualizada(cMarca, cModelo, cNtaxi, cPlaca, cSitio, cNumeroSerie, addIDColleccion, num) {
						let imagenASubir = file;
						let uploadTask = storageRef.child("Fotos_taxis/" + imagenASubir.name).put(imagenASubir);

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
									actualizarTaxi(cMarca, cModelo, cNtaxi, cPlaca, cSitio, cNumeroSerie, downloadURL, addIDColleccion, num);
								});
							}
						);
					}

					function actualizarTaxi(cajaMarca, cajaModelo, cajaNtaxi, cajaPlaca, cajaSitio, cajaNumeroSerie, url_foto, addIDColleccion, num) {
						//consiguiendo placa con variable de session
						var placaUPDATE = $("#myspanplaca" + num).text();
						db.collection("choferes").where("dueno", "==", emailPInfo).where("placa_taxi", "==", placaUPDATE).get().then(function (queryIdenti) {
							queryIdenti.forEach(function (docidentificador) {
								let addDBIDColleccion = db.collection("choferes").doc(docidentificador.id);
								return addDBIDColleccion.update({
										placa_taxi: cajaPlaca
									})
									.then(function () {
										console.log("Document successfully updated! chofe");
									})
									.catch(function (error) {
										console.error("Error updating document: ", error);
									});
							});
						});


						return addIDColleccion.update({
								foto_taxi: url_foto,
								numero: cajaNtaxi,
								placa: cajaPlaca,
								marca: cajaMarca,
								modelo: cajaModelo,
								numero_serie: cajaNumeroSerie,
								sitio: cajaSitio,
							})
							.then(function () {
								console.log("Document successfully updated! taxi");
								$("#loaderP").removeClass("loader"); //REMOVER LOADER
							})
							.catch(function (error) {
								console.error("Error updating document: ", error);
								$("#loaderP").removeClass("loader"); //REMOVER LOADER
							});

					}





				});




			}
		} else {} // No user is signed in.
	});



	//Reedirecciona al Modulo de Pagos
	$("#btn_show_pagos").click(function (e) {
		e.preventDefault();
		window.location = "#!/Pagos";
	});






	//$("#loaderP").removeClass("d-block");
	//$("#loaderP").addClass("d-none");
	/*
	$("#loaderP").removeClass("d-none");
	$("#loaderP").addClass("d-block");
	*/

});
