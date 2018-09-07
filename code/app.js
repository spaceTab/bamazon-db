const connect  = require("./connection.js");
//const customer = require("./bamazonCustomer.js");
//const manager  = require("./bamazonManager.js");
const inquirer = require("inquirer");
const figlet   = require("figlet");

//other files



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