function _dig (obj, ... path) {
    for (let i = 0; obj && i < path.length; i++) obj = obj[path[i]];
    return obj;
}

function _every (arr, m) {
    for (const a of arr) {
        if (!m(a)) {
            return false;
        }
    }

    return true;
}

function _pushUnlessIncludes(arr, obj) {
    if (arr.indexOf(obj) === -1) {
        arr.push(obj);
    }
}

function _escape (string) {
    return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

function _scale (value, oldValue, newValue) {
    return Math.ceil(value / oldValue * newValue);
}

function _excludes (arr, obj) {
    return !arr.includes(obj);
}

function _clamp (value, min, max) {
    return value <= min ? min : (value >= max ? max : value);
}

function _remove (arr, obj) {
    if (arr) {
        const index = arr.indexOf(obj);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }
}

function _filterInPlace (array, predicate) {
    let index1 = 0;
    let index2 = 0;

    while (index1 < array.length) {
      if (predicate(array[index1])) {
        array[index2] = array[index1];
        index2++;
      }

      index1++;
    }

    array.length = index2;
}

function _compact (obj) {
    return obj.filter(val => val);
}

function _sortDesc (array, map) {
    if (map) {
        return array.sort((a, b) => map(b) - map(a));
    } else {
        return array.sort((a, b) => b - a);
    }
}

function _intKeys(hash) {
    return Object.keys(hash).map(v => parseInt(v));
}

function _safeInt(val) {
    if (isNaN(val)) {
        return undefined;
    } else {
        return parseInt(val);
    }
}

function _sortAsc (array, map) {
    if (map) {
        return array.sort((a, b) => map(a) - map(b));
    } else {
        return array.sort((a, b) => a - b);
    }
}

function _lenWhere (array, filter) {
    let count = 0;
    for (const obj of array) {
        if (filter(obj)) count++;
    }
    return count;
}

function _between (val, min, max) {
    return val > min && val < max;
}

function _uuid (data) {
    return `${ data.identifier }-${ data.timestamp }`;
}

function _uniq (array) {
    return Array.from(new Set(array));
}

function _sum (array, base = 0) {
    return array.reduce((m, v) => m + v, base);
}

function _mappedSum (array, map, base = 0) {
    return array.reduce((m, v) => m + map(v), base);
}

function _sliceLen (array, begin, len) {
    return array.slice(begin, begin + len);
}

function _formatPrefix (prefix) {
    if (_empty(prefix)) {
        return '';
    }

    const splitPrefix = prefix.split('_');
    const properName = splitPrefix[0].charAt(0).toUpperCase() + splitPrefix[0].slice(1);
    const properDomain = splitPrefix[1].toUpperCase();

    return `${properName} .${properDomain}`;
}

function _sequence (length, base = 0) {
    return Array.from({ length }, (_, i) => i + base);
}

function _arrayFromIndexes (indexes, processor, base = []) {
    return indexes.reduce((memo, index, i) => {
        memo[index] = processor(index, i);
        return memo;
    }, base);
}

function _merge (target, source) {
    for (const key of Object.keys(source)) {
        if (!target.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }

    return target;
}

function _arrayToHash (array, processor, base = {}) {
    return array.reduce((memo, object, i) => {
        const [key, value] = processor(object, i);
        memo[key] = value;
        return memo;
    }, base);
}

function _arrayToDefaultHash (array, value, base = {}) {
    return array.reduce((memo, object) => {
        memo[object] = value;
        return memo;
    }, base);
}

function _invert (hash, integerKeys = false) {
    return Object.entries(hash).reduce((memo, [key, value]) => {
        memo[value] = integerKeys ? parseInt(key) : key;
        return memo;
    }, {});
}

function _groupBy (array, processor) {
    let groups = {};
    for (const object of array) {
        let key = processor(object);
        if (groups[key]) {
            groups[key].push(object);
        } else {
            groups[key] = [object];
        }
    }

    return groups;
}

function _empty (obj) {
    if (obj instanceof Set) {
        return obj.size == 0;
    } else if (obj instanceof Array) {
        return obj.length == 0;
    } else if (typeof obj === 'string') {
        return obj.length == 0;
    } else if (typeof obj === 'undefined') {
        return true;
    } else {
        return Object.keys(obj).length == 0;
    }
}

function _notEmpty (obj) {
    return !_empty(obj);
}

function _hashCode (str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    return hash;
}

function _strToHSL (str) {
    return `hsl(${ (_hashCode(str) * 113) % 360 }, 100%, 30%)`;
}

function _stringToBinary(str) {
    const arr = new Uint16Array(str.length);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = str.charCodeAt(i);
    }

    return btoa(String.fromCharCode(...new Uint8Array(arr.buffer)));
}

function _binaryToString(bin) {
  const binary = atob(bin);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

function _strictSlice (array, length, def) {
    const arr = Array.from({ length }).fill(def);
    for (let i = 0; i < Math.min(length, array.length); i++) {
        arr[i] = array[i];
    }
    
    return arr;
}

function * _eachBlock(arr, size) {
    for (let i = 0; i < arr.length / size; i++) {
        yield arr.slice(i * size, i * size + size);
    }
}

function _fastMax(arr) {
    let m = arr[0];
    for (let i of arr) {
        if (i > m) m = i;
    }
    return m;
}

function _fastMin(arr) {
    let m = arr[0];
    for (let i of arr) {
        if (i < m) m = i;
    }
    return m;
}

function _fastAvg(arr) {
    let m = 0;
    for (let i of arr) {
        m += i;
    }
    return m / arr.length;
}

function _fastSum(arr) {
    let m = 0;
    for (let i of arr) {
        m += i;
    }
    return m;
}

function _stopAndPrevent (event) {
    event.stopPropagation();
    event.preventDefault();
}

function _includesInSlice (string, character, boundaryStart, boundaryEnd) {
    for (let i = boundaryStart; i < boundaryEnd; i++) {
        if (string[i] === character) return true;
    }

    return false;
}

function _countInSlice (string, character, boundaryStart, boundaryEnd) {
    let count = 0;
    for (let i = boundaryStart; i < boundaryEnd; i++) {
        if (string[i] === character) count++;
    }

    return count;
}

function _lineSome (string, boundaryStart, boundaryEnd, callback) {
    for (let i = boundaryStart; i < boundaryEnd; i++) {
        if ((i === 0 || string[i - 1] === '\n') && callback(string[i])) {
            return true;
        }
    }

    return false;
}

function _lastIndexOfInSlice (string, character, boundaryStart, boundaryEnd) {
    for (let i = boundaryEnd; i >= boundaryStart; i--) {
        if (string[i] === character) return i;
    }

    return -1;
}

function _joinSentence (array) {
    let last = array.length > 1 ? ` and ${array.pop()}` : ''
    return array.join(', ') + last;
}

function _join (array, mapper, c,d) {
    if (c || d)throw 'fuck';
    let text = '';
    for (let i = 0; i < array.length; i++) {
        text += mapper(array[i], i, array);
    }

    return text;
}

function _hashToMap (hash) {
    return new Map(Object.entries(hash));
}

function _formatDuration(ms, limit = 4) {
    let mil = ms % 1000;
    let sec = ((ms -= mil) / 1000) % 60;
    let min = ((ms -= sec * 1000) / 60000) % 60;
    let hrs = ((ms -= min * 60000) / 3600000) % 24;
    let day = ((ms -= hrs * 3600000) / 86400000) % 7;
    let wks = ((ms -= day * 86400000) / (7 * 86400000));

    return _joinSentence([
        wks > 0 ? `${wks} w` : '',
        day > 0 ? `${day} d` : '',
        hrs > 0 ? `${hrs} h` : '',
        min > 0 ? `${min} m` : '',
        sec > 0 ? `${sec} s` : '',
        mil > 0 ? `${mil} ms` : ''
    ].filter(value => value).slice(0, limit));
}

function _rbgaToHex (rgba) {
    return `#${rgba.map((channel) => _padLeft(Number(channel).toString(16), 2, '0')).join('')}`
}

const PARSE_COLOR_CACHE = new Map();

function _parseColor (name) {
    if (PARSE_COLOR_CACHE.has(name)) {
        return PARSE_COLOR_CACHE.get(name);
    } else {
        const style = new Option().style;
        style.color = name;

        let color = style.color;
        if (color.startsWith('rgba')) {
            color = _rbgaToHex(color.slice(5, -1).split(','));
        } else if (color.startsWith('rgb')) {
            color = _rbgaToHex(color.slice(4, -1).split(','));
        } else if (COLOR_MAP.has(color)) {
            color = COLOR_MAP.get(color);
        } else {
            color = '';
        }

        PARSE_COLOR_CACHE.set(name, color);

        return color;
    }
}

function _clone (object) {
    return JSON.parse(JSON.stringify(object));
}

function _padLeft (text, length, char) {
    text = String(text)
    return char.repeat(Math.max(0, length - text.length)) + text;
}

function _formatDate (date, showDate = true, showTime = true) {
    if (date == '' || date == undefined) {
        return '';
    } else {
        date = new Date(_clamp(Number(date), 0, 1E15));

        const datePart = showDate ? `${_padLeft(date.getDate(), 2, '0')}.${_padLeft(date.getMonth() + 1, 2, '0')}.${date.getFullYear()}${showTime ? ' ' : ''}` : '';
        const timePart = showTime ? `${_padLeft(date.getHours(), 2, '0')}:${_padLeft(date.getMinutes(), 2, '0')}` : '';

        return datePart + timePart;
    }
}

function _parseDate (text) {
    if (typeof(text) == 'string') {
        let objs = text.trim().split(/^(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})$/);
        if (objs.length == 7) {
            objs = objs.map(x => parseInt(x));

            let date = new Date();

            date.setFullYear(objs[3]);
            date.setMonth(objs[2] - 1);
            date.setDate(objs[1])

            date.setHours(objs[4]);
            date.setMinutes(objs[5]);

            date.setSeconds(0);
            date.setMilliseconds(0);

            return date.getTime();
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}

function _formatDurationLegacy (duration) {
    if (duration == '' || duration == undefined) return '';
    duration = Math.max(0, duration);
    var days = Math.trunc(duration / (1000 * 60 * 60 * 24));
    var hours = Math.trunc((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.trunc((duration % (1000 * 60 * 60)) / (1000 * 60));
    return _padLeft(days, Math.max(2, days.toString().length), '0') + ':' + _padLeft(hours, 2, '0') + ':' + _padLeft(minutes, 2, '0');
}

function _invertColor (color, mono = false) {
    if (color.indexOf('#') === 0) {
        color = color.slice(1);
    }

    if (color.length === 3 || color.length === 4) {
        color = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}${color[3] || ''}${color[3] || ''}`;
    }

    let alpha = '';
    if (color.length === 8) {
        alpha = color.slice(6, 8);
        color = color.slice(0, 6);
    }

    if (color.length === 6) {
        let r = parseInt(color.slice(0, 2), 16);
        let g = parseInt(color.slice(2, 4), 16);
        let b = parseInt(color.slice(4, 6), 16);

        if (mono) {
            return `${(r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF'}${alpha}`;
        } else {
            r = (255 - r).toString(16);
            g = (255 - g).toString(16);
            b = (255 - b).toString(16);

            return "#" + _padLeft(r, 2, '0') + _padLeft(g, 2, '0') + _padLeft(b, 2, '0') + alpha;
        }
    } else {
        return '';
    }
}

function _classImageUrl (klass) {
    return `res/class${klass}.png`
}