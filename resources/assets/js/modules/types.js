import moment from 'moment';

var Type = {

    isFalsey(val) {
        return !val ? true : false;
    },

    isNumber(val) {
        // console.log(val, parseFloat(val), Number(val), Number.isNaN(Number(val)));
        return Number.isNaN(Number(val)) === false;
    },

    isNotNumber(val) {
        return this.isNumber(val) === false;
    },

    isDate(val) {
        return moment(val, "YYYY-MM-DD HH:mm:ss").isValid() !== false;
    }
};

export { Type };
