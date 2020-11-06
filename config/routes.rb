Rails.application.routes.draw do

  devise_for :admins, skip: [:registrations]
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      patch 'update/:id', to: 'recipes#update'
      delete '/destroy/:id', to: 'recipes#destroy'
    end
  end
  root 'homepage#index'
  get :search, controller: :search

  # This is for active storage to work with react
  get '/*path', to: 'homepage#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
