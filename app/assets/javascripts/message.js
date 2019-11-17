$(function(){

  function buildHTML(message){
    var message_image = message.image.url? `<img class="lower-message__image" src="${ message.image.url }" {width="200px" height="160px"}>` : "";
    var html = `<div class="message" data-group-id="${ message.group_id }" data-id="${ message.id }">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${ message.content }
                    </p>
                    ${ message_image }
                  </div>
                </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージを入力して下さい');
      $('.form__submit').prop('disabled', false);
    })
  })

  $(function(){
    if(location.href.match(/\/groups\/\d+\/messages/)){
      setInterval(reloadMessages, 7000);
    }
  });
  function reloadMessages() {
    if($('.message')[0]) {
      var last_message_id = $('.message:last').attr('data-id');
      var group_id = $('.message').attr('data-group-id');
    } else {
      var last_message_id = 0;
    }
    url = '/groups/' + group_id + '/api/messages';

    $.ajax({
      url: url,
      type: "GET",
      data: {id: last_message_id, group: group_id},
      dataType: 'json'
    })
    .done(function(messages) {
      if(messages != "null") {
        $.each(messages, function(i, message){
          var html = buildHTML(message);
          $('.messages').append(html);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
        });
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました')
    });
  }

});