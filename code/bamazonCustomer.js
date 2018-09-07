require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");


//Information needed to connect to DB
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",//process.env.DB_USER,
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
        //console.log(data + '\n' + resp.length);
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

            inquirer.prompt([
                {
                    name: "again",
                    type: "list",
                    message: "Continue Shopping?",
                    choices: ["Yes", "No"]
                }
            ]).then(answer => {

                switch (answer.again) {
                    case "Yes":
                        GET_ORDER();
                        break;
                    case "No":
                        console.log('Thanks for shopping Bamazon!\nwhere we care about small business');

                        connection.end //End connection to database. 
                        console.log(`Ending user connection at: ${connection.threadId}`);
                        break;
                    default:
                        console.log('Goodbye');
                        connection.end;
                }
            })
        });
}