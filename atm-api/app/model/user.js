class User {
    constructor(id, firstName, lastName, cardnum, pin, expire, checking, savings, history) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.cardnum = cardnum;
        this.PIN = pin;
        this.cardinfo = {
            expire : expire
        };
        this.Balance = {
            checking : checking,
            savings : savings 
        };
        this.history = [history];
    }
}
module.exports = User