$(document).ready(function () {
	//Validacion del modulo chofer1
	$("#chofer1")
		.bootstrapValidator({
			excluded: [":disabled"],
			message: "Este valor no es valido",
			fields: {
				inputNombre1: {
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
				inputApellido1: {
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
				inputTelefono1: {
					validators: {
						notEmpty: {
							message: "El campo teléfono no contiene datos",
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
				inputEmail1: {
					validators: {
						notEmpty: {
							message: "El campo usuario no contiene datos.",
						},
						stringLength: {
							max: 40,
							message: "El campo usuario sólo necesita 40 caracteres",
						},
					},
				},
				inputPass1: {
					validators: {
						notEmpty: {
							message: "El campo contraseña no contiene datos",
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
				imagenTaxiCH1: {
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


	//Validacion del modulo chofer2
	$("#chofer2").bootstrapValidator({
			excluded: [":disabled"],
			message: "Este valor no es valido",
			fields: {
				inputNombre2: {
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
				inputApellido2: {
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
				inputTelefono2: {
					validators: {
						notEmpty: {
							message: "El campo teléfono no contiene datos",
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
				inputEmail2: {
					validators: {
						notEmpty: {
							message: "El campo usuario no contiene datos.",
						},
						stringLength: {
							max: 40,
							message: "El campo usuario sólo necesita 40 caracteres",
						},
					},
				},
				inputPass2: {
					validators: {
						notEmpty: {
							message: "El campo contraseña no contiene datos",
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
				imagenTaxiCH2: {
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

	//Validacion del modulo chofer3
	$("#chofer3").bootstrapValidator({
			excluded: [":disabled"],
			message: "Este valor no es valido",
			fields: {
				inputNombre3: {
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
				inputApellido3: {
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
				inputTelefono3: {
					validators: {
						notEmpty: {
							message: "El campo teléfono no contiene datos",
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
				inputEmail3: {
					validators: {
						notEmpty: {
							message: "El campo usuario no contiene datos.",
						},
						stringLength: {
							max: 40,
							message: "El campo usuario sólo necesita 40 caracteres",
						},
					},
				},
				inputPass3: {
					validators: {
						notEmpty: {
							message: "El campo contraseña no contiene datos",
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
				imagenTaxiCH3: {
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




	//Validacion del modulo micuenta
	$("#formTelefono").bootstrapValidator({
			excluded: [":disabled"],
			message: "Este valor no es valido",
			fields: {
				nuevotelefono: {
					validators: {
						notEmpty: {
							message: "El campo teléfono no contiene datos",
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







	//Validacion del modulo reporte
	$("#taxi1").bootstrapValidator({
			excluded: [":disabled"],
			message: "Este valor no es valido",
			fields: {
				placas: {
					validators: {
						callback: {
							message: 'Seleccione una opción del campo select placa',
							callback: function (value, validator, $field) {
								var value = validator.getFieldElements('placas').val();
								return (value != 0 && value != null && value != -1);
							}
						}
					}
				},

				chofer: {
					validators: {
						callback: {
							message: 'Seleccione una opción del campo select chofer',
							callback: function (value, validator, $field) {
								var value = validator.getFieldElements('chofer').val();
								return (value != 0 && value != null && value != -1);
							}
						}
					}
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


$("#showErrors").hide();

// ELIMINAR MODAL DE ERRORES DE FORMA MANUAL //
function limpiarModalErrores() {
	$("#errors").find("li").remove();
	if ($("ul#errors li").length == 0) {
		$("#showErrors").hide();
	}
}
