function $(vAr) {

    return new myQuery(vAr);
};

function addEvent(obj, event, fn) {

    obj.attachEvent ? obj.attachEvent(on + 'event', fn) : obj.addEventListener(event, fn, false);

};

function getByClass(tagName, Class) {

    var re = new RegExp('\\b' + Class + '\\b', '')
    var aEle = document.getElementsByTagName(tagName);
    var arr = [];
    for (var i = 0; i < aEle.length; i++) {

        var oEle = aEle[i].className;
        if (re.test(oEle)) {

            arr.push(aEle[i])
        }
    }
    return arr;
}

function myQuery(vAr) {

    this.element = [];

    switch (typeof vAr) {

        case 'function':
            addEvent(window, 'load', vAr);
            break;
        case 'string':

            switch (vAr.charAt(0)) {

                case '#':
                    this.element.push(document.getElementById(vAr.substr(1)));
                    break;
                case '.':
                    this.element = getByClass('*', vAr.substr(1));
                    break;
                default:
                    this.element = document.getElementsByTagName(vAr);
                    break;
            }

            break;
        case 'object':
            this.element = vAr;
            break;
    }

};


myQuery.prototype.click = function (fn) {

    for (var i = 0; i < this.element.length; i++) {
        addEvent(this.element[i], 'click', fn)
    }
}
