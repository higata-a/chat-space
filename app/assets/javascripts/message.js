$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
    var html =
    `<div class="message">
      <div class="message__chat">
        <div class="message__chat--info">
          <div class="message__chat--info-user">
            ${message.user_name}
          </div>
          <div class="message__chat--info-ts">
            ${message.created_at}
          </div>
        </div>
        <div class="message__chat--info-mess">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        <img src=${message.image} >
      </div>
      </div>`
    return html;
   } else {
     var html =
     `<div class="message">
        <div class="message__chat">
          <div class="message__chat--info">
            <div class="message__chat--info-user">
             ${message.user_name}
            </div>
            <div class="message__chat--info-ts">
            ${message.created_at}
            </div>
          </div>
          <div class="message__chat--info-mess">
            <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action');
 $('.input-box__submit-btn').removeAttr('data-disable-with');
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__chat').append(html);
    $('form')[0].reset();
    $('.chat-main__chat').animate({ scrollTop: $('.chat-main__chat')[0].scrollHeight});

  })

  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });

})
});