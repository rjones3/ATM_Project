const User = require("../model/user");

const daoCommon = require("./commons/daoCommon");

class UserDao {
    constructor() {
        this.common = new daoCommon();
    }

    findAll() {
        let sqlRequest = "SELECT * FROM user";
        return this.common.findAll(sqlRequest).then(rows => {
            let users = [];
            for (const row of rows) {
                users.push(new User (
                        row.id,
                        row.firstName,
                        row.lastName,
                        row.cardnum,
                        row.PIN,
                        row.expire,
                        row.checking,
                        row.savings,
                        row.history
                    )
                );
            }
            return users;
        });
    }

    create(User) {
        let sqlRequest = "INSERT into user (firstName, lastName, cardnum, PIN, expire, checking, savings, history) " + "VALUES ($firstName, $lastName, $cardnum, $PIN, $expire, $checking, $savings, $history)";

        let sqlParams = {
            $firstName: User.firstName,
            $lastName: User.lastName,
            $cardnum: User.cardnum,
            $PIN: User.PIN,
            $expire: User.expire,
            $checking: User.checking,
            $savings: User.savings,
            $history: User.history
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    update(User) {
        let sqlRequest = "UPDATE user SET firstName=$firstName, lastName=$lastName, cardnum=$cardnum, PIN=$PIN, expire=$expire, checking=$checking, savings=$savings, history=$history WHERE cardnum=$cardnum";

        let sqlParams = {
            $firstName: User.firstName,
            $lastName: User.lastName,
            $cardnum: User.cardnum,
            $PIN: User.PIN,
            $expire: User.expire,
            $checking: User.checking,
            $savings: User.savings,
            $history: User.history
        };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = UserDao;
