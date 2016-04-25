function $(Avr) {

    return new myQuery(Avr);
};


function getByClass(parent, str_class) {

    var els = parent.getElementsByTagName('*');
    var re = RegExp('\\b' + str_class + '\\b', '');
    var arr = [];

    for (var i = 0; i < els.length; i++) {

        if (re.test(els[i].className)) {
            arr.push(els[i]);
        }
    };

    return arr;
};

function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

function addEvent(obj, event, fn) {

    obj.attachEvent ? obj.attachEvent('on' + event, function () {
        if (!fn.call(obj)) {

            event.cancelBubble = true;
            return false;
        }
    }) : obj.addEventListener(event, function (ev) {

        if (!fn.call(obj)) {

            ev.cancelBubble = true;
            ev.preventDefault();
        }
    });

}

function now() {
    return (new Date()).getTime();
}

function connect(arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
        arr1.push(arr2[i]);
    };
    return arr1;
}

function getPos(obj) {
    var pos;
    var l = 0,
        t = 0;
    while (obj) {
        l += obj.offsetLeft;
        t += obj.offsetTop;
        obj = obj.offsetParent;
    };
    pos = {
        left: l,
        top: t,
    };
    return pos;
}

//以上为自定义帮助函数

function myQuery(Avr) {

    this.element = [];

    switch (typeof Avr) {

    case 'function':
        addEvent(window, 'load', Avr);
        break;
    case 'string':
        switch (Avr.charAt(0)) {
        case '#':
            this.element.push(document.getElementById(Avr.substr(1)));
            break;
        case '.':
            this.element = getByClass(document, Avr.substr(1));
            break;
        case '<':
            var re = /<|>/;
            var tag = Avr.split(re).join('');
            return document.createElement(tag);
            break;
        default:
            this.element = document.getElementsByTagName(Avr);
            break;
        }

        break;
    case 'object':
        this.element.push(Avr);
        break;
    }
};

myQuery.prototype.click = function (fn) {

    for (var i = 0; i < this.element.length; i++) {

        addEvent(this.element[i], 'click', fn);
    }
};

myQuery.prototype.hover = function (fn1, fn2) {

    for (var i = 0; i < this.element.length; i++) {

        addEvent(this.element[i], 'mouseover', fn1);
        addEvent(this.element[i], 'mouseout', fn2);
    }
};

myQuery.prototype.css = function (attr, value) {

    if (arguments.length == 2) {
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].style[attr] = value;
        }
    } else {
        switch (typeof attr) {
        case 'string':
            return getStyle(this.element[0], attr);
            break;
        default:
            for (var i = 0; i < this.element.length; i++) {

                for (var v in attr) {
                    this.element[i].style[v] = attr[v];
                }
            }
            break;
        }

    }
};

myQuery.prototype.index = function () {

    var oParent = this.element[0].parentNode;
    var Abrother = oParent.children;
    var i = [].indexOf.call(Abrother,this.element[0]);
    return i;
};

myQuery.prototype.offset = function () {
    var obj = this.element[0];
    return getPos(obj);
};

myQuery.prototype.outerWidth = function () {
    var obj = this.element[0];
    return obj.offsetWidth;
};

myQuery.prototype.outerHeigt = function () {
    var obj = this.element[0];
    return obj.offsetHeight;
};


myQuery.prototype.animation = function (json, times, fn) {

    var obj = this.element[0];
    var starTime = now();

    var iCur = {};
    for (var attr in json) {
        iCur[attr] = 0;
        if (attr == 'opacity') {
            iCur[attr] = Math.round(getStyle(obj, attr) * 100);
        } else {
            iCur[attr] = parseInt(getStyle(obj, attr));
        }
    };

    clearInterval(obj.timer);

    obj.timer = setInterval(function () {

        var changTime = now();
        var t = changTime - starTime < times ? changTime - starTime : times;

        for (var attr in json) {
            if ((json[attr] - iCur[attr]) == 0) {
                clearInterval(obj.timer);
            }
            var value = iCur[attr] + (t / times) * (json[attr] - iCur[attr]);
            if (attr == 'opacity') {
                obj.style.opacity = value / 100;
                obj.style.filter = 'alpha(opacity=' + value + ')';
            } else {
                obj.style[attr] = value + 'px';
            }

        }

        if (t == times) {
            clearInterval(obj.timer);
            if (fn) {
                fn.call(obj);
            }
        }
    }, 13)
};

myQuery.prototype.toggle = function () {
    var _arguments = arguments;

    var addToggle = function (obj) {
        var num = 0;
        addEvent(obj, 'click', function () {
            _arguments[num].call(obj);
            num++;
            num = num % _arguments.length;
        });

    };

    for (var i = 0; i < this.element.length; i++) {
        addToggle(this.element[i]);
    };
    return this;
};

myQuery.prototype.addClass = function (str_class) {

    for (var i = 0; i < this.element.length; i++) {
        var StrName = this.element[i].className;
        this.element[i].className = StrName + ' ' + str_class;
    }
};

myQuery.prototype.removeClass = function (str_class) {

    for (var i = 0; i < this.element.length; i++) {
        var StrName = this.element[i].className;
        var re = RegExp('\\b' + str_class + '\\b', '');
        this.element[i].className = StrName.split(re).join(' ');
    }
};

myQuery.prototype.toggleClass = function (str_class) {
    var _str_class = str_class;
    var addToggleClass = function (obj) {
        var value = obj.className;
        var re = RegExp('\\b' + _str_class + '\\b', '');
        if (re.test(value)) {
            value = value.split(re).join(' ');
            var re3 = /\s+$/;
            obj.className = value.replace(re3, '');
        } else {
            value = value + ' ' + _str_class;
            var re2 = /^\s+/;
            obj.className = value.replace(re2, '');
        }
    }

    for (var i = 0; i < this.element.length; i++) {
        addToggleClass(this.element[i]);
    };
};

myQuery.prototype.eq = function (m) {

    var ele = this.element[m];
    return $(ele);
};

myQuery.prototype.find = function (str) {

    var arr = [];
    switch (str.charAt(0)) {
    case '.':
        for (var i = 0; i < this.element.length; i++) {
            var eles = getByClass(this.element[i], str.substr(1));
            connect(arr, eles);
        }
        break;
    default:
        for (var i = 0; i < this.element.length; i++) {
            var eles = this.element[i].getElementsByTagName(str);
            connect(arr, eles);
        }
        break;
    };

    var newMyQuery = $();
    newMyQuery.element = arr;
    return newMyQuery;
};

myQuery.prototype.attr = function (attr, value) {

    if (arguments.length == 2) {
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].setAttribute(attr, value);
        }
    } else {
        return this.element[0].getAttribute(attr);
    }
};

myQuery.prototype.html = function (value) {

    if (value) {
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].innerHTML = value;
        }
    } else {
        return this.element[0].innerHTML;
    }
};

myQuery.prototype.text = function (value) {

    if (value) {
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].innerHTML = value;
        }
    } else {
        var str = this.element[0].innerHTML;
        var re = /<(\/)?[a-z]+>/g;
        return str.replace(re, '');
    }
};

myQuery.prototype.append = function (Value) {

    switch (typeof Value) {
    case 'string':
        for (var i = 0; i < this.element.length; i++) {

            this.element[i].innerHTML = this.element[i].innerHTML + Value;
        }
        break;
    case 'object':
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].appendChild(Value);
        }
        break;
    };
};

myQuery.prototype.prepend = function (Value) {

    switch (typeof Value) {
    case 'string':
        for (var i = 0; i < this.element.length; i++) {

            this.element[i].innerHTML = Value + this.element[i].innerHTML;
        }
        break;
    case 'object':
        for (var i = 0; i < this.element.length; i++) {
            var firstCh = this.element[i].children[0];
            if (firstCh) {
                this.element[i].insertBefore(Value, firstCh);
            } else {
                this.element[i].appendChild(Value);
            }
        }
        break;
    };
};

myQuery.prototype.extend = function (name, fn) {
    myQuery.prototype[name] = fn;
};

myQuery.prototype.trag = function () {

    var addTrag = function (obj) {
        obj.onmousedown = function (ev) {
            var ev = ev || window.event;
            var oldX = ev.clientX,
                oldY = ev.clientY;
            var x = obj.offsetLeft,
                y = obj.offsetTop;
            document.onmousemove = function (ev) {
                var ileft = ev.clientX - oldX + x,
                    itop = ev.clientY - oldY + y;
                obj.style.left = ileft + 'px';
                obj.style.top = itop + 'px';
            };
            document.onmouseup = function () {
                document.onmousemove = document.onmousemove = null;
            }

            return false;
        }
    }

    for (var i = 0; i < this.element.length; i++) {
        addTrag(this.element[i]);
    }
}