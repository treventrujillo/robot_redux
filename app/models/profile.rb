class Profile < ApplicationRecord

  def self.random_profiles(ids)
    liked = id.any? ? ids : [0]
    where("id NOT IN (?)", liked).order("RANDOM()")
  end

  def self.added(ids)
    added = ids.any? ? ids : [0]
    where("id IN (?)", added)
  end 

end
