const Ticket = require('./Ticket');
const { readFile, writeFile } = require('./utils');

const tickets = Symbol('tickets');

class TicketCollection {
    constructor() {
        this[tickets] = [];
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

        return ticket;
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
        ticket.username = ticketBody.username ?? ticket.username;
        ticket.price = ticketBody.price ?? ticket.price;

        return ticket;
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
            return true;
        }
    }
}

const collection = new TicketCollection();