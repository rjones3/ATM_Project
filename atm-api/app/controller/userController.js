const UserDao = require("../dao/userDao");

const ControllerCommon = require("./common/controllerCommon");
const User = require("../model/user");

class UserController {
    
    constructor() {
        this.userDao = new UserDao();
        this.common = new ControllerCommon();
    }

    findAll(res) {
        this.userDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    create(req, res) {
        let user = new User();
        
        // console.log(req.body);
        
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.cardnum = req.body.cardnum;
        user.PIN = req.body.PIN;
        user.expire = req.body.cardinfo.expire;
        user.checking = req.body.Balance.checking;
        user.savings = req.body.Balance.savings;
        user.history = req.body.history;

        return this.userDao.create(user)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    update(req, res) {
        let user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.cardnum = req.params.cardnum;
        user.PIN = req.body.PIN;
        user.expire = req.body.cardinfo.expire;
        user.checking = req.body.Balance.checking;
        user.savings = req.body.Balance.savings;
        user.history = req.body.history;

        return this.userDao.update(user)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

};

module.exports = UserController;