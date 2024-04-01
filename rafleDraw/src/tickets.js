const Ticket = require('./Ticket');
const { readFile, writeFile } = require('./utils');

const tickets = Symbol('tickets');

class TicketCollection {
    constructor() {
        (async function () {
            this[tickets] = await readFile();
        }.call(this));
    }

    /**
     * create and save ticket
     * @param {string} username 
     * @param {number} price 
     * 
     * @return {Ticket}
     */
    create(username, price) {
        const ticket = new Ticket(username, price);
        this[tickets].push(ticket);
        writeFile(this[tickets]);
        return ticket;
    }

    /**
     * create bulk tickets
     * @param {string} username 
     * @param {number} price 
     * @param {number} quantity 
     */
    createBulk(username, price, quantity) {
        const result = [];
        for (let i = 0; i < quantity; i++) {
            const ticket = this.create(username, price);
            result.push(ticket);
        }
        writeFile(this[tickets]);
        return result;
    }


    /**
     * return all tickets from db
     */
    find() {
        return this[tickets];
    }

    /**
     * find ticket by id
     * @param {string} id
     * @return {Ticket} 
     */
    findById(id) {
        const ticket = this[tickets].find(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.id == id
        );
        return ticket;
    }

    /**
     * find tickets by username
     * @param {string} username 
     * @return {Ticket[]}
     */
    findByUsername(username) {
        const tickets = this[tickets].filter(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.username == username
        );
        return tickets;
    }


    /**
     * updat by id
     * @param {string} ticketId 
     * @param {{username: string, price: number}} ticketBody
     * @return {Ticket} 
     */
    updateById(ticketId, ticketBody) {
        const ticket = this.findById(ticketId);
        if(ticket) {
            ticket.username = ticketBody.username ?? ticket.username;
            ticket.price = ticketBody.price ?? ticket.price;   
        }
        writeFile(this[tickets]);
        return ticket;
    }

    /**
     * Bulk update by  username
     * @param {string} username 
     * @param {{username: string, price: number}} ticketBody 
     * @return {Ticket[]}
     */
    updateBulk(username, ticketBody) {
        const userTickets = this.findByUsername(username);

        const updatedTickets = userTickets.map(
            /**
             * @param {Ticket} ticket
             */

            (ticket) => this.updateById(ticket.id, ticketBody)
        );
        writeFile(this[tickets]);
        return updatedTickets;
    }

    /**
     * delete ticket by Id
     * @param {string} ticktId 
     * @return {boolean}
     */

    deleteById(ticktId) {
        const index = this[tickets].findIndex(
            /**
             * @param {Ticket} ticket
             */

            (ticket) => ticket.id == ticket
        )
        if(index == -1) {
            return false;
        } else {
            thsi[tickets].splice(index, 1);
            writeFile(this[tickets]);
            return true;
        }
    }


    /**
     * bulk delete by username
     * @param {string} username
     * @return {boolean[]} 
     */
    deleteBulk(username) {
        const userTickets = this.findByUsername(username);

        const deletedResult = userTickets.map(
            /**
             * @param {Ticket} ticket
             */

            (ticket) => this.deleteById(ticket.id)
        );
        writeFile(this[tickets]);
        return deletedResult;
    }

    /**
     * Find winner
     * @param {number} winnerCount 
     * @return {Ticket[]}
     */
    draw(winnerCount) {
        const winnerIndexes = new Array(winnerCount);

        let winnerIndex = 0;
        while(winnderIndex < winnerCount) {
            let ticketIndex = Math.floor(Math.random() * this[tickets]. length);
            if(!winnerIndexes.includes(ticketIndex)) {
                winnerIndexes[winnerIndex++] = ticketIndex;
                continue;  
            } 
        }

        const winners = winnerIndexes.map(
            /**
             * @param {number} index
             */

            (index) => this[tickets][index]
        );
        return winners; 
    }
}

const ticketCollections = new TicketCollection();
module.exports = ticketCollections;