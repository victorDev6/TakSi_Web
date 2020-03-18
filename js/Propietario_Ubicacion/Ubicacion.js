


/*
})(window, document);

$(document).ready(function () {

	try {
		firebase.initializeApp({
			apiKey: "AIzaSyDWnLdEDUqbFHWDTjXXWpNAOvMCNXcNH1o",
			authDomain: "prueba-tak-si.firebaseapp.com",
			databaseURL: "https://prueba-tak-si.firebaseio.com",
			projectId: "prueba-tak-si"
		})
	} catch (err) {
		// omitimos el mensaje "ya existe" que es
		// no es un error real cuando estamos recargando en caliente
		if (!/already exists/.test(err.message)) {
			console.error("Se produjo un error de inicialización de Firebase", err.stack);
		}
	}

	var db = firebase.firestore();
	db.collection("reportechofer").onSnapshot(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			renderUser(doc.data());
		});
	});


	function renderUser(doc) {

		var str = JSON.stringify(doc);
		var obj = JSON.parse(str);
		console.log(obj);

	}


	$('#datatable').dataTable({
		"ajax": 'https://gist.githubusercontent.com/heiswayi/7fde241975ed8a80535a/raw/ff1caaeaf62bd6740ab7cafcd61f1215de173379/datatables-data.json',
		"oLanguage": {
			"sStripClasses": "",
			"sSearch": "",
			"sSearchPlaceholder": "Ingrese cualquier palabra clave aquí para filtrar...",
			"sInfo": "_START_ -_END_ of _TOTAL_",
			"sLengthMenu": '<span>Rows per page:</span><select class="browser-default">' +
				'<option value="10">10</option>' +
				'<option value="20">20</option>' +
				'<option value="30">30</option>' +
				'<option value="40">40</option>' +
				'<option value="50">50</option>' +
				'<option value="-1">All</option>' +
				'</select></div>'
		},
		bAutoWidth: false
	});

	//console.log(JSON.stringify(doc));




});
