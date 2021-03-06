$(function(){ 


  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat-main__chat').append(insertHTML);
        $('.chat-main__chat').animate({ scrollTop: $('.chat-main__chat')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  function buildHTML(message){
   if ( message.image ) {
    var html =
    `<div class="message" data-message-id=${message.id}>
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
     `<div class="message" data-message-id=${message.id}>
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
//$(function(){});の閉じタグの直上(処理の最後)に以下のように追記
if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
}
})