 $(document).ready(function () {

	 /*********************************CALENDARIO***********************************/
 	$(function () {

 		$('#date-end').bootstrapMaterialDatePicker({
 			weekStart: 0,
 			time: false,
 		}).on('change', function (e, date) {
 			$('#date-start').bootstrapMaterialDatePicker('setMaxDate', date);
 		});

 		$('#date-start').bootstrapMaterialDatePicker({
 			weekStart: 0,
 			time: false
 		}).on('change', function (e, date) {
 			$('#date-end').bootstrapMaterialDatePicker('setMinDate', date);
 		});
 	});

 });
