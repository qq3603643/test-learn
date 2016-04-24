function limitTrag(id) {

    trag.call(this, id);
}

for (var i in trag.prototype) {

    limitTrag.prototype[i] = trag.prototype[i];
}

limitTrag.prototype.fn1 = function (ev) {

    var left = ev.pageX - this.x;
    var top = ev.pageY - this.y;

    if (left < 0) {

        left = 0;
    }
    if (top < 0) {
        top = 0;
    }
    $(this.id).css({
        left: left + 'px',
        top: top + 'px',

    })
}
