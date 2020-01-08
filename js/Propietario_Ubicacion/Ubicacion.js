$(document).ready(function () {
	$('#nav-icon3').click(function () {
		$('#nav-icon3').toggleClass('open');
		$('#sidebar').toggleClass('abrir');
	});


/*para activar menu seleccionado*/
	$('#sidebar li a').on('click', function () {
		$('li a').removeClass('activo');
		$(this).addClass('activo');
		$('li a').removeClass('active');
		$(this).addClass('active');
	});
});
