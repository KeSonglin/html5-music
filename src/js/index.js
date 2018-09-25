var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var songList = [];
var controlManager;
var audioControl = new root.AudioControl();

// 初始化加载歌曲列表中的第几首歌
var initSongIndex = 0;

console.log(audioControl);

function bindEvent() {
    $scope.on('play:change', function (event,index) {
        audioControl.getAudio(songList[index].audio);
        $scope.append(audioControl.audio);
        if (audioControl.status === 'play') {
            audioControl.play();
        }
        root.render(songList[index]);
    });
    $scope.on('click', '.btn-prev', function () {
        $scope.trigger('play:change', controlManager.prev() );
    });
    $scope.on('click', '.btn-next', function () {
        $scope.trigger('play:change', controlManager.next() );
    });
    $scope.on('click', '.btn-play', function () {
        if (audioControl.status === 'play') {
            audioControl.pause();
        } else {
            audioControl.play();
        }
        $(this).toggleClass('pause');
    });

    $scope.on('click', '.btn-like', function () {
        $(this).toggleClass('liking');
    });

    $scope.on('click', '.btn-list', function () {

    });
}

function getData(url) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            songList = data;
            controlManager = new root.ControlManager(initSongIndex, data.length);
            bindEvent();
            $scope.trigger('play:change', initSongIndex);
        },
        error: function (error) {
            console.log(error);
        }
    });
}
getData('../../mock/data.json');