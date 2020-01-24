$(document).ready(function () {

	/*
	function decryptfun() {
	alert("dedo");
		var pass = document.getElementById("pasworcito");

		if (pass.type === "password") {
			pass.type = "text";
		} else {
			pass.type = "password";
		}
	}
	*/

	//funcion al cambiar imagen
	$("#cliquiandoP1").click(function () {
		var pass = document.getElementById("pasW1");
		if (pass.type === "password") {
			pass.type = "text";
		} else {
			pass.type = "password";
		}
	});

	//funcion al cambiar imagen
	$("#cliquiandoP2").click(function () {
		var pass = document.getElementById("pasW2");
		if (pass.type === "password") {
			pass.type = "text";
		} else {
			pass.type = "password";
		}
	});

	//funcion al cambiar imagen
	$("#cliquiandoP3").click(function () {
		var pass = document.getElementById("pasW3");
		if (pass.type === "password") {
			pass.type = "text";
		} else {
			pass.type = "password";
		}
	});

});
