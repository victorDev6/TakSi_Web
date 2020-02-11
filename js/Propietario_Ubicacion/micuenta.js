$(document).ready(function () {
/* ---------------------------------------------------- */
/* VISULIZAR LAS CONTRASEÑAS							*/
/*----------------------------------------------------- */
		$("#icon-clickM1").click(function() {
			$("#iconM1").toggleClass('fa-eye-slash');

			var input = $("#passM1");
			if (input.attr("type") === "password") {
				input.attr("type", "text");
			} else {
				input.attr("type", "password");
			}
		});


		$("#icon-clickM2").click(function() {
			$("#iconM2").toggleClass('fa-eye-slash');

			var input = $("#passM2");
			if (input.attr("type") === "password") {
				input.attr("type", "text");
			} else {
				input.attr("type", "password");
			}
		});


});
