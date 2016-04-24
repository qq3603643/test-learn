function trag(id) {
    var _this = this;
    this.id = id;

    this.x = 0;
    this.y = 0;


    $(this.id).mousedown(function (ev) {

        var ev = ev || window.event;

        _this.fn3(ev);


        $(document).mousemove(function (ev) {
            var ev = ev || window.event;

            _this.fn1(ev);

        })

        $(document).mouseup(function () {

            _this.fn2()

        })
        return false;
    })

}

trag.prototype.fn3 = function (ev) {

    this.x = ev.pageX - $(this.id).offset().left;
    this.y = ev.pageY - $(this.id).offset().top;


}
trag.prototype.fn1 = function (ev) {

    $(this.id).css({
        left: ev.pageX - this.x + 'px',
        top: ev.pageY - this.y + 'px',

    })
}
trag.prototype.fn2 = function () {

    $(document).off();

}
