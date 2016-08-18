function isMysqlDate(string) {
    var regex = /[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]? [0-2][0-9]:[0-6][0-9]:[0-6][0-9]/;

    var match = string.match(regex);

    return (match == null) ? false : match;
}

function mysqlToSeconds(string) {

    if (isMysqlDate(string) === false) {
        return false;
    }

    // Split MySQL date e.g. 2016-08-18 14:18:35
    // into [ Y, M, D, h, m, s ]
    var t = string.split(/[- :]/);
    var dateObj = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    var unixTimestamp = Date.parse(dateObj) / 1000;

    return unixTimestamp;
}

export {
    isMysqlDate,
    mysqlToSeconds
};
