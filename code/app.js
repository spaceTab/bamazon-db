const inquirer = require("inquirer");
const figlet   = require("figlet");

//other files
const Manager    = require("./bamazonManager.js");
const Customer   = require("./bamazonCustomer.js");
//const SuperVisor = require("./bamazon");

const GREET = () => {
    figlet('Welcome to BAMAZON', {
        horizontalLayout: 'default',
        verticalLayout: 'default',
    }, function (error, response) {
        if (error) return console.log(`ERROR: ${error}`);

        console.log(response);
    });
}

const USR_SELECT = () => {
    GREET();
    inquirer.prompt([
        {
            type: "list",
            name: "status",
            message: "What is your Bamazon Status?: ",
            choices: [
                "Customer",
                "Manager",
                "Supervisor"
            ]
        }
    ]).then(response => {
        let usrStatus = response.status;

        switch (usrStatus) {
            case "Customer":
                Customer.DISPLAY_TABLE();
                break;
            case "Manager":

                break;
            case "Supervisor":

                break;
            default:
                console.log(`That's not an available option \n Try again!`);
                REPROMPT();
                break;
        }
    })
}

const REPROMPT = () => {
    console.log(`Lets Try this again!`);
    USR_SELECT();
}