const inquirer = require("inquirer");
const figlet   = require("figlet");

//other files
const Manager    = require("./bamazonManager.js");
//const customer   = require("./bamazonCustomer.js");


const SELECT = () => {
    inquirer.prompt([
        {
            name:    'select',
            type:    'list',
            message: 'whats your status?',
            choices: [
                'Customer',
                'Manager',
                'Supervisor'
            ]
        }
    ]).then ( response => {
        console.log('here');
    })
}

SELECT();