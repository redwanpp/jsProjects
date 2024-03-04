const shortid = require('shortid');

/**
 * Ticket constructor will receive username and price
 * @param {string} username
 * @param {number} price
 */
class Ticket {
    constructor(username, price) {
        this.id = shortid.generate();
        this.username = username;
        this.price = price;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = Ticket;