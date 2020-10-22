class Recipe < ApplicationRecord
	validates :name, presence: true
	validates :ingredients, presence: true
	validates :instructions, presence: true

	has_one_attached :image
end
