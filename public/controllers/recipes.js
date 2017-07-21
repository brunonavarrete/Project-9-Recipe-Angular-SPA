!(function(){
	'use strict'
	angular.module('app')
	.controller('RecipesController', function($scope,dataService){
		$scope.go = dataService.go;
		// get recipes
			dataService.getRecipes(function( res ){ 
				$scope.recipes = res.data;
				$scope.filter = null;
			});
		// get categories
			dataService.getCategories(function( res ){ 
				$scope.categories = res.data;
			});

		// filter
			$scope.filterRecipes = function( category ){
				if( category == null ){
					dataService.getRecipes(function( res ){ 
						$scope.recipes = res.data;
					});
				} else {
					dataService.getRecipesInCategory(category,function(res){
						$scope.recipes = (res.data.length) ? res.data : 0;
					});
				}
			}

		// delete recipe
			$scope.deleteRecipe = function(index,id){
				dataService.deleteRecipe(id,function( res ){
					$scope.recipes.splice( index, 1 );
				});
			}
	});
})();