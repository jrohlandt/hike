import moment from 'moment';

function isFalsey(val) {
    return !val ? true : false;
}

function isNumber(val) {
    // console.log(val, parseFloat(val), Number(val), Number.isNaN(Number(val)));
    return Number.isNaN(Number(val)) === false;
}

function isNotNumber(val) {
    return this.isNumber(val) === false;
}

function isDate(val) {
    return moment(val).isValid() !== false;
}

function sortFalsey(a,b,arg) {

        var a = a[arg];
        var b = b[arg];

        if (a < b) {
            return -1;
        }

        if (a > b) {
            return 1;
        }

        return 0;
}

function sortNumbers(a,b,arg) {

    var a = a[arg];
    var b = b[arg];

    if (a < b) {
        return -1;
    }

    if (a > b) {
        return 1;
    }

    return 0;
}

function sortDates(a,b,arg) {
    var a = a[arg];
    var b = b[arg];

    if (a < b) {
        return -1;
    }

    if (a > b) {
        return 1;
    }

    return 0;
}

function sortStrings(a,b,arg,sortOrder) {
    // var arg = arguments[0];
    // console.log(a[arg].toUpperCase());
    var sortOrder = false; // just placeholder, still need to allow toggle
    var a = a[arg].toUpperCase();
    var b = b[arg].toUpperCase();

    if (sortOrder === "asc" || !sortOrder ) {
        if (a < b) {
            return -1;
        }

        if (a > b) {
            return 1;
        }
    } else if ( sortOrder === "desc") {
        if (a < b) {
            return 1;
        }

        if (a > b) {
            return -1;
        }
    }

    return 0;
}


function groupItemsByType(items, arg) {
    var arr = {
        falsey: {items: [], callback: sortFalsey },
        numbers: {items: [], callback: sortNumbers },
        dates: {items: [], callback: sortDates },
        strings: {items: [], callback: sortStrings }
    };

    var item;
    for (item in items) {
        // console.log(items);
        if (items.hasOwnProperty(item)) {
            var val = items[item][arg];

            if (isFalsey(val)) {
                arr.falsey.items.push(items[item]);
            }
            else if (isNumber(val)) {
                arr.numbers.items.push(items[item]);
            }
            else if (isDate(val)) {
                arr.dates.items.push(items[item]);
            }
            else {
                arr.strings.items.push(items[item]);
            }
        }

    }

    return arr;
}

function sortItems(items, arg) {

    var arr = groupItemsByType(items, arg);
    var array;
    for (array in arr) {
        if (arr.hasOwnProperty(array)) {
            // console.log(a[array]);
            arr[array]["items"].sort((a,b) => {
                return arr[array].callback(a,b,arg);
            });
        }
    }
    var sorted = [].concat(arr["falsey"]["items"], arr["numbers"]["items"], arr["dates"]["items"], arr["strings"]["items"]);
    return sorted;
}

export { sortItems };
