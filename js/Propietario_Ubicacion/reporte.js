$(document).ready(function () {
limpiarModalErrores();
	/*************************************************************************/
	/**	        CALENDARIO VALIDANDO FECHA MINIMA-MAXIMA					**/
	/*************************************************************************/
	$(function () {
		$('#dateend').bootstrapMaterialDatePicker({
			weekStart: 0,
			time: false,
		}).on('change', function (e, date) {
			$('#datestart').bootstrapMaterialDatePicker('setMaxDate', date);
		});

		$('#datestart').bootstrapMaterialDatePicker({
			weekStart: 0,
			time: false,
		}).on('change', function (e, date) {
			$('#dateend').bootstrapMaterialDatePicker('setMinDate', date);
		});
	});
	/*************************************************************************/
	/**	        						FIREBASE							**/
	/*************************************************************************/
	try {
		firebase.initializeApp({
			apiKey: "AIzaSyB3Vk0nWljV4KhsfU9Co4qNNE0P_FhIJC4",
			authDomain: "taksi-d543c.firebaseapp.com",
			projectId: "taksi-d543c"
		})
	} catch (err) {
		// omitimos el mensaje "ya existe", no es un error real cuando estamos recargando en caliente
		if (!/already exists/.test(err.message)) {
			console.error("Se produjo un error de inicialización de Firebase", err.stack)
		}
	}

	/*************************************************************************/
	/**	        		INISIALIZANDO FIREBASE							 **/
	/*************************************************************************/
	var db = firebase.firestore();
	var tabla = document.getElementById('reportetabla');
	var tablatotalpeso = document.getElementById('totalpesos');

	//var user = firebase.auth().currentUser;
	//var emailP = user.email;



	firebase.auth().onAuthStateChanged(function (user) {

		if (user) {
			//obtener el usuario que accedió. Si no accedió ningún usuario, el valor de currentUser es null:
			var userCurrent = firebase.auth().currentUser;
			//console.log(newPassword);
			if (userCurrent != null) {
				var emailP = user.email;


				/*********************************************************************************/
				/** CONSULTA TODOS LOS REGISTROS DEL TAXI-CHOFER CORRESPONDIENTE AL PROPIETARIO **/
				/*********************************************************************************/
				function mostrartablaplrincipal() {
					//db.collection("viajes").orderBy("fecha", "desc").onSnapshot(function (querySnapshot) {
					db.collection("viajes").where("email_propietario", "==", emailP).orderBy("fecha", "desc").onSnapshot(function (querySnapshot) {
						tabla.innerHTML = "";
						var conunt = 0;
						var totalPesos = 0;
						querySnapshot.forEach(function (doc) {
							conunt++;
							totalPesos = totalPesos + doc.data().costo;

							var timestamp = doc.data().fecha;
							var fecha = new Date(timestamp.seconds * 1000);

							/*fecha.setHours(0, 0, 0, 0);*/
							var year = fecha.getFullYear(); //2009
							var mes = fecha.getMonth() + 1; //09
							var diaNumero = fecha.getDate(); //09
							var hora = fecha.getHours(); //9
							var minutos = fecha.getMinutes(); //23
							var ampm;
							var mes1;
							var minutos1;

							if (hora >= 12) {
								ampm = "pm";
							} else {
								ampm = "am";
							}
							if (minutos <= 9) {
								minutos1 = "0" + minutos;
							} else {
								minutos1 = minutos;
							}
							if (mes <= 9) {
								mes1 = "0" + mes;
							} else {
								mes1 = mes;
							}

							var ddmmyyyy = diaNumero + "/" + mes1 + "/" + year + " " + hora + ":" + minutos1 + " " + ampm;

							tabla.innerHTML += `<tr>
							<td class="text-nowrap align-middle font-weight-bold">${conunt}</td>
							<td class="text-nowrap align-middle">${doc.data().numerotaxi}</td>
							<td class="text-nowrap align-middle">${doc.data().placa}</td>
							<td class="text-nowrap align-middle">${doc.data().chofer}</td>
							<td class="text-nowrap align-middle">${ddmmyyyy}</td>
							<td class="align-middle">${doc.data().inicio}</td>
							<td class="align-middle">${doc.data().destino}</td>
							<td class="text-nowrap align-middle">${"$"+doc.data().costo}</td>
							</tr>`

						});

						tablatotalpeso.innerHTML = "";
						tablatotalpeso.innerHTML += `<tr>
				<th class="text-nowrap align-middle font-weight-bold text-right">Total Ingreso: </th>
				<th class="text-nowrap align-middle font-weight-bold text-left">${"$ "+totalPesos} Pesos</th>
			</tr>`;

						if (conunt == 0) {
							$(".alert").removeClass("d-none");
							$(".claseocultarpag").addClass("d-none");
							//document.getElementById("desabled").disabled = true;
							$("#desabled").attr("disabled", "disabled");

							$("#desabled").addClass("clasedesactivar");
						} else {
							$("#nopagina").change(); //mostrar registros
							$('.claseocultarpag').removeClass('d-none');
							$(".alert").addClass('d-none');
							//document.getElementById("desabled").disabled = false;
							$("#desabled").removeAttr("disabled");
							$("#desabled").removeClass("clasedesactivar");
						}
					});
					sessionStorage.removeItem("estado");
					sessionStorage.estado = 0;

				}


				mostrartablaplrincipal();



				/*************************************************************************/
				/**	        CONSULTA DE PLACAS PARA EL SELECT PLACAS                    **/
				/*************************************************************************/
				var selected_itemplaca = document.getElementById("placas");
				db.collection("taxis").where("correo", "==", emailP).onSnapshot(function (querySnapshot) {
					selected_itemplaca.innerHTML = '';
					selected_itemplaca.innerHTML += `<option value="0" selected>Seleccionar Placa</option>`
					var conuntplaca = 0;
					querySnapshot.forEach(function (doc) {
						conuntplaca++;
						selected_itemplaca.innerHTML += `<option value="${conuntplaca}">${doc.data().placa}</option>`
					});
				});


				/*************************************************************************/
				/**	        CONSULTA DE CHOFERES PARA EL SELECT CHOFER                  **/
				/*************************************************************************/
				$("#chofer").addClass("clasedesactivar");
				$("#placas").change(function () {
					var selected_itemchofer = document.getElementById("chofer");
					var placaValue = document.getElementById("placas").value;
					var placaTxtBuscar = $("#placas option:selected").text();
					document.getElementById('chofer').disabled = false;

					if (placaValue != 0) {
						$("#chofer").removeClass("clasedesactivar");
						db.collection("choferes").where("dueno", "==", emailP).where("placa_taxi", "==", placaTxtBuscar).onSnapshot(function (querySnapshot) {
							selected_itemchofer.innerHTML = '';
							selected_itemchofer.innerHTML += `<option value="0" selected>Seleccionar Chofer</option>`
							var conuntchofer = 0;
							querySnapshot.forEach(function (doc) {
								conuntchofer++;
								selected_itemchofer.innerHTML += `<option value="${conuntchofer}">${doc.data().nombre+" "+doc.data().apellidos}</option>`
							});
						});
					} else {
						$("#chofer").addClass("clasedesactivar");
						var selected_itemchofer = document.getElementById("chofer");
						selected_itemchofer.innerHTML = '';
						selected_itemchofer.innerHTML += `<option value="0" selected>Seleccionar Chofer</option>`
						document.getElementById('chofer').disabled = true;
					}
				});

				/*************************************************************************/
				/**	 RECOGEINDO LOS VALORES AL HACER CLICK EN EL BOTON BUSCAR		    **/
				/*************************************************************************/
				$("#buscarReporte").click(function () {

					let validarBusqueda = $("#taxi1").data("bootstrapValidator").validate();
					if (validarBusqueda.isValid()) {


						sessionStorage.removeItem("estado");
						sessionStorage.estado = 1;

						var placa = document.getElementById("placas").value;
						var chofer = document.getElementById("chofer").value;
						var placaTxt = $("#placas option:selected").text();
						var choferTxt = $("#chofer option:selected").text();

						//var fecha1 = document.getElementById("date-start").value;
						var fecha1 = document.getElementById("datestart").value;
						var fecha2 = document.getElementById("dateend").value;

						if (fecha1 == "" && fecha2 == "") {
							$("#fechasvacios").modal("show");
							var mensajemodalChoferDelete = "seleccione fecha de inicio y fecha fin";
							document.getElementById("textoModalFecha").innerHTML = mensajemodalChoferDelete;
							document.getElementById("textoModalFecha").style.fontWeight = "bold";




							//alert("seleccione fecha de inicio y fecha fin");
						} else if (fecha1 == "") {
							$("#fechasvacios").modal("show");
							var mensajemodalChoferDelete = "seleccione el fecha inicial";
							document.getElementById("textoModalFecha").innerHTML = mensajemodalChoferDelete;
							document.getElementById("textoModalFecha").style.fontWeight = "bold";

							//alert("seleccione el fecha inicial");
						} else if (fecha2 == "") {
							$("#fechasvacios").modal("show");
							var mensajemodalChoferDelete = "seleccione el fecha final";
							document.getElementById("textoModalFecha").innerHTML = mensajemodalChoferDelete;
							document.getElementById("textoModalFecha").style.fontWeight = "bold";

							//alert("seleccione el fecha final");
						} else {
							//alert("value p: " + placa + " PLACA: " + placaTxt + " value c: " + chofer + " CHOFER: " + choferTxt + " fecha1: " + fecha1 + " fecha2: " + fecha2);
							var nueva1 = fecha1.split(" ")[0];
							var format1 = nueva1.split("/");

							var nueva2 = fecha2.split(" ")[0];
							var format2 = nueva2.split("/");

							var ultima1 = format1[1] + '/' + format1[0] + '/' + format1[2];
							var ultima2 = format2[1] + '/' + format2[0] + '/' + format2[2] + " " + "24:00:00";
							//console.log(ultima2);

							var fechauno = new Date(ultima1);
							var fechados = new Date(ultima2);

							var tablatotalpeso2 = document.getElementById('totalpesos');


							db.collection("viajes").where("placa", "==", placaTxt).where("chofer", "==", choferTxt).where("fecha", ">=", fechauno).where("fecha", "<=", fechados)
								.where("email_propietario", "==", emailP).orderBy("fecha", "desc").onSnapshot(function (queryFecha) {
									tabla.innerHTML = "";
									var conuntporfecha = 0;
									var totalPesos2 = 0;
									queryFecha.forEach(function (doc1) {
										conuntporfecha++;
										totalPesos2 = totalPesos2 + doc1.data().costo;

										var timestamp2 = doc1.data().fecha;
										var fecha2 = new Date(timestamp2.seconds * 1000);

										var year2 = fecha2.getFullYear();
										var mes2 = fecha2.getMonth() + 1;
										var diaNumero2 = fecha2.getDate();
										var hora2 = fecha2.getHours();
										var minutos2 = fecha2.getMinutes();
										var ampm2;
										var mes12;
										var minutos12;

										if (hora2 >= 12) {
											ampm2 = "pm";
										} else {
											ampm2 = "am";
										}
										if (minutos2 <= 9) {
											minutos12 = "0" + minutos2;
										} else {
											minutos12 = minutos2;
										}
										if (mes2 <= 9) {
											mes12 = "0" + mes2;
										} else {
											mes12 = mes2;
										}

										var ddmmyyyy2 = diaNumero2 + "/" + mes12 + "/" + year2 + " " + hora2 + ":" + minutos12 + " " + ampm2;
										//console.log(ddmmyyyy2);


										tabla.innerHTML += `<tr>
							<td class="text-nowrap align-middle font-weight-bold">${conuntporfecha}</td>
							<td class="text-nowrap align-middle">${doc1.data().numerotaxi}</td>
							<td class="text-nowrap align-middle">${doc1.data().placa}</td>
							<td class="text-nowrap align-middle">${doc1.data().chofer}</td>
							<td class="text-nowrap align-middle">${ddmmyyyy2}</td>
							<td class="align-middle">${doc1.data().inicio}</td>
							<td class="align-middle">${doc1.data().destino}</td>
							<td class="text-nowrap align-middle">${"$"+doc1.data().costo}</td>
							</tr>`

									});
									tablatotalpeso2.innerHTML = "";
									tablatotalpeso2.innerHTML += `<tr>
								<th class="text-nowrap align-middle font-weight-bold text-right">Total Ingreso: </th>
								<th class="text-nowrap align-middle font-weight-bold text-left">${"$ "+totalPesos2} Pesos</th>
								</tr>`;

									if (conuntporfecha == 0) {
										$(".alert").removeClass("d-none");
										$(".claseocultarpag").addClass("d-none");
										document.getElementById("desabled").disabled = true;
										$("#desabled").addClass("clasedesactivar");
									} else {
										$(".alert").addClass("d-none");
										$('.claseocultarpag').removeClass("d-none");
										$("#nopagina").change(); //mostrar registros
										document.getElementById("desabled").disabled = false;
										$("#desabled").removeClass("clasedesactivar");
									}
								});
						}


						$(".acepatarFecha").click(function () {
							$("#fechasvacios").modal("hide");
						});

					} else {

					}


				});

				/*************************************************************************/
				/**	        BOTON LIMPIAR CAMPOS					                    **/
				/*************************************************************************/
				$("#limpiarCampo").click(function () {
					// SE VUELVE A LLENAR EL SELECT CON LAS PLACAS
					var selected_itemplaca = document.getElementById("placas");
					db.collection("taxis").where("correo", "==", emailP).onSnapshot(function (querySnapshot) {
						selected_itemplaca.innerHTML = '';
						selected_itemplaca.innerHTML += `<option value="0" selected>Seleccionar Placa</option>`
						var conuntplaca = 0;
						querySnapshot.forEach(function (doc) {
							conuntplaca++;
							selected_itemplaca.innerHTML += `<option value="${conuntplaca}">${doc.data().placa}</option>`
						});
					});
					//SE LIMPIA EL SELECT PARA VOLVER A LLENARLO CONFORME LA PLACA
					var selected_itemchofer = document.getElementById("chofer");
					selected_itemchofer.innerHTML = '';
					selected_itemchofer.innerHTML += `<option value="0" selected>Seleccionar Chofer</option>`
					document.getElementById('chofer').disabled = true;
					mostrartablaplrincipal();
				});


			}
		}

	});



});




/************************************************************************************/
/**	   REGISTRO POR PAGINA AL HACER CLICK EN EL SELECT-REGISTRO-X-PAGINA	    **/
/************************************************************************************/
$("#nopagina").change(function () {
	var self = document.getElementById("nopagina").value;
	if (self == 10) {
		/*************************************************************************/
		/**							INICIA PAGINACION 							**/
		/*************************************************************************/
		const rowsPerPage = 10;
		const rows = $('#my-table tbody tr');
		const rowsCount = rows.length;
		const pageCount = Math.ceil(rowsCount / rowsPerPage); // evitar decimales
		displayRows(1); // Muestra el primer conjunto de filas.
		/**#####################################################################**/
		/**					INICIA PAGINACION CON bootpag.min.js				**/
		/**#####################################################################**/
		$('#pagination-here').bootpag({
			total: pageCount,
			page: 1,
			maxVisible: 3,
			leaps: true,
		})
		$('#pagination-here').on("page", function (event, num) { //al hacer click en el paginador
			displayRows(num);
		});

		function displayRows(index) { // función que muestra filas de una página específica.
			var start = (index - 1) * rowsPerPage;
			var end = start + rowsPerPage;
			rows.hide(); // Ocultar todas las filas
			rows.slice(start, end).show(); // Muestra las filas adecuadas para esta página.
		}
		/*************************************************************************/
		/**							TERMINA PAGINACION 							**/
		/*************************************************************************/
	} else if (self == 20) {
		const rowsPerPage = 20;
		const rows = $('#my-table tbody tr');
		const rowsCount = rows.length;
		const pageCount = Math.ceil(rowsCount / rowsPerPage);
		displayRows(1);
		$('#pagination-here').bootpag({
			total: pageCount,
			page: 1,
			maxVisible: 3,
			leaps: true,
		})
		$('#pagination-here').on("page", function (event, num) {
			displayRows(num);
		});

		function displayRows(index) {
			var start = (index - 1) * rowsPerPage;
			var end = start + rowsPerPage;
			rows.hide();
			rows.slice(start, end).show();
		}

	} else if (self == 1000) {
		const rowsPerPage = 1000;
		const rows = $('#my-table tbody tr');
		const rowsCount = rows.length;
		const pageCount = Math.ceil(rowsCount / rowsPerPage);
		displayRows(1);
		$('#pagination-here').bootpag({
			total: pageCount,
			page: 1,
			maxVisible: 3,
			leaps: true,
		})
		$('#pagination-here').on("page", function (event, num) {
			displayRows(num);
		});

		function displayRows(index) {
			var start = (index - 1) * rowsPerPage;
			var end = start + rowsPerPage;
			rows.hide();
			rows.slice(start, end).show();
		}

	} else {
		const rowsPerPage = 10;
		const rows = $('#my-table tbody tr');
		const rowsCount = rows.length;
		const pageCount = Math.ceil(rowsCount / rowsPerPage);
		displayRows(1);
		$('#pagination-here').bootpag({
			total: pageCount,
			page: 1,
			maxVisible: 3,
			leaps: true,
		})
		$('#pagination-here').on("page", function (event, num) {
			displayRows(num);
		});

		function displayRows(index) {
			var start = (index - 1) * rowsPerPage;
			var end = start + rowsPerPage;
			rows.hide();
			rows.slice(start, end).show();
		}
	}
});
