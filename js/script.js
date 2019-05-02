var users = [];
if(navigator.onLine) {
    axios.get('http://localhost:3000/api/user/')
        .then(function (response) {
            console.log(response);
            
            users = response.data;
        })
        .catch(function (error) {
            console.log(error);
            users = fallUsers;
        });
} else {
    users = fallUsers
};



var user = document.getElementById('user');
var cardin = document.querySelector('.mycard')
var cashin = document.querySelector('.mycash')
var userFound = "";
var usercard = "";
var userpin = "";
var reciever = "";
var pinTry = 0
var screen = "welcome"
var keyPad = document.querySelectorAll('.keypad-btn')
for (let index = 0; index < keyPad.length; index++) {
    const keynum = keyPad[index];
    keynum.addEventListener('click', keyPress);
};

function keyPress() {
    var key = event.target.dataset.key;
    console.log(key)
    if (screen == "welcome") {
        var cardnum1 = document.getElementById('cardNum');
        cardnum1.value += key;
    }
    if (screen == "pin") {
        var cardnum2 = document.getElementById('pinNum');
        cardnum2.value += key;
    }
    if (screen == "deposit") {
        var cardnum3 = document.getElementById('depositAmount')
        cardnum3.value += key;
    }
    if (screen == "withdraw") {
        var cardnum4 = document.getElementById('withdrawAmount')
        cardnum4.value += key;
    }
    if (screen == "account") {
        var cardnum5 = document.getElementById('account')
        cardnum5.value += key
    }
    if (screen == "transfer") {
        var cardnum6 = document.getElementById('transferAmount')
        cardnum6.value += key
    }

    
}

function getRandom(min, max) {
    return Math.random() * (9999 - 1000) + 1000;
}

function show(index) {
    var screens = document.querySelectorAll('.screen');
    screens.forEach( (screen, num) => {
        if (index === num) {
            screen.classList.remove('hidden');
        } else {screen.classList.add('hidden');}
    });

}

function back() {
    show(3); // Dashboard
    document.getElementById('newTBal').innerHTML = "";
    document.getElementById('newWBal').innerHTML = "";
    document.getElementById('newDBal').innerHTML = "";
    document.getElementById('currentusers').innerHTML = ""

    var myforms = document.querySelectorAll('.myform')
    myforms.forEach(element => {
        element.value = "";
    });

    cashin.classList.remove('mycash-in')
}

function done() {
    show(0) //Welcome
    screen = "welcome"
    document.getElementById('newTBal').innerHTML = "";
    document.getElementById('newWBal').innerHTML = "";
    document.getElementById('newDBal').innerHTML = "";
    cardin.classList.remove('mycard-in')
    // Add Wipe Inputs
    var myforms = document.querySelectorAll('.myform')
    myforms.forEach(element => {
        element.value = "";
    });
    var newCard = document.getElementById('newCard')
    newCard.innerHTML = "Your Card Number will be given to you upon registration."
    
    // window.location.href = "AtmMachine.html";
    
}

function thanks() {
    show(7) //Thank You
    setTimeout(done, 3000)
}

function getCard() {
    event.preventDefault();
    var cardNum = Number(document.getElementById('cardNum').value);
    var recordCard = [];
    users.forEach(element => {
        recordCard.push(element.cardnum)
    });
    
    for (let index = 0; index < recordCard.length; index++) {
        const card = recordCard[index];
        if (cardNum === card) {
            userFound = users.find(users => users.cardnum === cardNum);
            if (userFound.cardinfo.expire < 2018) {
                alert("Expired Card")
                return false
            } else {
                show(2)
                cardin.classList.add('mycard-in')
                screen = "pin"
                return true 
            }
        }
    }
    if (true) {
        alert('Invalid Card')
    }
}

function getPin() {
    event.preventDefault();
    var pinNum = Number(document.getElementById('pinNum').value)
    var recordPin = "";
    
    if (pinNum === userFound.PIN) {
        show(3)
        user.innerHTML = userFound.firstName;
        return true
    }
    if (pinTry === 3) {
        show(8)
        setTimeout(done, 10000)
        pinTry = 0
    } else {
        pinTry = pinTry + 1
        alert('Invalid Pin')
    }
}

function mainback() {
    show(0)
    screen = "welcome"
}

function accBH() {
    event.preventDefault();
    var checkB = document.getElementById('checkingBalance')
    var saveB = document.getElementById('savingsBalance')
    show(4);
    checkingBalance.innerHTML = userFound.Balance.checking
    
    savingsBalance.innerHTML = userFound.Balance.savings
    
    transHistory.innerHTML = userFound.history
}

function depo() {
    show(5);
    screen = "deposit"
    
}

function deposit() {
    event.preventDefault();
    var newBal = document.getElementById('newDBal')
    var deposited = Number(document.getElementById('depositAmount').value)
    var choice = document.depForm.dep.value;
    
    if (choice == "checkings") {
        userFound.Balance.checking = userFound.Balance.checking + deposited
        newBal.innerHTML = "Your new " + choice + " balance is $" + userFound.Balance.checking;
        userFound.history.push(" " + "Checkings +$" + deposited)
    } else {
        userFound.Balance.savings = userFound.Balance.savings + deposited
        newBal.innerHTML = "Your new " + choice + " balance is $" + userFound.Balance.savings
        userFound.history.push(" " + "Savingss +$" + deposited)
    }
    
    if(navigator.onLine) {
        axios.put('http://localhost:3000/api/user/edit/' + userFound.cardnum, 
        userFound
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
}

function withdrawScreen() {
    show(6);
    screen = "withdraw"
}

function withdraw() {
    event.preventDefault();
    var newBal = document.getElementById('newWBal')
    var withdrawl = Number(document.getElementById('withdrawAmount').value)
    var choice = document.withForm.with.value;
    var checkB = '';
    if (withdrawl > 5000) {
        alert('Exceeded Withdraw limit')
        return false
    } else {
        if (choice == "checkings") {
            if (withdrawl > userFound.Balance.checking) {
                alert('Insufficient Funds')
                return false
            } else {
                userFound.Balance.checking = userFound.Balance.checking - withdrawl
                newBal.innerHTML = "Your " + choice + " balance is now $" + userFound.Balance.checking;
                userFound.history.push(" " + "Checkings -$" + withdrawl)
                cashin.classList.add('mycash-in')
            }
            
        } else {
            if (withdrawl > userFound.Balance.savings) {
                alert('Insufficient Funds')
                return false
            } else {
                userFound.Balance.savings = userFound.Balance.savings - withdrawl
                newBal.innerHTML = "Your " + choice + " balance is now $" + userFound.Balance.savings
                userFound.history.push(" " + "Savings -$" + withdrawl)
                cashin.classList.add('mycash-in')
            }
        }
    }
    if(navigator.onLine) {
        axios.put('http://localhost:3000/api/user/edit/' + userFound.cardnum, 
        userFound
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
}

function createAccount() {
    event.preventDefault();
    show(1)
    screen = "account"
}

function newAccount() {
    event.preventDefault();
    var newCard = document.getElementById('newCard')
    var firstname = document.getElementById('firstname').value
    var lastname = document.getElementById('lastname').value
    var pin = Number(document.getElementById('account').value) 
    var usedcards = []
    var lastuse = users.length
    var validCard = ""
    var cardGen = Math.round(getRandom(1000, 9999))
    
    for (const key in users) {
        if (users.hasOwnProperty(key)) {
            const x = users[key];
            usedcards.push(x.cardnum)
        }
    }

    for (let index = 0; index < usedcards.length; index++) {
        const usedCard = usedcards[index];
        console.log(usedCard)
        if (usedCard === cardGen) {
            cardGen = Math.round(getRandom(1000, 9999))
        } else {
            validCard = cardGen;
        }
    }
    users.push({
        firstName: firstname,
        lastName: lastname,
        cardnum: validCard,
        PIN: pin,
        cardinfo : {
            name : firstname + " " + lastname,
            number : validCard, 
            expire : 2025,
            security : 123,
            type : "mastercard"
        },
        Balance : {
            checking : 0,
            savings : 0 
        },
        history : ["Created Account"]
    });
    
    if(navigator.onLine) {
            axios.post('http://localhost:3000/api/user/create', 
            {
                firstName: firstname,
                lastName: lastname,
                cardnum: validCard,
                PIN: pin,
                cardinfo : {
                    name : firstname + " " + lastname,
                    number : validCard, 
                    expire : 2025,
                    security : 123,
                    type : "mastercard"
                },
                Balance : {
                    checking : 0,
                    savings : 0 
                },
                history : "Account Created"
            }
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    

    newCard.innerHTML = "Your New Card Number is " + users[lastuse].cardnum + "<br> Your New Pin Number is " + users[lastuse].PIN
}

function trans1() {
    event.preventDefault();
    show(9) //Transfer Screen 1
    screen = "transfer"
    for (const key in users) {
        if (users.hasOwnProperty(key)) {
            const x = users[key];
            console.log(x.firstName, x.lastName)
            document.getElementById('currentusers').options.add(new Option(x.firstName + " " + x.lastName, x.cardnum))
        }
    }
}

function trans2() {
    event.preventDefault();
    show(10) //Transfer Screen 2
    var name = document.getElementById('currentusers').value;
    var recordCard = [];
    console.log(name)
    users.forEach(element => {
        recordCard.push(element.cardnum)
    });
    console.log(recordCard)
    for (let index = 0; index < recordCard.length; index++) {
        const card = recordCard[index];
        console.log(card)
        if (name == card) {
            reciever = users.find(users => users.cardnum == name);
            console.log(reciever)
        }
    }
}

function transfer() {
    event.preventDefault();
    var transferamount = Number(document.getElementById('transferAmount').value);
    var choice = document.tranForm.tran.value;
    var newTbal = document.getElementById('newTBal');

    if (transferamount > 5000) {
        alert('Exceeded Transfer limit')
        return false
    } else {
        if (choice == "checkings") {
            if (transferamount > userFound.Balance.checking) {
                alert('Insufficient Funds')
                return false
            } else {
                userFound.Balance.checking = userFound.Balance.checking - transferamount
                newTbal.innerHTML = "Your " + choice + " balance is now $" + userFound.Balance.checking;
                userFound.history.push(" " + "Checkings -$" + transferamount)

                reciever.Balance.checking = reciever.Balance.checking + transferamount
                reciever.history.push(" " + "+$" + transferamount + " from " + userFound.firstName + " " + userFound.lastName)
            }
            
        } else {
            if (transferamount > userFound.Balance.savings) {
                alert('Insufficient Funds')
                return false
            } else {
                userFound.Balance.savings = userFound.Balance.savings - transferamount
                newTbal.innerHTML = "Your " + choice + " balance is now $" + userFound.Balance.savings
                userFound.history.push(" " + "Savings -$" + transferamount)

                reciever.Balance.checking = reciever.Balance.checking + transferamount
                reciever.history.push(" " + "+$" + transferamount + " from " + userFound.firstName + " " + userFound.lastName)
            }
        }
    }

    if(navigator.onLine) {
        axios.put('http://localhost:3000/api/user/edit/' + userFound.cardnum, 
        userFound
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.put('http://localhost:3000/api/user/edit/' + reciever.cardnum, 
            reciever
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
}

show(0);

// screens 0 Welcome
// screens 1 Create Account
// screens 2 Pin 
// screens 3 Dashboard
// screens 4 Account Summary
// screens 5 Deposit
// screens 6 Withdraw
// screens 7 Thank You Screen
// screens 8 Account Locked Screen
// screens 9 Transfer Screen 1
// screens 10 Transfer Screen 2