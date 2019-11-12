json.user_name @message.user.name
json.content @message.content
json.created_time @message.created_at.to_s(:datetime)
json.image @message.image.url 