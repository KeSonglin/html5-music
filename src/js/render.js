// 渲染页面
(function ($, root) {
    var $scope = $(document.body);

    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            root.blurImg(img, $scope);
            $scope.find('img').attr('src', src);
        }
    }

    function renderInfo(data) {
        var infoHtml = '<div class="song-name">'+ data.song +'</div>\
        <div class="singer-name">'+ data.singer +'</div>\
        <div class="album-name">'+ data.album +'</div>'
        $scope.find('.song-info').html(infoHtml);
    }

    function renderLikeBtn(isLike) {
        if (isLike) {
            $scope.find('.btn-like').addClass('liking');
        } else {
            $scope.find('.btn-like').addClass('liking');
        }
    }


    function render(data) {
        renderImg(data.image);
        renderInfo(data);
        renderLikeBtn(data.isLike);
    }

    root.render = render;

})(window.Zepto, window.player || (window.player = {}));