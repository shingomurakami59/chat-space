json.user_name @message.user.name
json.content @message.content

json.created_at @message.created_at.datetime.to_s(:datetime)
json.image @message.image.url
json.id @message.id
json.group_id @message.group_id

json.created_time @message.created_at.to_s(:datetime)
json.image @message.image.url

