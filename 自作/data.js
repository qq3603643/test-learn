$(function () {

    function getT() {
        var d = new Date(),
            str = '';
        var vYear = d.getFullYear(),
            vMon = d.getMonth() + 1,
            vDate = d.getDate();
        var toTwo = function (num) {

            return num >= 10 ? num : '0' + num;
        };

        str = vYear + '-' + toTwo(vMon) + '-' + toTwo(vDate);
        return str;
    };

    (function () {

        $('#actor').val($('#worker').val());
        $('#endtime').val(getT());

    })();


})