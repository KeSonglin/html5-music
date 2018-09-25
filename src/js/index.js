var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var songList = [];
var controlManager;
var audioControl = new root.AudioControl();

// 初始化加载歌曲列表中的第几首歌
var initSongIndex = 0;

function bindClick() {
    $scope.on('play:change', function (event,index) {
        audioControl.getAudio(songList[index].audio);
        $scope.append(audioControl.audio);
        if (audioControl.status === 'play') {
            audioControl.play();
            root.processor.start();
        }
        root.processor.renderAllTime(songList[index].duration)
        root.render(songList[index]);
        root.processor.updata(0);
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
            root.processor.stop();
        } else {
            audioControl.play();
            root.processor.start();
        }
        $(this).toggleClass('playing');
    });

    $scope.on('click', '.btn-like', function () {
        $(this).toggleClass('liking');
    });

    $scope.on('click', '.btn-list', function () {
        root.playList.show(controlManager);
    });
}


function getData(url) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            songList = data;
            controlManager = new root.ControlManager(initSongIndex, data.length);
            bindClick();
            root.playList.renderList(songList);
            $scope.trigger('play:change', initSongIndex);
        },
        error: function (error) {
            console.log(error);
        }
    });
}
getData('../../mock/data.json');