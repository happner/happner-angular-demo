// declare a module
var happnerAngular = angular.module('happner-service', []);

happnerAngular.service('happnerService', ['$rootScope', function($rootScope) {
 
	var _this = this;

  _this.settings = {authenticated:false};

 	if (!MeshClient)
 		throw new Error('happner mesh client has not been referenced, please check your html');

 	_this.authenticate = function(dbuser, dbpassword, done){
 		
    var adminClient = new MeshClient();//defaults to the server and port of this happner instance

    // Credentials for the login method
    var credentials = {
      username: dbuser, // pending
      password: dbpassword
    }

    adminClient.login(credentials).then(function(){

      _this.__clientInstance = adminClient;
      _this.settings.authenticated = true;

      $rootScope.$apply();

      done();

    }).catch(done);
  };

 	_this.getClient = function(){
 		if (!this.__clientInstance) throw new Error('you have not authenticated yet');
 		return this.__clientInstance;
 	}

}]);

