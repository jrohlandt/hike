import moment from 'moment';
import { Type } from './types.js';

var Sort = {

    sortAsc(a,b) {
        if (a < b) return -1;
        if (a > b) return 1;

        return 0;
    },

    sortDesc(a,b) {
        if (a < b) return 1;
        if (a > b) return -1;

        return 0;
    },

    sortIt(a,b) {
        return this.sortAsc(a,b);
    },

    sortFalsey(by,a,b) {
        var a = a[by];
        var b = b[by];

        return this.sortIt(a,b);
    },

    sortNumbers(by,a,b) {
        var a = a[by];
        var b = b[by];

        return this.sortIt(a,b);
    },

    sortDates(by,a,b) {
        var a = a[by];
        var b = b[by];

        return this.sortIt(a,b);
    },

    sortStrings(by,a,b) {
        var a = a[by].toUpperCase();
        var b = b[by].toUpperCase();

        return this.sortIt(a,b);
    },

    // Group items by type
    // @return Object e.g {falsey: {items: ['', 0, null], callback: sortFalsey}, etc ...}
    groupItemsByType(items, arg) {
        var arr = {
            falsey: {items: [], callback: this.sortFalsey },
            numbers: {items: [], callback: this.sortNumbers },
            dates: {items: [], callback: this.sortDates },
            strings: {items: [], callback: this.sortStrings }
        };

        for (var item in items) {
            if (items.hasOwnProperty(item)) {
                var val = items[item][arg];

                if (Type.isFalsey(val)) {
                    arr.falsey.items.push(items[item]);
                }
                else if (Type.isNumber(val)) {
                    arr.numbers.items.push(items[item]);
                }
                else if (Type.isDate(val)) {
                    arr.dates.items.push(items[item]);
                }
                else {
                    arr.strings.items.push(items[item]);
                }
            }

        }

        return arr;
    },

    // Order items by e.g. title
    // @param items Array of objects
    // @param by String e.g. "title"
    by(items,by) {
        var arr = this.groupItemsByType(items, by);
        for (var array in arr) {
            if (arr.hasOwnProperty(array)) {
                if (arr[array]["items"].length > 0) {
                    arr[array]["items"].sort(arr[array].callback.bind(this, by));
                }
            }
        }

        // Priorities:
        // 1st: falsey | 2nd: numbers | 3rd: dates | 4th: strings
        // concat types by priority
        var sorted = [].concat(
            arr["falsey"]["items"],
            arr["numbers"]["items"],
            arr["dates"]["items"],
            arr["strings"]["items"]
        );

        return sorted;
    }
};

export { Sort };
