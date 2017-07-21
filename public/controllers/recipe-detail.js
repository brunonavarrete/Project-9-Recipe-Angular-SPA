!(function(){
	'use strict'
	angular.module('app')
	.controller('RecipeDetailController', function($scope,$routeParams,dataService){ // $routeParams from $routeProvider
		$scope.go = dataService.go;
		// get recipe
			$scope.getRecipe = function(id){
				dataService.getRecipe(id,function( res ){
					$scope.recipe = res.data;
					$scope.title = $scope.recipe.name;
					console.log( $scope.recipe );
				});
			}
		// set up
			if( $routeParams.id ){ // if edit
				$scope.getRecipe($routeParams.id);
			} else { // if add
				$scope.recipe = {
					'ingredients': [{}],
					'steps': [{}]
				};
				$scope.title = 'Add New Recipe';
			}
		// get categories
			dataService.getCategories(function( res ){ 
				$scope.categories = res.data;
			});
		// get food items
			dataService.getItems(function( res ) {
				$scope.items = res.data;
				console.log( $scope.items );
			});
		// add ingredient
			$scope.addIngredient = function(){
				var newIngredient = {}
				$scope.recipe.ingredients.push( newIngredient );
			}
		// delete ingredient
			$scope.deleteIngredient = function(index){
				$scope.recipe.ingredients.splice( index, 1 );
				$scope.recipe.ingredients = ( !$scope.recipe.ingredients.length ) ? [{}] : $scope.recipe.ingredients;
			}
		// add step
			$scope.addStep = function(){
				var newStep = {}
				$scope.recipe.steps.push( newStep );
			}

		// delete step
			$scope.deleteStep = function(index){
				$scope.recipe.steps.splice( index, 1 );
				$scope.recipe.steps = ( !$scope.recipe.steps.length ) ? [{}] : $scope.recipe.steps;
			}
		// save recipe
			$scope.saveRecipe = function(){
				dataService.postRecipe($scope.recipe,function(){
					$scope.go('/');
					alert($scope.recipe.name+' was saved!');
				});
			}
		// update recipe
			$scope.updateRecipe = function(){
				dataService.putRecipe($scope.recipe,function( res ){
					// get recipe
						$scope.getRecipe($routeParams.id);
						alert($scope.recipe.name+' was updated!');
				});
			}

	});
})();