$(document).ready(function () {
  //Validacion del modulo Registrar Usuario
  $("#formularioRegistro")
    .bootstrapValidator({
      excluded: [":disabled"],
      message: "Este valor no es valido",
      fields: {
        nombreUser: {
          validators: {
            notEmpty: {
              message: "El campo nombre no contiene datos",
            },
            regexp: {
              regexp: /^([a-zA-ZáéíóúÁÉÍÓÚ ])+$/,
              message: "Campo nombre solo debe contener letras",
            },
            stringLength: {
              min: 4,
              max: 12,
              message: "El campo nombre debe tener de 5 a 12 caracteres",
            },
          },
        },
        apellidoUser: {
          validators: {
            notEmpty: {
              message: "El campo apellido no contiene datos",
            },
            regexp: {
              regexp: /^([a-zA-ZáéíóúÁÉÍÓÚ ])+$/,
              message: "Campo apellido solo debe contener letras",
            },
            stringLength: {
              min: 5,
              max: 15,
              message: "El campo apellido debe tener de 5 a 15 caracteres",
            },
          },
        },
        direccionUser: {
          validators: {
            notEmpty: {
              message: "El campo dirección no contiene datos",
            },
            regexp: {
              regexp: /^([0-9a-zA-Z ])+$/,
              message: "Campo dirección solo debe contener letras y numeros",
            },
            stringLength: {
              min: 10,
              max: 45,
              message: "El campo dirección debe tener de 10 a 30 caracteres",
            },
          },
        },
        telefonoUser: {
          validators: {
            notEmpty: {
              message: "Campo teléfono Vacio",
            },
            regexp: {
              regexp: /^([0-9])+$/,
              message: "Campo teléfono solo acepta números",
            },
            stringLength: {
              min: 10,
              max: 10,
              message: "El campo teléfono solo acepta 10 números",
            },
          },
        },
        pass1User: {
          validators: {
            notEmpty: {
              message: "Ingresa tu contraseña",
            },
            regexp: {
              regexp: /^[0-9a-zA-Z!@#$%&*_-]+$/,
              message: "Formato de contraseña incorrecto",
            },
            stringLength: {
              min: 8,
              max: 15,
              message: "La contraseña necesita entre 8 y 15 caracteres",
            },
          },
        },
        pass2User: {
          validators: {
            notEmpty: {
              message: "Ingresa tu contraseña",
            },
            regexp: {
              regexp: /^[0-9a-zA-Z!@#$%&*_-]+$/,
              message: "Formato de contraseña incorrecto",
            },
            stringLength: {
              min: 8,
              max: 15,
              message: "La contraseña necesita entre 8 y 15 caracteres",
            },
          },
        },
        cantTaxiUser: {
          validators: {
            notEmpty: {
              message: "Campo cantidad de taxi vacío",
            },
            regexp: {
              regexp: /^[1-3]+$/,
              message: "Sólo se aceptan números de 1 al 3",
            },
            stringLength: {
              min: 1,
              max: 1,
              message: "Campo cantidad de taxi solo requiere un digito",
            },
          },
        },
        emailUser: {
          validators: {
            notEmpty: {
              message: "El campo correo no contiene datos.",
            },
            regexp: {
              regexp: /^[a-zA-Z0-9](?!.*([._-])\1)[a-zA-Z0-9._-]+[a-zA-Z0-9]+\@(([a-zA-Z0-9])+\.+([a-zA-Z]){2,3}){1}$/,
              message: "Formato de correo incorrecto",
            },
            stringLength: {
              max: 40,
              message: "El campo correo sólo necesita 40 caracteres",
            },
          },
        },
        selectEdoUser: {
          validators: {
            notEmpty: {
              message: "Seleccione el Estado",
            },
          },
        },
        selectCdUser: {
          validators: {
            notEmpty: {
              message: "Seleccione la Ciudad",
            },
          },
        },
        consesionUser: {
          validators: {
            notEmpty: {
              message: "El campo consesión no contiene datos",
            },
            regexp: {
              regexp: /^([0-9a-zA-Z])+$/,
              message: "Campo consesión solo debe contener letras y numeros",
            },
            stringLength: {
              max: 35,
              message: "El campo consesión debe tener de 35 caracteres",
            },
          },
        },
      },
    })
    .on("error.field.bv", function (e, data) {
      var messages = data.bv.getMessages(data.element);
      $("#errors")
        .find('li[data-field="' + data.field + '"]')
        .remove();
      $("#showErrors").show();
      for (var i in messages) {
        // Create new 'li' element to show the message
        $("<li/>")
          .attr("data-field", data.field)
          .wrapInner(
            $("<a/>")
              .attr("href", "javascript: void(0);")
              .html(messages[i])
              .on("click", function (e) {
                // Focus on the invalid field
                data.element.focus();
              })
          )
          .appendTo("#errors");
      }
      data.element
        .data("bv.messages")
        .find('.help-block[data-bv-for="' + data.field + '"]')
        .hide();
    })
    .on("success.field.bv", function (e, data) {
      $("#errors")
        .find('li[data-field="' + data.field + '"]')
        .remove();
      if ($("ul#errors li").length == 0) {
        $("#showErrors").hide();
      }
    });

  //Validacion del modulo Registrar Usuario
  $("#formularioInicioSesion")
    .bootstrapValidator({
      excluded: [":disabled"],
      message: "Este valor no es valido",
      fields: {
        emailUser: {
          validators: {
            notEmpty: {
              message: "El campo correo no contiene datos.",
            },
            regexp: {
              regexp: /^[a-zA-Z0-9](?!.*([._-])\1)[a-zA-Z0-9._-]+[a-zA-Z0-9]+\@(([a-zA-Z0-9])+\.+([a-zA-Z]){2,3}){1}$/,
              message: "Formato de correo incorrecto",
            },
            stringLength: {
              max: 40,
              message: "El campo correo sólo necesita 40 caracteres",
            },
          },
        },
        passwordUser: {
          validators: {
            notEmpty: {
              message: "Ingresa tu contraseña",
            },
            regexp: {
              regexp: /^[0-9a-zA-Z!@#$%&*_-]+$/,
              message: "Formato de contraseña incorrecto",
            },
            stringLength: {
              min: 8,
              max: 15,
              message: "La contraseña necesita entre 8 y 15 caracteres",
            },
          },
        },
      },
    })
    .on("error.field.bv", function (e, data) {
      var messages = data.bv.getMessages(data.element);
      $("#errors")
        .find('li[data-field="' + data.field + '"]')
        .remove();
      $("#showErrors").show();
      for (var i in messages) {
        // Create new 'li' element to show the message
        $("<li/>")
          .attr("data-field", data.field)
          .wrapInner(
            $("<a/>")
              .attr("href", "javascript: void(0);")
              .html(messages[i])
              .on("click", function (e) {
                // Focus on the invalid field
                data.element.focus();
              })
          )
          .appendTo("#errors");
      }
      data.element
        .data("bv.messages")
        .find('.help-block[data-bv-for="' + data.field + '"]')
        .hide();
    })
    .on("success.field.bv", function (e, data) {
      $("#errors")
        .find('li[data-field="' + data.field + '"]')
        .remove();
      if ($("ul#errors li").length == 0) {
        $("#showErrors").hide();
      }
    });

  //Validacion del Modal Recuperar pass
  $("#formularioModalRecupPass")
    .bootstrapValidator({
      excluded: [":disabled"],
      message: "Este valor no es valido",
      fields: {
        emailUserRecup: {
          validators: {
            notEmpty: {
              message: "El campo correo no contiene datos.",
            },
            regexp: {
              regexp: /^[a-zA-Z0-9](?!.*([._-])\1)[a-zA-Z0-9._-]+[a-zA-Z0-9]+\@(([a-zA-Z0-9])+\.+([a-zA-Z]){2,3}){1}$/,
              message: "Formato de correo incorrecto",
            },
            stringLength: {
              max: 40,
              message: "El campo correo sólo necesita 40 caracteres",
            },
          },
        },
      },
    })
    .on("error.field.bv", function (e, data) {
      var messages = data.bv.getMessages(data.element);
      $("#errors")
        .find('li[data-field="' + data.field + '"]')
        .remove();
      $("#showErrors").show();
      for (var i in messages) {
        // Create new 'li' element to show the message
        $("<li/>")
          .attr("data-field", data.field)
          .wrapInner(
            $("<a/>")
              .attr("href", "javascript: void(0);")
              .html(messages[i])
              .on("click", function (e) {
                // Focus on the invalid field
                data.element.focus();
              })
          )
          .appendTo("#errors");
      }
      data.element
        .data("bv.messages")
        .find('.help-block[data-bv-for="' + data.field + '"]')
        .hide();
    })
    .on("success.field.bv", function (e, data) {
      $("#errors")
        .find('li[data-field="' + data.field + '"]')
        .remove();
      if ($("ul#errors li").length == 0) {
        $("#showErrors").hide();
      }
    });

  //Validacion del Modal Recuperar pass
  $("#formulario_pagos")
    .bootstrapValidator({
      excluded: [":disabled"],
      message: "Este valor no es valido",
      fields: {
        /*cajaTaxiSelect: {
          validators: {
            notEmpty: {
              message: "Seleccione El Taxi a Pagar",
            },
          },
        },*/
        noti1: {
          validators: {
            notEmpty: {
              message: "Seleccione una imagen",
            },
          },
        },
      },
    })
    .on("error.field.bv", function (e, data) {
      var messages = data.bv.getMessages(data.element);
      $("#errors")
        .find('li[data-field="' + data.field + '"]')
        .remove();
      $("#showErrors").show();
      for (var i in messages) {
        // Create new 'li' element to show the message
        $("<li/>")
          .attr("data-field", data.field)
          .wrapInner(
            $("<a/>")
              .attr("href", "javascript: void(0);")
              .html(messages[i])
              .on("click", function (e) {
                // Focus on the invalid field
                data.element.focus();
              })
          )
          .appendTo("#errors");
      }
      data.element
        .data("bv.messages")
        .find('.help-block[data-bv-for="' + data.field + '"]')
        .hide();
    })
    .on("success.field.bv", function (e, data) {
      $("#errors")
        .find('li[data-field="' + data.field + '"]')
        .remove();
      if ($("ul#errors li").length == 0) {
        $("#showErrors").hide();
      }
    });

  //fin de validaciones
});

/*function cargando() {
  $("#loader").show();
}

function hideCargando() {
  $("#loader").hide();
}*/

$("#showErrors").hide();

// ELIMINAR MODAL DE ERRORES DE FORMA MANUAL //
function limpiarModalErrores() {
  $("#errors").find("li").remove();
  if ($("ul#errors li").length == 0) {
    $("#showErrors").hide();
  }
}
