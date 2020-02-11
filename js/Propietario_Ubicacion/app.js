var app = angular.module('ubicacion', ['ui.router']);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise('/Ubicacion');

	$stateProvider
		.state('ubicacion', {
			url: '/Ubicacion',
			templateUrl: 'ubicacion.html'
		})
		.state('informacion', {
			url: '/Informacion',
			templateUrl: 'informacion.html'
		})
		.state('reportes', {
			url: '/Reportes',
			templateUrl: 'reportes.html'
		})
		.state('micuenta', {
			url: '/Mi Cuenta',
			templateUrl: 'micuenta.html'
		})
		.state('choferes', {
			url: '/chofer',
			templateUrl: 'informacion_chofer.html'
		})
		.state('facturacion', {
			url: '/informacion facturacion',
			templateUrl: 'informacion_facturacion.html'
		})
		.state('cerrarsesion', {
			url: '/Home',
			templateUrl: 'ubicacion.html'
		});

}]);


app.controller('miTablaReportes', ['$scope', function ($scope) {

	$scope.currentPage = 0;
	$scope.pageSize = 5; // Esta la cantidad de registros que deseamos mostrar por página
	$scope.pages = [];


	/**************************************************************************************/
	/* En esta parte colocaré el objeto JSON un registro	 							  */
	/**************************************************************************************/
	$scope.data = $scope.usuarios = [{
		noviaje: 1,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   }, {
		noviaje: 2,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'

   }, {
		noviaje: 3,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   }, {
		noviaje: 4,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   }, {
		noviaje: 5,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   }, {
		noviaje: 6,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   },{
		noviaje: 7,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   },{
		noviaje: 8,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   },{
		noviaje: 9,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   },{
		noviaje: 10,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   },{
		noviaje: 11,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   }, {
		noviaje: 12,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'

   }, {
		noviaje: 13,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   }, {
		noviaje: 14,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   }, {
		noviaje: 15,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   }, {
		noviaje: 16,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   },{
		noviaje: 17,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   },{
		noviaje: 18,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   },{
		noviaje: 19,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   },{
		noviaje: 20,
		notaxi: 446,
		placa: 'MS5-45F',
		chofer: 'Luis',
		fecha: '15/02/20',
		salida: 'Parque',
		destino: 'Plaza',
		hora: '06:54:00 pm',
		calificacion: '2 de 5'
   }];


	/*******************************INICIO PAGINACION*************************************/
	/* 		FUNCIONE configPages: las cuales nos servirán para que el controller         */
	/* 					pueda definir cuantas páginas se van a generar.					 */
	/*************************************************************************************/
	$scope.configPages = function () {
		$scope.pages.length = 0;
		var ini = $scope.currentPage - 4;
		var fin = $scope.currentPage + 5;
		if (ini < 1) {
			ini = 1;
			if (Math.ceil($scope.data.length / $scope.pageSize) > 10) fin = 10;
			else fin = Math.ceil($scope.data.length / $scope.pageSize);
		} else {
			if (ini >= Math.ceil($scope.data.length / $scope.pageSize) - 10) {
				ini = Math.ceil($scope.data.length / $scope.pageSize) - 10;
				fin = Math.ceil($scope.data.length / $scope.pageSize);
			}
		}
		if (ini < 1) ini = 1;
		for (var i = ini; i <= fin; i++) {
			$scope.pages.push({
				no: i
			});
		}
		if ($scope.currentPage >= $scope.pages.length)
			$scope.currentPage = $scope.pages.length - 1;
	};

	/*************************************************************************************/
	/* 			FUNCIONE setPages: las cuales nos servirán para que el controller        */
	/* 				pueda definir qué página selecciona el usuario.						 */
	/*************************************************************************************/
	$scope.setPage = function (index) {
		$scope.currentPage = index - 1;
	};

	$scope.configPages();

}]);

/*************************************************************************************/
/*Se Agrega un filter a nuestro módulo de AngularJS, que llamaremos startFromGrid,   */
/*	que se encargará de truncar los registros de las tablas por cada página			 */
/*	  (para que no nos aparezcan todos los registros en una misma página).			 */
/*************************************************************************************/
app.filter('startFromGrid', function () {
	return function (input, start) {
		start = +start;
		return input.slice(start);
	};
});
/********************TERMINO DE PAGINACION***********************************************/
