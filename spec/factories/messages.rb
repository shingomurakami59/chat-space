FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/spec/images/futsal.jpg")}
    user
    group
  end
end