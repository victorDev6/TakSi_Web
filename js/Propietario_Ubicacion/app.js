var app = angular.module("ubicacion", ["ui.router"]);

app.config([
  "$urlRouterProvider",
  "$stateProvider",
  function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/Ubicacion");

    $stateProvider
      .state("ubicacion", {
        url: "/Ubicacion",
        templateUrl: "../../vistas/Propietario_Ubicacion/ubicacion.html",
      })
      .state("informacion", {
        url: "/Informacion",
        templateUrl: "../../vistas/Propietario_Ubicacion/informacion.html",
      })
      .state("reportes", {
        url: "/Reportes",
        templateUrl: "../../vistas/Propietario_Ubicacion/reportes.html",
      })
      .state("micuenta", {
        url: "/Mi Cuenta",
        templateUrl: "../../vistas/Propietario_Ubicacion/micuenta.html",
      })
      .state("choferes", {
        url: "/chofer",
        templateUrl: "../../vistas/Propietario_Ubicacion/informacion_chofer.html",
      })
      .state("pagos", {
        url: "/Pagos",
        templateUrl: "../../vistas/PagosTarjeta/PagosFotos.html",
      });
  },
]);




