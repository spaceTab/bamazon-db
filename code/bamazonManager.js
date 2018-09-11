require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");


const connect = mysql.createConnection({
    host:     "localhost",
    port:     "3306",
    user:     "process.env.DB_USER",
    password: "process.env.DB_PASS",
    database: "bamazon"
})



const DISPLAY_TABLE = () => {
    connect.query(`SELECT * FROM products`, (error, response) => {
        if (error) throw error;

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

        for (j = 0; j < resp; j++) {
            displayTable.push([
                response[j].item_id,
                response[j].product_name,
                response[j].department_name,
                response[j].item_price,
                response[j].stock_quantity
            ]);
        }
        console.log(displayTable.toString());

        REPOPULATE_DB();
    });

}

const REPOPULATE_DB = () => {
    // DISPLAY_TABLE();
    inquirer.prompt([
        {
            name: "populate",
            type: "list",
            choices: [
                "Restock",
                "Add Item",
                "Remove Item",
                "Low Stock"
            ]
        }
    ]).then(choice => {

        //switch statement to determine which option usr chose.
        switch (choice.populate) {
            case "Restock":
                console.log("Sending restock options");
                RESTOCK_DB();
                break;
            case "Add Item":
                console.log("What Item would you like to add?");
                ADD_TO_DB();
                break;
            case "Remove Item":
                console.log("What Item would you like to remove?");
                REMOVE_FROM_DB();
                break;
            case "Low Stock":
                console.log("Checking for items with less than 5 left");
                LOW_STOCK();
                break;
            default:
                console.log("Please Choose from the \n Available options");
                console.log("& Thank you for shopping Bamazon.");
                break;
        }
    })
}

const RESTOCK_DB = (item, quantity) => {
    //prompt for restock options
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Enter the item you'd like to restock: "
        }, {
            name: "amount",
            type: "input",
            message: "How many would you like to add?: "
        }
    ]).then(data => {
        let dataItem = data.item;
        let addItem = data.amount;

        connect.query(`SELECT * FROM products WHERE item_id=${dataItem}`, (error, element) => {
            if (error) throw error;
            connect.query(`UPDATE products SET stock_quantity = stock_quantity + ${addItem}`);

            console.log(`Item: ${dataItem} has been restocked by: ${addItem}`);

            DISPLAY_TABLE();
        });
        ANOTHER_QUERY();
    })
}

const REMOVE_FROM_DB = () => {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Enter the Item ID of the item you'd like to remove: "
        }
    ]).then(data => {
        let removal = data.item;

        connect.query(`DELETE FROM products WHERE item_id=${removal}`);
        console.log(`${removal} is now removed from Database`);

        DISPLAY_TABLE();

        ANOTHER_QUERY();
    })

}


const ADD_TO_DB = () => {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Name the item you'd like to add: "
        }, {
            name: "department",
            type: "input",
            message: "name the correct department for this product"
        }, {
            name: "price",
            type: "input",
            message: "Enter the cost of this product: ",
        }, {
            name: "quantity",
            type: "input",
            message: "How many would you like to add?: "
        }
    ]).then(answer => {
        let item = answer.item;
        let depart = answer.department;
        let price = answer.price;
        let quantity = answer.quantity;

        connect.query
            (`INSERT INTO products SET ? `,
            {
                product_name: item,
                department_name: depart,
                item_price: price,
                stock_quantity: quantity
            }, (error, response) => {
                console.log(`You added ${quantity} ${item}'s at a price of ${price} in the ${depart} department `);
                DISPLAY_TABLE();
            });
        ANOTHER_QUERY();
    })
}

const LOW_STOCK = () => {

    connect.query(`SELECT * FROM products WHERE stock_quantity <= 5`, (error, response) => {
        console.log('\n Items with 5 or less in stock \n')
        // console.log(response);
        let table = new Table({
            head: [  //setting the db values to correct 
                'Item_ID',
                'Product Name',
                'Department',
                'Price',
                'Quantity'
            ],
            colWidth: ['15', '50', '50', '15', '15']
        })

        for (i = 0; i < response.length; i++) {
            table.push([
                response[i].item_id,
                response[i].product_name,
                response[i].department_name,
                response[i].item_price,
                response[i].stock_quantity,
            ]);
        }
        console.log(table.toString());
        ANOTHER_QUERY();
    })

}

const ANOTHER_QUERY = () => {
    inquirer.prompt([
        {
            name: "requery",
            type: "list",
            message: "would you like to check something else?",
            choices: ['Yes', 'No']
        }
    ]).then(response => {
        //connection.end();
        switch (response.requery) {
            case "Yes":
                console.log('Sending you to menu \n');
                REPOPULATE_DB();
                break;
            case "No":
                console.log('Thank you come again!');
                //connect.end();
                break;
            default:
                //connect.end();
                console.log("good day");
                break;
        }

    })
}
//DISPLAY_TABLE();
module.exports = DISPLAY_TABLE;