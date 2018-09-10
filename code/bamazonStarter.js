//const connect    = require("./connection.js");
const Customer   = require("./bamazonCustomer.js");
const Manager    = require("./bamazonManager.js");
const Supervisor = require("./bamazonSupervisor.js");
const mysql      = require("mysql");
const Table      = require("cli-table");
const inquirer   = require("inquirer");


//I had to comment out the requires for the two files because for some reason,
//when they are at the top it's immediately execuring those files, and then prompting the user.
//but it no longer does that when inside the switch. It's the only fix I could find.
const connection = mysql.createConnection({
    host:     "localhost",
    user:     "root",//process.env.DB_USER,
    password: "SuperSecretPasswordHere",//process.env.DB_PASS,
    database: "bamazon"
});

//Makes the connection to 'bamazon' database.
// connection.connect(error => {
//     if (error) throw error;

//     console.log(`Connected - your ID ${connection.threadId}`);
 
// });

const SELECT = () => {
    inquirer.prompt([
        {
            name:    'select',
            type:    'list',
            message: 'whats your status?',
            choices: ['customer','manager','supervisor']
        }
    ]).then ( response => {

        let usrSelect = response.select;

        switch(usrSelect) {
            case "customer":
                DISPLAY_ALL(() => {
                    Customer();
                })
                break;
            case "manager":
                Manager();
                break;
            case "supervisor":
                Supervisor();
                break;
            default:
                console.log("Invalid Selection! \n Please Try again!")
                REPROMPT();
                break;
        }
    })
}

const DISPLAY_ALL = cb => {
    connection.query('SELECT * FROM products', (error, response) => {
        if (error) console.log(`Error: ${error}`);

        //instance of constructor to display the current values within the table.
        let displayTable = new Table({
            head: [  //setting the db values to correct 
                'Item_ID',
                'Product Name',
                'Department',
                'Price',
                'Quantity'
            ],
            colWidth: ['15', '50', '50', '15', '15']
        });

        let resp = response.length;
        for (i = 0; i < resp; i++) { //loop through response, to get all values in table.
            displayTable.push(
                [
                    response[i].item_id,
                    response[i].product_name,
                    response[i].department_name,
                    response[i].item_price,
                    response[i].stock_quantity
                ]
            )
        }
        console.log(displayTable.toString());
        cb();
    })
}

SELECT();

module.exports = DISPLAY_ALL;