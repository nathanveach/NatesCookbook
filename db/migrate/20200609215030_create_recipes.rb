class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.text :ingredients, null: false
      t.text :instructions, null: false
      t.string :image, default: 'https://believebamboo.s3-us-west-1.amazonaws.com/foodbg.jpg'

      t.timestamps
    end
  end
end
