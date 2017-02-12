(function (root, factory) {
	'use strict';

    if (typeof exports === 'object') {
        module.exports = factory(require('moment'));            // Node
    } else if (typeof define === 'function' && define.amd) {
        define('moment-dt', ['moment'], factory);               // AMD
    } else {
        root.moment = factory(root.moment);                     // Browser
    }
}(this, function (moment) {
	'use strict';

    var VERSION = '1.0.0',
        momentMutablesAndParameters = {
            'add': 0,
            'endOf': 0, 
            'lang': 0, 
            'locale': 0,
            'set': 0, 
            'startOf': 0, 
            'subtract': 0,
            'year': 1,
            'weekYear': 1, 
            'isoWeekYear': 1, 
            'quarters': 1, 
            'quarter': 1, 
            'month': 1, 
            'weeks': 1, 
            'week': 1, 
            'isoWeeks': 1, 
            'isoWeek': 1, 
            'date': 1, 
            'days': 1, 
            'day': 1, 
            'weekday': 1, 
            'isoWeekday': 1, 
            'dayOfYear': 1, 
            'hours': 1, 
            'hour': 1, 
            'minutes': 1, 
            'minute': 1, 
            'seconds': 1, 
            'second': 1, 
            'milliseconds': 1, 
            'millisecond': 1, 
            'utcOffset': 1, 
            'utc': 0, 
            'local': 0, 
            'parseZone': 0, 
            'dates': 1, 
            'months': 1, 
            'years': 1, 
            'zone': 1,
            'tz': 1,
            'period': 1
        }, durationMutablesAndParameters = {
            'abs': 0,
            'add': 0,
            'subtract': 0,
            'locale': 1,
            'lang': 1
        };

    if(!moment) {
        throw new Error("Can't find moment.js");
    }

    function wrapMutable(fn, name, parameters) {
        var original = fn[name];
        if(original) {
            parameters = parameters || 0;
            fn[name] = function() {
                return original.apply(arguments.length >= parameters ? this.clone() : this, arguments);
            };
        }        
    }

    function wrapMutablesByObject(fn, obj) {
        Object.keys(obj).forEach(function(key) {
            wrapMutable(fn, key, obj[key]);
        });
    }

    function addMutable(fn, name, parameters) {
        if(Array.isArray(name)) {
            name.forEach(function(mutable) { wrapMutable(mutable, 0); });
        } else if (typeof name === 'object') {
            wrapMutablesByObject(name);
        } else {
            wrapMutable(name, parameters);
        }        
    }

    function addMomentMutable(name, parameters) {
        addMutable(moment.fn, name, parameters);
        return moment.immutable;
    }

    function addDurationMutable(name, parameters) {
        addMutable(moment.duration.fn, name, parameters);
        return moment.immutable;
    }

    wrapMutablesByObject(moment.fn, momentMutablesAndParameters);
    wrapMutablesByObject(moment.duration.fn, durationMutablesAndParameters);

    moment.immutable = {
        version: VERSION,
        addMomentMutable: addMomentMutable,
        addDurationMutable: addDurationMutable 
    };
    
    return moment;
}));