$(document).ready(function () {













	$('#nav-icon3').click(function () {
		$('#nav-icon3').toggleClass('open');
		$('#sidebar').toggleClass('abrir');
	});


	$('#nav-icon3').toggleClass('open');
	$('#sidebar').toggleClass('abrir');


	/*para activar menu seleccionado*/
	$('#sidebar li a').on('click', function () {
		$('li a').removeClass('activo');
		$(this).addClass('activo');
		$('li a').removeClass('active');
		$(this).addClass('active');
	});





$(document).ready(function() {
  var numeroNoti = "";
  /* Funcion lanzada por clase, que extrae el ID de quien lo lanzo, para procesar su imagen de salida*/
  $(".selectorImagen").click(function(e) {
    switch (e.target.id) {
      case "imgSubida":inImg = e.target.id;
        $("#imagenNoticia").click();
        numeroNoti = "";
        console.log("Variable con valor " + numeroNoti);
        break;
      case "imgSubida2":
        inImg = e.target.id;
        $("#imagenNoticia2").click();
        numeroNoti = "2";
        console.log("Variable con valor " + numeroNoti);
        break;
      case "imgSubida3":
        inImg = e.target.id;
        $("#imagenNoticia3").click();
        numeroNoti = "3";
        console.log("Variable con valor " + numeroNoti);
        break;
      case "imgSubida4":
        inImg = e.target.id;
        $("#imagenNoticia4").click();
        numeroNoti = "4";
        console.log("Variable con valor " + numeroNoti);
        break;
      case "imgSubida5":
        inImg = e.target.id;
        $("#imagenNoticia5").click();
        numeroNoti = "5";
        console.log("Variable con valor " + numeroNoti);
        break;
      case "imgSubida6":
        inImg = e.target.id;
        $("#imagenNoticia6").click();
        numeroNoti = "6";
        console.log("Variable con valor " + numeroNoti);
        break;
    }
  });

  /* Se carga la imagen de Perfil en el input correspondiente, unicamente si es un formato válido (png,jpg y jpeg)*/
  $("#imagenNoticia, #imagenNoticia2, #imagenNoticia3, #imagenNoticia4, #imagenNoticia5, #imagenNoticia6").change(function() {
    console.log("Valor dentro de change " + numeroNoti);
    var file = $("#imagenNoticia" + numeroNoti).val();
    var ext = file.substring(file.lastIndexOf("."));
    if (
      ext == ".jpg" ||
      ext == ".png" ||
      ext == ".JPG" ||
      ext == ".PNG" ||
      ext == ".JPEG" ||
      ext == ".jpeg"
    ) {
      var imgExt = 23;
      if (ext == ".png" || ext == ".PNG") {
        imgExt = 22;
      }
      var preview = document.getElementById("imgSubida" + numeroNoti);
      var file = document.getElementById("imagenNoticia" + numeroNoti).files[0];
      extension_PM = ext; //ext de imagen

      $("#imgSubida" + numeroNoti).attr("title", file.name);
      $("#imgSubida" + numeroNoti).attr("alt", imgExt);
      var reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          preview.src = reader.result;
          var imagen = preview.src;
          recotarImagen_PM = imagen.slice(imgExt);
          console.log(extension_PM);
          console.log(recotarImagen_PM);
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      $("#imgSubida" + numeroNoti).attr(
        "src",
        "../../Diseno/ICONOS/fotoDefault.svg"
      );
    }
  });
});











});



