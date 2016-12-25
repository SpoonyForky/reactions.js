Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
}

Object.defineProperty(Array.prototype, "randomElement", {
    get: function randomElement() {
        return this[Math.floor(Math.random() * this.length)];
    }
});

module.exports = (array) => array[Math.floor(Math.random() * array.length)];