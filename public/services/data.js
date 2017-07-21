!(function(){
	'use strict'
	angular.module('app')
	.service('dataService', function( $http, $location ) {

		// get all recipes
			this.getRecipes = function(callback){
				$http.get('/api/recipes')
				.then( callback ); // get data synchronously (promise)
			}

		// get all categories
			this.getCategories = function(callback){
				$http.get('/api/categories')
				.then(callback);
			}

		// get food items
			this.getItems = function(callback){
				$http.get('/api/fooditems')
				.then(callback);
			}

		// get recipes in category
			this.getRecipesInCategory = function(category,callback){
				$http.get('/api/recipes?category='+category)
				.then(callback);
			}

		// get recipe
			this.getRecipe = function(id,callback){
				$http.get('/api/recipes/'+id)
				.then(callback);
			}

		// put recipe
			this.putRecipe = function(recipe,callback){
				$http.put('/api/recipes/'+recipe._id,recipe)
				.then(callback);
			}

		// post recipe
			this.postRecipe = function(recipe,callback){
				$http.post('/api/recipes',recipe)
				.then(callback);
			}

		// delete recipe
			this.deleteRecipe = function(id,callback){
				$http.delete('/api/recipes/'+id)
				.then(callback);
			}

		// return to recipes.html
			this.go = function(url){
				$location.url(url);
			}

	});
})();