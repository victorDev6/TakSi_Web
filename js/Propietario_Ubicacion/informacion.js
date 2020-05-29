//APUNTE
//verificar QUE EL SELECT SALGA DE LA COLLECION LINEA

$(document).ready(function () {
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
	//var emailP = "perezrobleroleiver15@gmail.com"; //CORREO DEL PROPIETARIO QUE INICIE SESSSION



	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			//obtener el usuario que accedió. Si no accedió ningún usuario, el valor de currentUser es null:
			var userCurrent = firebase.auth().currentUser;
			//console.log(newPassword);
			if (userCurrent != null) {
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

								$("#eliminar" + conuntvariable).removeAttr("disabled");
								$("#editar" + conuntvariable).removeAttr("disabled");

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
									var leyendaTaxi = '<strong>Verifique el pago</strong> de su taxi <strong>#' + cajaTax + '</strong>';
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
								//console.log("COUNT:" + docnumtaxi.data().placa);
							});
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
				<div class="col-12  col-sm-8  col-md-8 col-lg-8  p-1 taxis" id="cajaH' + paso + '">\
					<div class="row  justify-content-center align-items-center taxx">\
						<span class="titulos">TAXI # ' + paso + ' <img class="iconotaxi"></span>\
					</div>\
					<div class="row pl-4 pr-4">\
						<div class="col-6 col-lg-6">\
							<div class="form-group row mb-0 pb-1">\
								<label for="" class="col-12  col-sm-12  col-md-4  col-lg-3   col-form-label  text-center text-md-right px-0 subtitulo">N° Taxi:</label>\
								<div class="col-12  col-sm-12  col-md-8  col-lg-9">\
									<input type="text" class="form-control form-control-sm" id="cajaNtaxi' + paso + '" placeholder="Ingrese No de Taxi..">\
								</div>\
							</div>\
							<div class="form-group row mb-0 pb-1">\
								<label for="" class="col-12  col-sm-12  col-md-4  col-lg-3  col-form-label  text-center text-md-right px-0 subtitulo">Placa:</label>\
								<div class="col-12  col-sm-12  col-md-8  col-lg-9">\
									<input type="text" class="form-control form-control-sm" id="cajaPlaca' + paso + '" placeholder="Ingrese la Placa..">\
								</div>\
							</div>\
							<div class="form-group row mb-0 pb-1">\
								<label for="" class="col-12  col-sm-12   col-md-4	col-lg-3  col-form-label  text-center text-md-right px-0 subtitulo">Marca:</label>\
								<div class="col-12  col-sm-12   col-md-8  col-lg-9">\
									<input type="text" class="form-control form-control-sm" id="jacaMarca' + paso + '" placeholder="Ingrese la Marca..">\
								</div>\
							</div>\
							<div class="form-group row mb-0 pb-1">\
								<label for="" class="col-12  col-sm-12   col-md-4   col-lg-3   col-form-label  text-center text-md-right px-0 subtitulo">Modelo:</label>\
								<div class="col-12  col-sm-12  col-md-8  col-lg-9">\
									<input type="text" class="form-control form-control-sm" id="cajaModelo' + paso + '" placeholder="Ingrese el Modelo..">\
								</div>\
							</div>\
						</div>\
							<div class="col-6 col-lg-6">\
								<div class="form-group row mb-0 pb-1">\
								<label for="" class="col-12  col-sm-12   col-md-4   col-lg-3   col-form-label  text-center text-md-right px-0 subtitulo">No. Serie:</label>\
								<div class="col-12  col-sm-12  col-md-8  col-lg-9">\
									<input type="text" class="form-control form-control-sm" id="cajaNSerie' + paso + '" placeholder="Ingrese No de Serie..">\
								</div>\
							</div>\
							<div class="form-group row mb-0 pb-1">\
								<label for="" class="col-12   col-sm-12   col-md-4   col-lg-3    col-form-label  text-center text-md-right px-0 subtitulo">Sitio:</label>\
								<div class="col-12 col-sm-12 col-md-8  col-lg-9">\
									<select class="form-control form-control-sm d-block selectLinea" name="" id="selectSitio' + paso + '">\
									<option value="0" selected>Seleccionar Sitio</option>\
									</select>\
									<input type="text" class="form-control form-control-sm d-none" id="cajaSitio' + paso + '" disabled>\
								</div>\
							</div>\
							<div class="form-group row mb-0 pt-1 justify-content-center align-items-center">\
								<div class=" offset-md-3">\
									<input type="file" name="noti1" accept=".png, .jpg, .jpeg" id="imagenTaxi' + paso + '" class="d-none">\
									<img class="selectorImagen imgSubida_estilo" id="imgSubida_' + paso + '" src="">\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="col-12  col-sm-4   col-md-3  col-lg-3" id="cajaHH' + paso + '">\
					<div class="row  justify-content-center align-items-center titulochof">\
						<span class="titulos">CHOFERES</span>\
					</div>\
					<div class="form-group row justify-content-center align-items-center pt-md-4">\
						<div class="col-3 col-sm-8  col-md-4 pb-sm-4 pb-md-0 pt-sm-4 pt-md-0 ">\
							<img class="iconochoferesS iconochofer1' + paso + '  d-block m-auto" id="">\
						</div>\
						<div class="col-3 col-sm-8  col-md-4 pb-sm-4 pb-md-0">\
							<img class="iconochoferesS iconochofer2' + paso + '  d-block m-auto" id="">\
						</div>\
						<div class="col-3 col-sm-8  col-md-4">\
							<img class="iconochoferesS iconochofer3' + paso + '  d-block m-auto" id="">\
						</div>\
					</div>\
					<div class="row justify-content-center align-items-center mt-2">\
						<div class="p-1 col-12">\
							<a ui-sref="choferes" class="btn btn-secondary btn-sm active btn-block m-auto btnAgregarChofer" id="agr' + paso + '" role="button">\
								<span class="fas fa-plus float-right pr-4 Ipropietario"></span>Agregar\
							</a>\
						</div>\
					</div>\
					<span class="d-none" id="myspanidfirebase' + paso + '">id</span>\
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
				<div class="alert alert-secondary d-none p-2 m-auto " role="alert" id="notaxi' + paso + '">\
		    	</div>\
			</div>\
		</form>\
	</div>');
							$("#editar" + paso).addClass("clasedesactivarB");
							$("#eliminar" + paso).addClass("clasedesactivarB");
							$("#eliminar" + paso).attr("disabled", "disabled");
							$("#editar" + paso).attr("disabled", "disabled");

						}

						//metodos para llenar los select con los sitios de Taxi
						const lineasTaxi = [];
						db.collection("lineas").onSnapshot(function (querySnapshot) {
							querySnapshot.forEach(function (doc) {
								lineasTaxi.push(doc.data().nombre);
							});
							cargar_provincias(lineasTaxi);
						});

						function cargar_provincias(lineasTaxi) {
							for (var i in lineasTaxi) {
								var repetir;
								for (repetir = 1; repetir <= numtaxisaltas; repetir++) {
									document.getElementById("selectSitio" + repetir).innerHTML += "<option value='" + repetir + "'>" + lineasTaxi[i] + "</option>";
								}
							}
						}
						//Fin metodos select

						//llena los campos con los datos si es que existen
						ConsultaryllenarCampos();




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
								db.collection("reg_prop_prin_web").doc(idDocumento).update({
										num_taxis: x,
									})
									.then(function () {
										console.log("¡actualizado exitosamente!");
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
							$("#altadetaxi").modal("show");
							idBtnidForm = e.target.id; //ID BTN => tc1
							guardarTa(idBtnidForm);

							//para saver si los botones estan desabilitado
							var expresionRegularDisabled = "tc";
							var arrayDeCadenasDisabled = idBtnidForm.split(expresionRegularDisabled);
							var nuevoDisabled = String(arrayDeCadenasDisabled);
							var solonumeroDisabled = nuevoDisabled.slice(1);

							//verificar si esta desabilitado o no
							var btn1ED = document.getElementById("editar" + solonumeroDisabled).disabled;
							var btn1EL = document.getElementById("eliminar" + solonumeroDisabled).disabled;

							if (btn1ED == true && btn1EL == true) {
								var mensajeE = "Seguro Deseas dar de Alta un Nuevo Taxi?";
							} else {
								var mensajeE = "Seguro Deseas Editar el Registro?";
							}
							document.getElementById("textoModalAlta").innerHTML = mensajeE;
							document.getElementById("textoModalAlta").style.fontWeight = "bold";
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

								if (estadoGuardar1 == 0) {
									SubirImgTaxi(emailPInfo, cajaMarca, cajaModelo, cajaNtaxi, cajaPlaca, cajaSitio, cajaNumeroSerie);
								} else if (estadoGuardar1 == 1) {
									let addIDColleccion = db.collection("taxis").doc(mySpanId);
									SubirImgTaxiActualizada(cajaMarca, cajaModelo, cajaNtaxi, cajaPlaca, cajaSitio, cajaNumeroSerie, addIDColleccion);
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

							$("#tc" + solonumero).removeClass("clasedesactivarB");
							document.getElementById("tc" + solonumero).disabled = false;
							document.getElementById("cajaNtaxi" + solonumero).disabled = false;
							document.getElementById("cajaPlaca" + solonumero).disabled = false;
							document.getElementById("jacaMarca" + solonumero).disabled = false;
							document.getElementById("cajaModelo" + solonumero).disabled = false;
							document.getElementById("cajaNSerie" + solonumero).disabled = false;
							document.getElementById("cajaSitio" + solonumero).disabled = false;

							$("#selectSitio" + solonumero).removeClass("d-none");
							$("#selectSitio" + solonumero).addClass("d-block");
							$("#cajaSitio" + solonumero).removeClass("d-block");
							$("#cajaSitio" + solonumero).addClass("d-none");
							$("#imagenTaxi" + solonumero).removeAttr('disabled');


							estadoGuardar1 = 1;
							console.log(
								"se agrega valor nuevo valor a estadoGuardar1: " + estadoGuardar1
							);
						});
					});

					//redireccionar a formularios choferes
					$(".btnAgregarChofer").click(function (e) {
						var idBtnAGRChofer = this.id;

						//extraer el numero para los dato del select
						var expresionRegularAGR = "agr";
						var arrayDeCadenasAGR = idBtnAGRChofer.split(expresionRegularAGR);
						var nuevoIDAGR = String(arrayDeCadenasAGR);
						var solonumeroAGR = nuevoIDAGR.slice(1);

						var cajaPlaca = document.getElementById("cajaPlaca" + solonumeroAGR)
							.value;
						var cajasitio = document.getElementById("cajaSitio" + solonumeroAGR)
							.value;

						//alert("voy a redireccionar a chofer -- Placa: "+cajaPlaca);
						window.location = "#!/chofer";

						sessionStorage.removeItem("placaTaxi");
						sessionStorage.placaTaxi = cajaPlaca;

						sessionStorage.removeItem("sitioTaxi");
						sessionStorage.sitioTaxi = cajasitio;
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
										console.log(recotarImagen_PM);
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
									ConsultaryllenarCampos();
								})
								.catch(function (error) {
									console.error("Error adding document: ", error);
								});
						}


					}


					/********************************************************** */
					/*FUNCION QUE SUBE LA IMG A STORAGE  --ACTUALIZAR
					/*********************************************************** */
					function SubirImgTaxiActualizada(cMarca, cModelo, cNtaxi, cPlaca, cSitio, cNumeroSerie, addIDColleccion) {
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
									actualizarTaxi(cMarca, cModelo, cNtaxi, cPlaca, cSitio, cNumeroSerie, downloadURL, addIDColleccion);
								});
							}
						);
					}

					function actualizarTaxi(cajaMarca, cajaModelo, cajaNtaxi, cajaPlaca, cajaSitio, cajaNumeroSerie, url_foto, addIDColleccion) {
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
								console.log("Document successfully updated!");
							})
							.catch(function (error) {
								console.error("Error updating document: ", error);
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


});
