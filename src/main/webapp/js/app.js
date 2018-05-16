angular
    .module('librosApp', ['angular-growl'])
    .config(['growlProvider', function(growlProvider) {
        growlProvider.globalTimeToLive(2000);
    }])
    .factory('librosService', librosService)
    .controller('TodosLosLibrosCtrl', LibrosController)
    