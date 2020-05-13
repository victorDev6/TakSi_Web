
/*

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


	document.getElementById("user_div").style.display = "block";
	printDatos();


	var map;
	var gmarkers = [];

	function printDatos() {
		var emailP = "dueno2@gmail.com"; //CORREO DEL PROPIETARIO QUE INICIE SESSSION

		//var user = firebase.auth().currentUser;
		//var correo_id = user.email;

		//[ ] (where("estado","in",["online","ocupado"])   ,  .where("estado","==","online") ,
		db.collection("Comitán de Domínguez").where("dueño", "==", emailP).onSnapshot(function (querySnapshot) {
			removeMarkers();
			querySnapshot.forEach(async function (doc) {
				console.log(doc.data());
				if (doc.data().estado == "online" || doc.data().estado == "ocupado") {
					var infowindow = new google.maps.InfoWindow();
					var marker = new google.maps.Marker({
						position: {
							lat: doc.data().ubicacion.latitude,
							lng: doc.data().ubicacion.longitude
						},
						icon: {
							url: "taxi.svg",
							scaledSize: new google.maps.Size(50, 50)
						},
						map: map,
						title: doc.data().identificador
					});


					var name = "dj";
					var apePat = "gg";
					await db.collection("choferes").where("dueño", "==", emailP).where("identificador", "==", doc.data().identificador).get().then(function (doc) {

						console.log(doc.docs[0]._document.proto.fields.nombre['stringValue']);
						name = doc.docs[0]._document.proto.fields.nombre['stringValue'];
						apePat = doc.docs[0]._document.proto.fields.apellidos['stringValue'];
						console.log(doc.docs[22]._document.proto.fields.numero['stringValue']);

					}).catch(function (err) {
						console.log(err);
					});

					var contentString = "<img height='140px' width='250px' src='taxi.png' />" +
						"<h5>" + doc.data().identificador + "</h5>" +
						"<br>El taxi del sitio: " + doc.data().sitio +
						"<br>Operado por: " + name + " " + apePat +
						"<br>Está actualmente: " + (doc.data().estado === 'online' ? 'Buscando servicio' : 'En un servicio') +
						"<br>";
					google.maps.event.addListener(marker, 'mouseover', function (e) {
						infowindow.setContent(contentString);
						infowindow.open(map, marker);
					});

					google.maps.event.addListener(marker, 'mouseout', function (e) {
						infowindow.close();
					});

					gmarkers.push(marker);
				} else {}
			});
		});
	}

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {
				lat: 16.241409,
				lng: -92.129658
			},
			zoom: 14
		});
	}


	function removeMarkers() {
		while (gmarkers.length) {
			var oldMarker = gmarkers.pop();
			oldMarker.setMap(null);
			// delete oldMarker;  // optionally delete it, allegedly it's unnnecesary.
		}
		//  for(i=0; i<gmarkers.length; i++){
		//    gmarkers[i].setMap(null);
		// }
	}
