json.recipes do
  json.array!(@recipes) do |recipe|
  	json.id recipe.id
    json.name recipe.name
  end
end
