const inquirer = require("inquirer");
const mysql = require("mysql");

let newDepartment = [];

const SELECT = () => {
    inquirer.prompt([
        {
            name:    'select',
            type:    'list',
            message: 'What would you like to do?',
            choices: [
                'View by sales Department',
                'Create new department'
            ]
        }
    ]).then(data => {

        switch (data.select) {
            case "View by sales Department":
                //
                break;
            case "Create new department":
                //
                break;
            default:
                console.log('Thanks anyways');
                break;
        }
    })
}

const VIEW_SALES = () => {
    const table = new Table({
        head: [
            'Department ID',
            'Department Name',
            'Overhead Costs',
            'Total Sales',
            'Total Profits'
        ],
        style: {
            head: ['green'],
            compact: false,
            colAligns: 'center'
        }
    });

    connect.query(`SELECT * FROM total_profits`, (error, data) => {
        if (error) throw error;


        for (i = 0; i < data.length; i++) {
            table.push([
                data[i].department_id,
                data[i].department_name,
                data[i].overhead_cost,
                data[i].total_cost,
                data[i].total_profit
            ]);
        }
        console.log(table.toString());
    });
}

const NEW_DEPARTMENT = () => {
    inquirer.prompt([
        {
            name:    'department',
            type:    'input',
            message: 'Enter Department\'s name',
        }, {
            name:    'overhead',
            type:    'input', 
            message: 'Enter the overhead for the department'
        }
    ]).then( answer => {
        let NewDepartment = {
            departmentName: answer.department,
            depOverhead:    answer.overhead,
            defaultSales:   0
        };

        newDepartment.push();

        connect.query(`INSERT INTO deparments
            (department_name, overhead_cost, total_sales) VALUES (?, ?, ?);)`,
            [
                newDepartment[0].departmentName,
                newDepartment[0].depOverhead,
                newDeparment[0].defaultSales
            ], (error, results) => {

                if (!error) {
                    console.log('SUCCESS!: Department Added')
                    connection.end();
            } else {
                console.log(`ERROR! : ${error}`);
            }
    });
}