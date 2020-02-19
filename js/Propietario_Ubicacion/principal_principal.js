//jQuery(document).ready(function () {
$(document).ready(function () {

	/*Cerar Sidebar*/
	$('.cerrar-menu, .overlay').on('click', function () {
		$('.sidebar').removeClass('active');
		$('.overlay').removeClass('active');
	});


	/*Abrir Sidebar*/
	$('.abrir-menu').on('click', function (e) {
		e.preventDefault();
		$('.sidebar').addClass('active');
		$('.overlay').addClass('active');
	});


	/*para activar menu seleccionado*/
	$('.sidebar li a').on('click', function () {
		$('li a').removeClass('activo');
		$(this).addClass('activo');
		$('li a').removeClass('active');
		$(this).addClass('active');

		$('.sidebar').removeClass('active');
		$('.overlay').removeClass('active');
	});



});
