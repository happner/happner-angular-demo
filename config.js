

module.exports = {
  name: 'happner-angular-demo',
  datalayer: {
	adminPassword: 'happner-angular-demo',
	log_level: 'info|error|warning',
	filename:__dirname + '/db/' + require('shortid').generate() + '_database.nedb'
  },
  modules: {
  	'happner-angular-demo':{path: __dirname + '/happner-angular-demo.js'}
  },
  components:{
  	 'happner-angular-demo': {
      startMethod:"initialize",
      schema:{
        "exclusive":false
      },
      web:{
        routes:{
         "static":"app"
        }
      }
    }
  }
}

