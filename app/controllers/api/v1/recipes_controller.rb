class Api::V1::RecipesController < ApplicationController
  def index
  	recipe = Recipe.all.order(created_at: :desc)
  	render json: recipe
  end

  def create
  	recipe = Recipe.create!(recipe_params)
  	if recipe
  		render json: recipe
  	else
  		render json: recipe.errors
  	end
  end

  def show
  	if recipe
  		render json: recipe
  	else
  		render json: recipe.errors
  	end
  end

  def update
    if recipe.update(recipe_params)
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def destroy
  	recipe&.destroy
  	render json: { message: 'Recipe DESTROYED!' }
  end


  private

  def recipe
  	@recipe ||= Recipe.find(params[:id])
  end
  
  def recipe_params
  	params.require(:recipe).permit(:name, :image, :ingredients, :instructions)
  end

end
