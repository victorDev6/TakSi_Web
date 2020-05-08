//APUNTE
//verificar QUE EL SELECT SALGA DE LA COLLECION LINEA


$(document).ready(function () {

 	/* Conectarse a Firebase*/
 	try {
 		firebase.initializeApp({
 			apiKey: "AIzaSyB3Vk0nWljV4KhsfU9Co4qNNE0P_FhIJC4",
 			authDomain: "taksi-d543c.firebaseapp.com",
 			projectId: "taksi-d543c"
 		})
 	} catch (err) {
 		if (!/already exists/.test(err.message)) {
 			console.error("Se produjo un error de inicialización de Firebase", err.stack)
 		}
 	}
 	var db = firebase.firestore();
 	var emailP = "dueno2@gmail.com"; //CORREO DEL PROPIETARIO QUE INICIE SESSSION
 	//var numtaxisaltas=3;





			function ConsultaryllenarCampos() {
				var cajaTax;
				var cajaChofer;
				var cajaPlac;
				var cajaMrc;
				var cajaModel;
				var cajaNseri;
				var cajaSit;
				var idFirebaseTaxi;
				db.collection("taxis").where("correo", "==", emailP).orderBy("fecha_alta_taxi", "asc").onSnapshot(function (querytaxis) {
					var conuntvariable = 0;
					querytaxis.forEach(function (docnumtaxi) {
						conuntvariable++;

						if (docnumtaxi.exists) {
							$("#tc" + conuntvariable).addClass("clasedesactivarB");
							$("#editar" + conuntvariable).removeClass("clasedesactivarB");
							$("#eliminar" + conuntvariable).removeClass("clasedesactivarB");

							document.getElementById("eliminar" + conuntvariable).disabled = false;
							document.getElementById("editar" + conuntvariable).disabled = false;


							var el= document.getElementById("eliminar" + conuntvariable).disabled = false;
							var ed= document.getElementById("editar" + conuntvariable).disabled = false;

							//para desactivar btn eliminar y editar cuando no se carga el DOM HTML
							if (el == null ) {
									document.getElementById("eliminar" + conuntvariable).disabled = false;
							}

							if (ed == null ) {
							        document.getElementById("editar" + conuntvariable).disabled = false;
							}


							document.getElementById("tc" + conuntvariable).disabled = true;
							document.getElementById("cajaNtaxi" + conuntvariable).disabled = true;
							document.getElementById("cajaPlaca" + conuntvariable).disabled = true;
							document.getElementById("jacaMarca" + conuntvariable).disabled = true;
							document.getElementById("cajaModelo" + conuntvariable).disabled = true;
							document.getElementById("cajaNSerie" + conuntvariable).disabled = true;
							document.getElementById("cajaSitio" + conuntvariable).disabled = true;

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
							idFirebaseTaxi = docnumtaxi.id;

							document.getElementById("cajaNtaxi" + conuntvariable).value = cajaTax;
							document.getElementById("cajaPlaca" + conuntvariable).value = cajaPlac;
							document.getElementById("jacaMarca" + conuntvariable).value = cajaMrc;
							document.getElementById("cajaModelo" + conuntvariable).value = cajaModel;
							document.getElementById("cajaNSerie" + conuntvariable).value = cajaNseri;
							document.getElementById("cajaSitio" + conuntvariable).value = cajaSit;
							document.getElementById("myspanidfirebase" + conuntvariable).textContent = idFirebaseTaxi;

						} else {
							console.log("No such document!");
						}
					})
				});
			}

















 	var numtaxisaltas;
 	var idDocumento;
 	var paso;
 	db.collection("dueños").where("correo", "==", emailP).onSnapshot(function (queryNumtaxi) {

		//ConsultaryllenarCampos();
 		queryNumtaxi.forEach(function (docnumtaxi) {
 			numtaxisaltas = docnumtaxi.data().no_taxis;
 			idDocumento = docnumtaxi.id;//id colleccion dueño
 			$('.container').empty().prepend(); //limpiar antes de crear


 			for (paso = 1; paso <= numtaxisaltas; paso++) {
 				$('.container').append(
 					'<div class="">\
		<form id="form' + paso + '" class="pt-2 tc' + paso + '" action="javascript:void(0)">\
			<div class="row encierroI p-2">\
				<div class="col-12  col-sm-8  col-md-8 col-lg-8  p-1 taxis">\
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
									<select class="form-control form-control-sm d-block" name="" id="selectSitio' + paso + '">\
										<option value="-1">Seleccionar Sitio</option>\
										<option value="1">Radio Taxi</option>\
										<option value="2">Junchavin</option>\
										<option value="3">Miguel Aleman</option>\
									</select>\
									<input type="text" class="form-control form-control-sm d-none" id="cajaSitio' + paso + '" disabled>\
								</div>\
							</div>\
							<div class="form-group row mb-0 pt-1 justify-content-center align-items-center">\
								<div class=" offset-md-3">\
									<input type="file" name="noti1" accept=".png, .jpg, .jpeg" id="imagenTaxi' + paso + '" class="d-none">\
									<img class="selectorImagen imgSubida_estilo" id="imgSubida' + paso + '" src="">\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
				<div class="col-12  col-sm-4   col-md-3  col-lg-3">\
					<div class="row  justify-content-center align-items-center titulochof">\
						<span class="titulos">CHOFERES</span>\
					</div>\
					<div class="form-group row justify-content-center align-items-center pt-md-4">\
						<div class="col-3 col-sm-8  col-md-4 pb-sm-4 pb-md-0 pt-sm-4 pt-md-0 ">\
							<img class="iconochoferesS d-block m-auto">\
						</div>\
						<div class="col-3 col-sm-8  col-md-4 pb-sm-4 pb-md-0">\
							<img class="iconochoferesC d-block m-auto">\
						</div>\
						<div class="col-3 col-sm-8  col-md-4">\
							<img class="iconochoferesS d-block m-auto">\
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
				<div class="col-12  col-sm-12  col-md-1 col-lg-1  p-1 pt-md-4 cuatro">\
					<div class="row justify-content-center align-items-center p-1 pt-md-4">\
						<div class="col-4 col-sm-4 col-md-12 col-lg-8 pb-md-4">\
							<button class="btn guardar d-block m-auto" id="tc' + paso + '"></button>\
						</div>\
						<div class="col-4 col-sm-4  col-md-12 col-lg-8 pb-md-4">\
							<button class="btn editar d-block m-auto" id="editar' + paso + '" disabled></button>\
						</div>\
						<div class="col-4 col-sm-4  col-md-12 col-lg-8">\
							<button class="btn eliminar d-block m-auto" id="eliminar' + paso + '" disabled></button>\
						</div>\
					</div>\
				</div>\
			</div>\
		</form>\
	</div>');
			$("#editar" + paso).addClass("clasedesactivarB");
	        $("#eliminar" + paso).addClass("clasedesactivarB");

			//document.getElementById("editar" + paso).disabled = true;
			//document.getElementById("eliminar" + paso).disabled = true;
				ConsultaryllenarCampos();
			}











 			var campos_max = 6; //max de 9 taxis
 			var x = paso;
 			$("#activarmodal").click(function (e) {
 				$('#confirmaragregartaxi').modal('show');
 				if (x <= campos_max) {
 					var mensajeE = "Seguro deseas agregar el taxi No?" + x;
 					document.getElementById("textoModal").innerHTML = mensajeE;
 					document.getElementById("textoModal").style.fontWeight = "bold";
					//ConsultaryllenarCampos();
 				} else {
 					var mensajeE = "Has llegado al limite de taxis";
 					document.getElementById("textoModal").innerHTML = mensajeE;
 					document.getElementById('textoModal').style.color = '#BF2503';
 					document.getElementById("textoModal").style.fontWeight = "bold";
					//ConsultaryllenarCampos();
 				}
 			});


 			$('.acepNtxi').click(function (e) {
 				$('#confirmaragregartaxi').modal('hide');
 				e.preventDefault(); //prevenir clicks
 				if (x <= campos_max) {
 					db.collection("dueños").doc(idDocumento).update({
 							"no_taxis": x
 						}).then(function () {
 							console.log("¡actualizado exitosamente!");
 							//ConsultaryllenarCampos();
 						})
 						.catch(function (error) {
 							console.error("Error al actualizar el documento: ", error);
 							//ConsultaryllenarCampos();
 						});
 				}
 				x++;
 			});



			var estadoGuardar1 = 0;
			var idBtnidForm;
 			$(".guardar").click(function (e) {
 				$('#altadetaxi').modal('show');
				idBtnidForm = e.target.id; //ID BTN => tc1

				//para saver si los botones estan desabilitado
				var expresionRegularDisabled = "tc";
 				var arrayDeCadenasDisabled = idBtnidForm.split(expresionRegularDisabled);
 				var nuevoDisabled = String(arrayDeCadenasDisabled);
 				var solonumeroDisabled = nuevoDisabled.slice(1);

				//verificar si esta desabilitado o no
				var btn1ED = document.getElementById("editar"+solonumeroDisabled).disabled;
				var btn1EL = document.getElementById("eliminar"+solonumeroDisabled).disabled;

				if ( btn1ED==true && btn1EL==true) {
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

 			//confirmar modal para guardar los datos del taxi
 			$(".acepaltatxi").click(function (e) {
 				$('#altadetaxi').modal('hide');
 				var elemento = document.getElementsByClassName(idBtnidForm); //CLASE FORM => tc1
 				var id = elemento[0].getAttribute('id'); //ID DEL FORM => form1
 				//extraer el numero para los dato del select
 				var expresionRegular = "form";
 				var arrayDeCadenas = id.split(expresionRegular);
 				var nuevoI = String(arrayDeCadenas);
 				var vuenvo = nuevoI.slice(1);

				var cajaNtaxi = document.getElementById("cajaNtaxi"+vuenvo).value;
				var cajaPlaca = document.getElementById("cajaPlaca"+vuenvo).value;
				var cajaMarca = document.getElementById("jacaMarca"+vuenvo).value;
				var cajaModelo = document.getElementById("cajaModelo"+vuenvo).value;
				var cajaNumeroSerie = document.getElementById("cajaNSerie"+vuenvo).value;
				var cajaSitio = $("#selectSitio" + vuenvo + " option:selected").text();
				var mySpanId = $("#myspanidfirebase"+vuenvo).text();


				//obtener la fecha para guardarlo en firebase
				//var utcDate = moment(myDate).utc();
				//var myDate = utcDate.toDate();
				//alert(myDate);


				if (estadoGuardar1 == 0) {
					db.collection("taxis").add({
						choferes: [],
						correo: emailP,
						foto_taxi: "taxiruta",
						marca: cajaMarca,
						modelo: cajaModelo,
						numero: cajaNtaxi,
						placa: cajaPlaca,
						sitio: cajaSitio,
						numero_serie: cajaNumeroSerie,
						status_pago: "false",
						fecha_alta_taxi: firebase.firestore.FieldValue.serverTimestamp(),//guarda la fecha del servidor en formato timestamp
						suma_descuentos:0
					}).then(function (docRef) {
						console.log("Registro exitoso");
					}).catch(function (error) {
						console.error("Error adding document: ", error);
					});
				} else if (estadoGuardar1 == 1) {

					let addIDColleccion = db.collection("taxis").doc(mySpanId);
					return addIDColleccion.update({
						foto_taxi: "taxirutaupdate",
						numero: cajaNtaxi,
						placa: cajaPlaca,
						marca: cajaMarca,
						modelo: cajaModelo,
						numero_serie: cajaNumeroSerie,
						sitio: cajaSitio,
						}).then(function () {
							console.log("Document successfully updated!");
						}).catch(function (error) {
							console.error("Error updating document: ", error);
						});
				}

 			});

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

					$("#tc"+solonumero).removeClass("clasedesactivarB");
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

				 estadoGuardar1 = 1;
				 console.log("se agrega valor nuevo valor a estadoGuardar1: "+estadoGuardar1);
 			});



 		});












 		//redireccionar a formularios choferes
 		$(".btnAgregarChofer").click(function (e) {

			var idBtnAGRChofer=this.id;


			//extraer el numero para los dato del select
 			var expresionRegularAGR = "agr";
 			var arrayDeCadenasAGR = idBtnAGRChofer.split(expresionRegularAGR);
 			var nuevoIDAGR = String(arrayDeCadenasAGR);
 			var solonumeroAGR = nuevoIDAGR.slice(1);

			var cajaPlaca = document.getElementById("cajaPlaca"+solonumeroAGR).value;

 			//alert("voy a redireccionar a chofer -- Placa: "+cajaPlaca);
 			window.location = "#!/chofer";

			sessionStorage.removeItem("placaTaxi");
			sessionStorage.placaTaxi = cajaPlaca;
 		});









 		/* Funcion lanzada por clase, que extrae el ID de quien lo lanzo, para procesar su imagen de salida*/
 		$(".selectorImagen").click(function (e) {
 			alert(e.target.id);
 			switch (e.target.id) {
 				case "imgSubida1":
 					inImg = e.target.id;
 					$("#imagenTaxi1").click();
 					break;
 			}
 		});
 		/* Se carga la imagen de Perfil en el input correspondiente, unicamente si es un formato válido (png,jpg y jpeg)*/
 		$("#imagenTaxi1").change(function () {
 			var file = $("#imagenTaxi1").val();
 			var ext = file.substring(file.lastIndexOf("."));
 			//Validar si es un formato valido
 			if (ext == ".jpg" || ext == ".png" || ext == ".jpeg" || ext == ".JPG" || ext == ".PNG" || ext == ".JPEG") {
 				var imgExt = 23;
 				if (ext == ".png" || ext == ".PNG") {
 					imgExt = 22;
 				}

 				var preview = document.getElementById("imgSubida1");
 				var file = document.getElementById("imagenTaxi1").files[0];
 				extension_PM = ext; //ext de imagen

 				$("#imgSubida1").attr("title", file.name);
 				$("#imgSubida1").attr("alt", imgExt);

 				var reader = new FileReader();

 				reader.addEventListener("load", function () {
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
 				$("#imgSubida1").attr(
 					"src", "../../Diseno/ICONOS/cerrar-sesion-Presionado.svg"
 				);
 			}
 		});















 	});


	 //https://fireship.io/lessons/firestore-array-queries-guide/
 	//.catch(function (error) {
 	//console.log("Error getting document:", error);
 	//});


 });




