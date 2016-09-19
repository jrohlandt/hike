import moment from 'moment';

var Type = {

    isFalsey(val) {
        return !val ? true : false;
    },

    isNumber(val) {
        // console.log(val, parseFloat(val), Number(val), Number.isNaN(Number(val)));
        if (val === "")
            return false;

        return isNaN(Number(val)) === false;
    },

    isNumberNoZero(val) {
        if (this.isNumber(val) && val !== 0 && parseFloat(val) !== 0)
            return true;

        return false;
    },

    isNotNumber(val) {
        return this.isNumber(val) === false;
    },

    isDate(val) {
        return moment(val, "YYYY-MM-DD HH:mm:ss").isValid() !== false;
    }
};

export { Type };
