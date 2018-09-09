const connect    = require("./connection.js");
const Customer   = require("./bamazonCustomer.js");
const Manager    = require("./bamazonManager.js");
const Supervisor = require("./bamazonSupervisor.js");
const inquirer   = require("inquirer");


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
                Customer.DISPLAY_ALL();
                break;
            case "manager":
                //const manager = require("./bamazonManager.js");
                Manager.DISPLAY_TABLE();
                break;
            case "supervisor":
                Supervisor.SELECT();
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