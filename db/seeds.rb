25.times do
  name = Faker::Name.name
  age = Faker::Number.between(18, 40)
  gender = ["Male", "Female", "Other"].sample
  avatar = Faker::Avatar.image(name, '100x100', 'png', 'set3')
  bio = Faker::Lorem.paragraph
  Profile.create(
    name: name,
    age: age,
    gender: gender,
    avatar: avatar,
    bio: bio
  )
  puts "Profile Created"
end

