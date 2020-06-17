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


    $(function() {
      var b = $('.chat-main__chat');
      console.log('コンテンツ本体：' + b.height() + '×' + b.width());
      console.log('内部余白込み：' + b.innerHeight() + '×' + b.innerWidth());
      console.log('枠線込み：' + b.outerHeight() + '×' + b.outerWidth());
      console.log('外部余白込み：' + b.outerHeight(true) + '×' + b.outerWidth(true));
    });

  })
})
});