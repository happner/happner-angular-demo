'use strict';

var gridApp = angular.module('happner-angular-demo', [  
  'happner-service'
]);

gridApp.controller('happner-angular-demo-controller', ['$scope', 'happnerService', function($scope, happnerService) {

   $scope.logs = [];

   var pushLog = function(type, description, data){

   	$scope.logs.push({type:type, description:description, timestamp:new Date().toString(), data:JSON.stringify(data)});

   	try{
   		$scope.$apply();
   	}catch(e){

   	}

   }

   happnerService.authenticate('_ADMIN', 'happner-angular-demo', function(e){

   	if (e){
   		pushLog('danger', 'error', e.toString());
   	}else{

   		try{
   			var happnerClient = happnerService.getClient();

   			//ADD A TEST GROUP

   			pushLog('info', 'have client');

   			pushLog('info', 'have client', happnerClient.exchange);
   			var testGroup = {
			    name:'TEST GROUP',
			    
			    custom_data:{
			      customString:'custom1',
			      customNumber:0
			    },

			    permissions:{
			      methods:[
			        //in a /Mesh name/component name/method name - with possible wildcards
			        '/testadvancedSecurity/security/*'
			      ],
			      events:[
			         //in a /Mesh name/component name/event key - with possible wildcards
			         '/testadvancedSecurity/security/*'
			      ]
			    }
			}


			var testGroupSaved;
			var testUserSaved;
  

			happnerClient.exchange['happner-angular-demo'].security.addGroup(testGroup, function(e, result){

			  if (e) return pushLog('danger', 'error',  e.toString());

			  testGroupSaved = result;
			  pushLog('success', 'group saved',JSON.stringify(testGroupSaved));

			  var testUser = {
			    username:'TEST USER',
			    password:'TEST PWD',
			    custom_data:{
			      something: 'usefull'
			    }
			  }

			   happnerClient.exchange.security.addUser(testUser, function(e, result){
			        if (e) return pushLog('danger', 'error',  e.toString());

			        testUserSaved = result;
			        pushLog('success', 'user saved', result);


			         happnerClient.exchange.security.linkGroup(testGroupSaved, testUserSaved, function(e, userGroup){
				      //we'll need to fetch user groups, do that later
				      if (e) return pushLog('danger', 'error', e.toString());

				       pushLog('success', 'group linked', userGroup);

				    });

			     });

			});

   		}catch(e){
   			pushLog('danger', e.tostring());
   		}
   	}

   });
}]);

