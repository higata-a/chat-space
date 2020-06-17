$(function() {
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $('#chat-group-users.js-add-user').empty();
        console.log(user)

        if (input.length !== 0) {
          users.forEach(function(user){
            console.log(user);
            var html = `
            <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">ユーザー名</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
            </div>
            `
            $('#chat-group-users.js-add-user').append(html);

          });
        }
        else {
        }

        })


      .fail(function() {
        var html = `
        <div class="chat-group-user clearfix">
         <p class="chat-group-user__name">ユーザーが見つかりません</p>
        </div>`
        $('#chat-group-users.js-add-user').append(html);
      });
  });
});