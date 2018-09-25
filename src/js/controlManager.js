// 当前播放索引
(function ($, root) {
    function ControlManager(index, len) {
        this.index = index;
        this.len = len;
    }
    ControlManager.prototype = {
        prev: function () {
            return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        getIndex: function (val) {
            var index = this.index;
            var len = this.len;
            var curIndex = (index + len + val) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.ControlManager = ControlManager;

})(window.Zepto, window.player || (window.player = {}));