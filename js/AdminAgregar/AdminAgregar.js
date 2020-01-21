$(document).ready(function() {
  //Radio button de Sitio
  $("input[name=radioSitio]").change(function() {
    //alert($(this).val());
    if ($(this).val() == 1) {
      // document.getElementById("modClassSitio").classList.add("d-none");
      $("#modClassSitio").addClass("d-none");
    } else {
      $("#modClassSitio").removeClass("d-none");
      // document.getElementById("modClassSitio").classList.remove("d-none");
    }
  });

  //Radio button de Ciudad
  $("input[name=radioCd]").change(function() {
    if ($(this).val() == 1) {
      $("#modClassCd").addClass("d-none");
    } else {
      $("#modClassCd").removeClass("d-none");
    }
  });

  //Radio button de Estado
  $("input[name=radioEdo]").change(function() {
    if ($(this).val() == 1) {
      $("#modClassEdo").addClass("d-none");
    } else {
      $("#modClassEdo").removeClass("d-none");
    }
  });

  //Radio button de Costo
  $("input[name=radioCostoKm]").change(function() {
    if ($(this).val() == 1) {
      $("#modClassCostoKm").addClass("d-none");
    } else {
      $("#modClassCostoKm").removeClass("d-none");
    }
  });
  //Radio button de Placa
  $("input[name=radioPlaca]").change(function() {
    if ($(this).val() == 1) {
      $("#modClassPlaca").addClass("d-none");
    } else {
      $("#modClassPlaca").removeClass("d-none");
    }
  });
}); //fin del document
