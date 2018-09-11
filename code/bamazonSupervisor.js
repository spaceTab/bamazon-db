require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("cli-table");
const Customer = require("./bamazonCustomer.js");

let newDepartment = [];

const connect = mysql.createConnection({
    host:    "localhost",
    user:     "root",  //process.env.USR -> locking me out
    password: "SuperSecretPasswordHere", //process.env.PASS -> locking me out
    database: "bamazon"
});

const SELECT = () => {
    inquirer.prompt([
        {
            name: 'select',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View by sales Department',
                'Create new department'
            ]
        }
    ]).then(data => {

        switch (data.select) {
            case "View by sales Department":
                VIEW_SALES();
                break;
            case "Create new department":
                NEW_DEPARTMENT();
                break;
            default:
                console.log('Thanks anyways');
                break;
        }
    })
}

const VIEW_SALES = () => {
    // query dynamically adds the total profits column. 
    let query = `SELECT departments.department_id, departments.department_name, departments.overhead_cost, CASE WHEN SUM(products.product_sales) IS NULL THEN 0 ELSE SUM(products.product_sales) END AS product_sales FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_id, departments.department_name;`;
    //let query = `SELECT * FROM departments.department_id`
    connect.query(query, (err, results) => {
        if (err) throw err;

        // console.log(results)
        let table = new Table({
            head: [
                'Department ID',
                'Department Name',
                'Overhead Costs',
                'Total Sales',
                'Total Profit'
            ]
        });

        results.forEach(data => {

            let id = data.department_id;
            let name = data.department_name;
            let overhead = parseInt(data.overhead_cost).toFixed(2);
            let sales = parseInt(data.product_sales).toFixed(2);
            let total = (sales - overhead).toFixed(2);

            table.push([id, name, overhead, sales, total]);
        })
        console.log(table.toString());
        REPROMPT();
    })

};


const NEW_DEPARTMENT = () => {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'Enter Department\'s name',
        }, {
            name: 'overhead',
            type: 'input',
            message: 'Enter the overhead for the department'
        }
    ]).then(answer => {
        let NewDepartment = {
            departmentName: answer.department,
            depOverhead: answer.overhead,
            defaultSales: 0
        };

        newDepartment.push(NewDepartment);

        connect.query(`INSERT INTO departments SET ?`, {
            department_name: answer.department,
            overhead_cost: answer.overhead
        }, (error, result) => {
            let depart = answer.department;
            let overhead = answer.overhead;
                if (!error) {
                    console.log(`SUCCESS\nDepartment ${depart} Added`);
                    console.log(`With an overhead of: $${overhead}`);
                } else {
                    console.log(`ERROR! : ${error}`);
                }
            });
            REPROMPT();
    });
}

const REPROMPT = () => {
    inquirer.prompt([
        {
            name: 'prompt',
            type: 'list', 
            message: 'would you like to continue?',
            choices: ['Yes', 'No']
        }
    ]).then( data => {
        let answer = data.prompt;

        switch(answer){
            case "Yes":
                console.log("reprompting");
                SELECT();
                break;
            case "No":
                console.log("Have a nice day!")
                connect.end();
                break;
            default:
                console.log("ending connection");
                connect.end();
                break;
        }
    })
}

//SELECT();
module.exports = SELECT;





