function arrayFlatten(array) {
    return array.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? arrayFlatten(toFlatten) : toFlatten);
    }, []);
}

function arrayRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function arrayDifference(array1, array2, compare) {
    if (!compare) return null;
    return array1.filter((element) => !array2.some((element2) => compare(element, element2)));
}

Array.prototype.randomElement = function () {
    return arrayRandom(this);
}

Array.prototype.diff = function (array, compare) {
    return arrayDifference(this, array, compare);
}

Array.prototype.flatten = function () {
    return arrayFlatten(this);
}

Object.defineProperty(Array.prototype, "randomElement", {
    get: function randomElement() {
        return arrayRandom(this);
    }
});

Object.defineProperty(Array.prototype, "flatten", {
    get: function flatten() {
        return arrayFlatten(this);
    }
});

module.exports = {
    random: (array) => arrayRandom(array),
    flatten: (array) => arrayFlatten(array),
    diff: (array1, array2, compare) => arrayDifference(array1, array2, compare)
};
