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
		.state('cerrarsesion', {
			url: '/Home',
			templateUrl: 'ubicacion.html'
		});

}]);
