const connect  = require("./connection.js");
//const customer = require("./bamazonCustomer.js");
//const manager  = require("./bamazonManager.js");
const inquirer = require("inquirer");


//I had to comment out the requires for the two files because for some reason,
//when they are at the top it's immediately execuring those files, and then prompting the user.
//but it no longer does that when inside the switch. It's the only fix I could find.


const SELECT = () => {
    inquirer.prompt([
        {
            name:    'select',
            type:    'list',
            message: 'whats your status?',
            choices: [
                'customer',
                'manager',
                'supervisor'
            ]
        }
    ]).then ( response => {

        let usrSelect = response.select;

        switch(usrSelect) {
            case "customer":
                //const customer = require("./bamazonCustomer.js");
                customer.DISPLAY_ALL();
                break;
            case "manager":
                //const manager = require("./bamazonManager.js");
                manager.DISPLAY_TABLE();
                break;
            default:
                console.log("Invalid Selection! \n Please Try again!")
                REPROMPT();
        }
    })
}

const REPROMPT = () => {

}

SELECT();