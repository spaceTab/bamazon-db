require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");


//Information needed to connect to DB
const connection = mysql.createConnection({
    host:     "localhost",
    user:     "root",//process.env.DB_USER,
    password: "SuperSecretPasswordHere",//process.env.DB_PASS,
    database: "bamazon"
});

//Makes the connection to 'bamazon' database.
connection.connect(error => {
    if (error) throw error;

    console.log(`Connected - your ID ${connection.threadId}`);
    DISPLAY_ALL();
});



//function to display the populated table.
const DISPLAY_ALL = () => {
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
        GET_ORDER();
    })
}

//Prompts user to input the item, and quantity that they would like to buy from DB
const GET_ORDER = () => {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Enter the Item Id of the item you're looking for: "
        }, {
            name: "quantity",
            type: "input",
            message: "How many items would you like to purchase: "
        },
    ]).then(data => {
        let item = data.item_id; //checks usr input compares id to DB.
        console.log(data + '\n' + resp.length);
        connection.query        //moved down cause small screen
            (`SELECT * FROM products WHERE item_id=${item}`,
            (error, response) => {
                if (error) throw error;
                //console.log(`Error!: ${error}`);
                //console.log(response);

                let usrAmount = data.quantity;                 //Amount user wants
                let usrItem = response[0].product_name;      //name of item
                let dbStock = response[0].stock_quantity;  //checks if in stock
                let itemPrice = response[0].item_price;     //checks item price

                if (usrAmount <= dbStock) {
                    itemPrice *= usrAmount; //calculates the cost for amount purchased
                    let updatedQuant = dbStock - usrAmount;
                    console.log(`you just purchased:${usrAmount}`);
                    UPDATE_DB(updatedQuant, item);
                } else {
                    console.log('There isn\'t enough in stock');
                    RE_PROMPT()
                }


            });
    });
}


//little function to allow for a 'retry' on a invalid purchase order.
const RE_PROMPT = () => {
    console.log(`Reprompting for purchase`);
    GET_ORDER(); //calls function to restart order
}

const UPDATE_DB = (updatedQuant, item) => {
    connection.query(`UPDATE products SET stock_quantity = ? WHERE ?`,
        [[updatedQuant], { item_id: item }],
        (error, response) => {
            if (error) throw error;

            console.log(`The stock amount is now:${updatedQuant}`);
            console.log('Thanks for shopping Bamazon!\nwhere we care about small business');

            connection.end //End connection to database. 
            console.log(`Ending user connection at: ${connection.threadId}`);
        });

}
// const REPOPULATE_DB = () => {
//     inquirer.prompt([
//         {
//             name: "populate",
//             type: "list",
//             choices: [
//                 "Restock",
//                 "Add Item",
//                 "Remove Item"
//             ]
//         }
//     ]).then(choice => {

//         //switch statement to determine which option usr chose.
//         switch (choice.populate) {
//             case "Restock":
//                 console.log("Sending restock options");
//                 RESTOCK_DB();
//                 break;
//             case "Add Item":
//                 console.log("What Item would you like to add?");
//                 ADD_TO_DB();
//                 break;
//             case "Remove Item":
//                 console.log("What Item would you like to remove?");
//                 REMOVE_FROM_DB();
//                 break;
//             default:
//                 console.log("Please Choose from the \n Available options");
//                 console.log("& Thank you for shopping Bamazon.");
//                 break;
//         }
//     })
// }

// const RESTOCK_DB = () => {
//     //prompt for restock options
//     inquirer.prompt([
//         {
//             name: "item",
//             type: "input",
//             message: "Enter the item you'd like to restock: "
//         }, {
//             name: "amount",
//             type: "input",
//             message: "How many would you like to add?: "
//         }
//     ]).then(data => {
//         let dataItem = data.item;           //sort through db, then 

//         connection.query(`SELECT * FROM products WHERE` 
//     })
// }}}


//DISPLAY_ALL();