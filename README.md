## ng2-rest ##

Multi-endpoint REST api with **Angular 2.** Alternative to angularjs $resource.

Take advantage of ENUM in typescript and generic class and
define your **multiple endpoints url**. Playing with your REST
API was never so easy...

Also **mocking** data is super nice here. You can use mock contrller to randomize
and customize your response data successes and errors ( by returning undefined in
mock controller). 

Also there new option for **production mode** -
your app will be using normal request even if mock are defined.



To install package run:

    npm install ng2-rest --save




Simple use:


    import { Resource } from 'ng2-rest/ng2-rest';
    import { JSONP_PROVIDERS } from '@angular/http';
    
and class to your bootstrap:

    bootstrap(App, [
              SOME_APP_PROVIDERS, 
              JSONP_PROVIDERS // required  
              Resource // our ng2-rest
           ]);

build your enum with endpoints ( you can also use strings, but enum's are better !) :
	
    enum ENDPOINTS { // enum instead of strings
    	    API,
    	    OTHER_API
    	}


Define interfaces for response

    import { User, Book, Weather } from './models' // interface

Map your urls and models
   
     @Injectable()
        export class SampleServiceORComponent { 
                        // < enum or 'string', single_model, query_model>
            constructor(private rest: Resource<ENDPOINTS,User,User[]>) {
            
	            // map endpoints and urls
                Resource.map(ENDPOINTS.API.toString(), 'http://localhost:/api');
				Resource.map(ENDPOINTS.OTHER_API.toString(), 'http://example.com/api');
				
				// define your models  
                rest.add(ENDPOINTS.API, 'users'); 
                
                
              }
                    // create your fluent API
              model = {
                getAll:  this.rest.api(ENDPOINTS.API, 'users').query(),
                getAllSorted:  this.rest.api(ENDPOINTS.API, '/users/inside').query({ sorted: true }),
                getSuperUser: this.rest.api(ENDPOINTS.API, 'users/super').get(0),
                saveCurrentUser : this.rest.api(ENDPOINTS.API, 'users').save(this.user)
              };

              // NEW! mock your request
		     users = [ { name:"name1":id:1 }, { name:"name2":id:2 }   ]
			 mock_controller = (user, params) => { 
			     user.id = params.id;
			     return user; 
			 }
             mocked_models = {
                getAllMocks:  this.rest.api(ENDPOINTS.API, 'users')
                  .mock(JSON.stringify(this.users)).query(),
               getFirstMock:  this.rest.api(ENDPOINTS.API, 'users')
                  .mock(require('user.json')), 1000).get(0), // timeout 1000ms = 1s
                getDataFromController:  this.rest.api(ENDPOINTS.API, 'users')
                  .mock(require('user.json')), 0, mock_controller).get(100),
             };

              user:User;
              
             }

Use it:
		

    giveMeSampleUsers() {
    
 		this.rest.api(ENDPOINTS.API, 'users')
		 .query() // 
		 .subscribe((users) => {  // Type of respone wil be User[] 
            console.log('users', users);
        })
        
     }
		


API
-------
Optionally object parameters in methods below are created by encodeURIComponent(JSON.stringif(params)) so **in your backend** you need to use function **decodeURIComponent(params) **  to get ids, params from passed url. You don't need to do that in mock controlelrs.

| Name | Parameters  | Description | Example | 
| :---: | --- | --- | ---: |
| **query** | `nothing or object ` |  fetch array of your models, optionally with parameters | `getModels()`, `getSortedModels({sort:true})` |
| **get** | `id or object ` |   get model by id, optionally by parameters  | `getUser(1)`, `getSomeModel( {  color : 'blue' })` |
| **save** | `object ` |   post object model | `saveUser({ name: 'Dario', age: 26 })`  |
| **update** | `id or object ` |   put object model | `updateUser(1,object)`, `updateUsers( {  color : 'blue' },  {  banned: true  } )` |
| **remove** | `id or object ` |   remove object by id by params | `removeUser(1)`, `removeModels( {  color : 'blue' })` |
| **jsonp** | `nothing` |   get jsonp data | `getDataFromOtherServer()` |



Mock controller
-------

It is one of the best features here. You don't need a backend for your front-end stuff ! 

 - first argument is data from passed to function **mock( here ..., .. )**
 - second arguments are params from 
 - to create error request return undefined or nothing
 - use console.log | console.error | console.info to debug your backed
 - do not use exceptions

