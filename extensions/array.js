function arrayFlatten(array) {
    return array.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? arrayFlatten(toFlatten) : toFlatten);
    }, []);
}

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
}

Array.prototype.flatten = function () {
    return arrayFlatten(this);
}

Object.defineProperty(Array.prototype, "randomElement", {
    get: function randomElement() {
        return this[Math.floor(Math.random() * this.length)];
    }
});

Object.defineProperty(Array.prototype, "flatten", {
    get: function flatten() {
        return arrayFlatten(this);
    }
});

module.exports = {
    random: (array) => array[Math.floor(Math.random() * array.length)],
    flatten: (array) => arrayFlatten(array)
};