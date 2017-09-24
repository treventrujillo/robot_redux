class AddPostToProfile < ActiveRecord::Migration[5.1]
  def change
    add_column :profiles, :posts, :text
  end
end
