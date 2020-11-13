class Api::V1::RecipesController < ApplicationController

  before_action :authenticate_admin!, only: [:create, :update, :destroy]
    
  def index
  	recipe = Recipe.all.with_attached_image.order(:name)
  	
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
  	params.require(:recipe).permit(:name, :ingredients, :instructions, :image)
  end

end
