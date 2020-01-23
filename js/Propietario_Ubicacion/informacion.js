 $(document).ready(function() {
  var numeroTaxi = "";
  /* Funcion lanzada por clase, que extrae el ID de quien lo lanzo, para procesar su imagen de salida*/
  $(".selectorImagen").click(function(e) {
    switch (e.target.id) {
      case "imgSubida":
        inImg = e.target.id;
        $("#imagenTaxi").click();
        numeroTaxi = "";
        console.log("Variable con valor " + numeroTaxi);
        break;
    }
  });

  /* Se carga la imagen de Perfil en el input correspondiente, unicamente si es un formato válido (png,jpg y jpeg)*/
  $("#imagenTaxi").change(function() {
    console.log("Valor dentro de change " + numeroTaxi);
    var file = $("#imagenTaxi" + numeroTaxi).val();
    var ext = file.substring(file.lastIndexOf("."));
    if (ext == ".jpg" || ext == ".png" || ext == ".JPG" || ext == ".PNG" || ext == ".JPEG" || ext == ".jpeg") {
      var imgExt = 23;
      if (ext == ".png" || ext == ".PNG") {
        imgExt = 22;
      }
      var preview = document.getElementById("imgSubida" + numeroTaxi);
      var file = document.getElementById("imagenTaxi" + numeroTaxi).files[0];
      extension_PM = ext; //ext de imagen

      $("#imgSubida" + numeroTaxi).attr("title", file.name);
      $("#imgSubida" + numeroTaxi).attr("alt", imgExt);
      var reader = new FileReader();
      reader.addEventListener("load",function() {
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
      $("#imgSubida" + numeroTaxi).attr(
        "src","../../Diseno/ICONOS/cerrar-sesion-Presionado.svg"
      );
    }
  });
});
