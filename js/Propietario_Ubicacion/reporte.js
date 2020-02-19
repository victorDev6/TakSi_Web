 $(document).ready(function () {









 	/*********************************CALENDARIO***********************************/
 	$(function () {

 		$('#date-end').bootstrapMaterialDatePicker({
 			weekStart: 0,
 			time: false,
 		}).on('change', function (e, date) {
 			$('#date-start').bootstrapMaterialDatePicker('setMaxDate', date);
 		});

 		$('#date-start').bootstrapMaterialDatePicker({
 			weekStart: 0,
 			time: false
 		}).on('change', function (e, date) {
 			$('#date-end').bootstrapMaterialDatePicker('setMinDate', date);
 		});
 	});


 	/*********************************LEER DESDE FIREBASE***********************************/
 	try {
 		firebase.initializeApp({
 			apiKey: "AIzaSyDWnLdEDUqbFHWDTjXXWpNAOvMCNXcNH1o",
 			authDomain: "prueba-tak-si.firebaseapp.com",
 			projectId: "prueba-tak-si"
 		})
 	} catch (err) {
 		// omitimos el mensaje "ya existe" que es
 		// no es un error real cuando estamos recargando en caliente
 		if (!/already exists/.test(err.message)) {
 			console.error("Se produjo un error de inicialización de Firebase", err.stack)
 		}
 	}





 	// Initialize Firebase
 	var db = firebase.firestore();
 	/********************* Leer documentos *****************************/
 	var tabla = document.getElementById('reportetabla');
 	db.collection("reportechofer").onSnapshot(function (querySnapshot) {
 		tabla.innerHTML = "";
 		querySnapshot.forEach(function (doc) {
 			tabla.innerHTML += `<tr>
							<td class="text-nowrap">${doc.data().NoViaje}</td>
							<td class="text-nowrap">${doc.data().NoTaxi}</td>
							<td class="text-nowrap">${doc.data().Placa}</td>
							<td class="text-nowrap">${doc.data().Chofer}</td>
							<td class="text-nowrap">${doc.data().Fecha}</td>
							<td class="text-nowrap">${doc.data().Salida}</td>
							<td class="text-nowrap">${doc.data().Destino}</td>
							<td class="text-nowrap">${doc.data().Hora}</td>
							<td class="text-nowrap">${doc.data().Calificacion}</td>
							</tr>`
 		});

 		/*************************************************************************/
 		/**							INICIA PAGINACION 							**/
 		/*************************************************************************/
 		const rowsPerPage = 3;
 		const rows = $('#my-table tbody tr');
 		const rowsCount = rows.length;
 		const pageCount = Math.ceil(rowsCount / rowsPerPage); // evitar decimales
 		//const numbers = $('#numbers');
 		//var limpiarLi = document.getElementById('numbers');
 		//limpiarLi.innerHTML = "";
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

 		//al hacer click en el paginador
 		$('#pagination-here').on("page", function (event, num) {
			displayRows(num);
 		});

 		// función que muestra filas de una página específica.
 		function displayRows(index) {
 			var start = (index - 1) * rowsPerPage;
 			var end = start + rowsPerPage;
 			rows.hide(); // Ocultar todas las filas
 			rows.slice(start, end).show(); // Muestra las filas adecuadas para esta página.
 		}
 		/*************************************************************************/
 		/**							TERMINA PAGINACION 							**/
 		/*************************************************************************/

 	});









 });
