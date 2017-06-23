angular
    .module('librosApp', ['ngAnimate', 'ngResource', 'chieffancypants.loadingBar'])
    .factory('librosService', librosService)
    .controller('TodosLosLibrosCtrl', LibrosController)
