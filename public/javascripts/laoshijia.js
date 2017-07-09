/**
 * Created by DAVID-MBP on 09/07/2017.
 */

function test(obj) {
    alert(obj.id);
    alert(obj.parentNode.textContent)
    i = 3
    alert($("#message" + i).val())
    // alert(obj.parentNode);
    // $("#two .row #demo-message").innerHTML = '<ul><li>hello</li></ul>';
    // obj.parentNode.innerHTML = '<ul><li>hello</li></ul>';

    // markup += '<article class="6u$ 12u$(xsmall) work-item">';
    // markup += '<ul class="alt">';
    // markup += '<li>今天天气不错.</li>';
    // markup += '<li>都在忙什么，最近.</li>';
    // markup += '<li>祝愿我们的家庭变的更好.</li>';
    // markup += '</ul>';
    // markup += '<a href="#" class="icon fa-send" onclick="test(this);" id=' + response.results[i].id + '><span class="label">提交留言</span></a>'
    // markup += '<a href="#"><span class="label">&nbsp;&nbsp;&nbsp;</span></a>';
    // markup += '<a href="#" class="icon fa-recycle"><span class="label">清除留言</span></a>'
    // markup += '<a href="#"><span class="label">&nbsp;&nbsp;&nbsp;</span></a>';
    // markup += '<a href="#" class="icon fa-arrow-circle-o-left"><span class="label">下一页</span></a>';
    // markup += '<a href="#"><span class="label">&nbsp;&nbsp;&nbsp;</span></a>';
    // markup += '<a href="#" class="icon fa-arrow-circle-o-right"><span class="label">上一页</span></a>';
    // markup += '<textarea name="demo-message" id="demo-message" placeholder="留言" rows="1"></textarea>';
    // markup += '</article>';
};

function picwall(full, thumb, markup) {
    markup += '<article class="6u 12u$(xsmall) work-item">';
    // if (i % 2 == 0) {
    //          markup += '<article class="6u 12u$(xsmall) work-item">';
    //      } else {
    //          markup += '<article class="6u$ 12u$(xsmall) work-item">';
    // }
    markup += '<a href="' + full + '" class="image fit thumb" style="outline: 0px;"><img src="' + thumb + '" alt="" title=""/></a>';
    markup += '</article>';
    return markup;
};

function wordswall(id, title, desc, markup) {
    markup += '<article class="6u$ 12u$(xsmall) work-item">';
    markup += '<article class="12u$ 12u$(xsmall) work-item">';
    markup += '<h3>' + title + '</h3>';
    markup += '<p>' + desc + '</p>';
    markup += '</article>';
    markup += '<article class="12u$ 12u$(xsmall) work-item">';
    markup += '<ul class="alt">';
    $.ajax({
        type: "get",
        async : false,
        url: "http://localhost:3000/servlet/wordswall?recall=" + id + "offset=0&limit=3",
        // url: "http://114.215.29.0:3000/servlet/wordswall?recall=" + id + "offset=0&limit=3",
        data: "",
        success: function (response) {
            for (var i = 0; i < response.results.length; i++) {
                markup += '<li>' + response.results[i].words + '</li>';
            };
        }
    });
    markup += '</ul>';
    markup += '</article>';
    markup += '<div class="row uniform 50%">';
    markup += '<div class="11u 11u(xsmall)"><textarea name="message" id="' + 'message' + id  + '" placeholder="留言" rows="1"></textarea></div>';
    markup += '<div class="1u$ 1u$(xsmall)"><a href="#" class="icon fa-send" onclick="savewords(this);" id=' + id + '><span class="label">提交留言</span></a></div>';
    markup += '</div>';
    markup += '</article>';
    markup += '</article>';
    return markup;
};

function savewords(obj) {
    var aj = $.ajax( {
        url:'http://localhost:3000/servlet/wordswall',
        // url:'http://114.215.29.0:3000/servlet/wordswall',
        data:{
            recall : obj.id,
            words : $("#message" + obj.id).val(),
            username: "shiyang",
            password: "1qaz@wsX"
        },
        type:'post',
        cache:false,
        dataType:'json',
        success:function(data) {
            // if(data.msg =="true" ){
            //     alert("修改成功！");
            //     window.location.reload();
            // }else{
            //     console.log(data);
            //     alert(data['detail']);
            // }
            console.log(data);
            window.location.reload();
        },
        error : function() {
            alert("异常！");
        }
    });
};
