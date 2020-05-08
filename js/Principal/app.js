var app = angular.module("contenedor", ["ui.router"]);

app.config([
  "$urlRouterProvider",
  "$stateProvider",
  function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/Contenedor");

    $stateProvider
      .state("contenedor", {
        url: "/Contenedor",
        templateUrl: "contenido.html",
      })
      .state("registro", {
        url: "/Registrarse",
        templateUrl: "../../vistas/Registrarse/Registrarse.html",
      })
      .state("iniciosesion", {
        url: "/InicioSesion",
        templateUrl: "../../vistas/InicioSesion/InicioSesion.html",
      });
  },
]);
