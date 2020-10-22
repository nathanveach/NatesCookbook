json.array! @recipes do |r| 
	json.extract! r, :id, :name
	json.photoUrl url_for(r.image)
end
