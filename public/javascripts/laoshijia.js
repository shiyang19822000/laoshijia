/**
 * Created by DAVID-MBP on 09/07/2017.
 */

$(function () {
    $(window).load(function () {
        this.recall();
        this.notifier('大院', '您回来啦!')
        this.weather();
    });

    $("#clear_cache").click(function (e) {
        e.preventDefault();
        $('#two .row').autobrowse('flush');
        window.location.reload();
    });

    $("#two .row").autobrowse({
        url: function (offset) {
            $('#two .row').autobrowse('flush');
            return url_courtyard + "/servlet/recall?offset=" + offset + "&limit=1";
        },
        template: function (response) {
            var markup = '';
            for (var i = 0; i < response.results.length; i++) {
                markup = picwall(response.results[i].full, response.results[i].thumb, markup)
                markup = wordswall(response.results[i].id, response.results[i].title, response.results[i].desc, markup);
            };
            return markup;
        },
        itemsReturned: function (response) {
            return response.results.length;
        },
        offset: 2,
        max: 10000,
        loader: '<div class="loader"></div>',
        useCache: true,
        expiration: 1,
    });
});

function notifier(title, data) {
    $.amaran({
        'message': title +': ' + data,
        'cssanimationIn': 'swing',
        'cssanimationOut': 'bounceOut',
        'position': 'top right'
    });
};

function savewords(obj) {
    var aj = $.ajax({
        url: url_courtyard + '/servlet/wordswall',
        data: {
            recall: obj.id,
            words: $("#message" + obj.id).val(),
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
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
        error: function () {
            alert("异常！");
        }
    });
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
        async: false,
        url: url_courtyard + "/servlet/wordswall?recall_id=" + id + "&offset=0&limit=3",
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
    markup += '<div class="11u 11u(xsmall)"><textarea name="message" id="' + 'message' + id + '" placeholder="留言" rows="1"></textarea></div>';
    markup += '<div class="1u$ 1u$(xsmall)"><a href="#" class="icon fa-send" onclick="savewords(this);" id=' + id + '><span class="label">提交留言</span></a></div>';
    markup += '</div>';
    markup += '</article>';
    markup += '</article>';
    return markup;
};

function picwall(full, thumb, markup) {
    markup += '<article class="6u 12u$(xsmall) work-item">';
    markup += '<a href="' + full + '" class="image fit thumb" style="outline: 0px;"><img src="' + thumb + '" alt="" title=""/></a>';
    markup += '</article>';
    return markup;
};

function recall() {
    $.ajax({
        type: "get",
        url: url_courtyard + "/servlet/recall?offset=0&limit=2",
        data: "",
        success: function (response) {
            var markup = '';
            for (var i = 0; i < response.results.length; i++) {
                markup = picwall(response.results[i].full, response.results[i].thumb, markup)
                markup = wordswall(response.results[i].id, response.results[i].title, response.results[i].desc, markup);
            };
            $("#two .row").html(markup);
        }
    });
};

function weather() {
    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(){
        console.log(remote_ip_info);
    });
    $.ajax({
        type: "get",
        async: false,
        url: "https://free-api.heweather.com/v5/weather?city=yichang&key=77de0b0bead44449b7432e844e186970",
        data: "",
        success: function (response) {
            if (response["HeWeather5"][0]['status'] != "unknown city") {
                var title = "提示";
                notifier(title, response["HeWeather5"][0]["basic"]['city']
                    + " " + response["HeWeather5"][0]["now"]['cond']['txt']
                    + " " + response["HeWeather5"][0]["now"]['tmp']
                    + " " + response["HeWeather5"][0]["suggestion"]['comf']['brf']
                    // + " " + response["HeWeather5"][0]["suggestion"]['comf']['txt']
                );
            }
        }
    });
};

// var url_courtyard = "http://localhost:3000";
// var url_courtyard = "http://114.215.29.0:3000";
var url_courtyard = "http://ali.shangpinmatou.com:3000";

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
