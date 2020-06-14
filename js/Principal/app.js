var app = angular.module("contenedor", ["ui.router"]);

app.config([
  "$urlRouterProvider",
  "$stateProvider",
  function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/Inicio");

    $stateProvider
      .state("contenedor", {
        url: "/Inicio",
        templateUrl: "contenido.html",
      })
      .state("registro", {
        url: "/Registrarse",
        templateUrl: "../../vistas/Registrarse/Registrarse.html",
      })
      .state("iniciosesion", {
        url: "/InicioSesion",
        templateUrl: "../../vistas/InicioSesion/InicioSesion.html",
      })
      .state("politicas", {
        url: "/Politicas",
        templateUrl: "../../vistas/Registrarse/Politicas.html",
      })
      .state("terminos", {
        url: "/Terminos",
        templateUrl: "../../vistas/Registrarse/Terminos.html",
      })
      .state("ayuda", {
        url: "/Ayuda",
        templateUrl: "../../vistas/Principal/ayuda.html",
      })
      .state("terminos_pasajero", {
        url: "/Terminos_Condiciones",
        templateUrl: "../../vistas/Registrarse/Terminos_Pasajero.html",
      });
  },
]);
