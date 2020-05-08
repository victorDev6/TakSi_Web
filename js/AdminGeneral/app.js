var app = angular.module("administrador", ["ui.router"]);

app.config([
  "$urlRouterProvider",
  "$stateProvider",
  function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/AdminNoticias");

    $stateProvider
      .state("adminnoticias", {
        url: "/AdminNoticias",
        templateUrl: "../../vistas/AdminNoticias/AdminNoticias.html"
      })
      .state("adminpagos", {
        url: "/AdminPagos",
        templateUrl: "../../vistas/AdminPagos/AdminPagos.html"
      })
      .state("verifpagos", {
        url: "/VerificarPagos",
        templateUrl: "../../vistas/AdminPagos/VerificarPagos.html"
      })
      .state("admincostos", {
        url: "/AdminCostos",
        templateUrl: "../../vistas/AdminCostos/AdminCostos.html"
      })
      .state("adminperfiles", {
        url: "/AdminPerfiles",
        templateUrl: "../../vistas/AdminPerfiles/AdminPerfiles.html"
      })
      .state("notificaciones", {
        url: "/Notificaciones",
        templateUrl: "../../vistas/AdminNotificacion/AdminNotificacion.html"
      })
      .state("agregarsitio", {
        url: "/Agregar",
        templateUrl: "../../vistas/AdminAgregar/AdminAgregar.html"
      });
  }
]);
