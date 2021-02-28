//dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table")
const chalk = require("chalk");

//connecting to database 
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_DB"
})

//connecting to server and database 
connection.connect(function(err){
    if (err) throw err;
    console.log( 
        chalk.bold.magenta( `                                           
 _____ _____ _____ __    _____ __ __ _____ _____ 
|   __|     |  _  |  |  |     |  |  |   __|   __|
|   __| | | |   __|  |__|  |  |_   _|   __|   __|
|_____|_|_|_|__|  |_____|_____| |_| |_____|_____|


                                           __ 
 _____ _____ _____ _____ _____ _____ _____|  |
|_   _| __  |  _  |     |  |  |   __| __  |  |
  | | |    -|     |   --|    -|   __|    -|__|
  |_| |__|__|__|__|_____|__|__|_____|__|__|__|
                                              
                                                                              
    `))
    promptStart();
})

//main menu/ start app
promptStart = () => {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: chalk.magenta('CHOOSE AN OPTION BELOW:'),
        choices: [
                "EMPLOYEES.",
                "DEPARTMENTS.",
                "ROLES.",
                "ADD EMPLOYEE.",
                "ADD DEPARTMENT.",
                "ADD ROLE.",
                "EXIT."
        ]
    }).then((answer) => {
        switch (answer.action) {
            case "EMPLOYEES.":
                employees();
                break;
            case "DEPARTMENTS.":
                departments();
                break;
            case "ROLES.":
                roles();
                break;
            case "ADD EMPLOYEE.":
                addEmployee();
                break;
            case "ADD DEPARTMENT.":
                addDepartment();
                break;
            case "ADD ROLE.":
                addRole();
                break;
            case "EXIT.": 
                promptEnd();
                break;
            default:
                break;
        }
    })
};

//show employees 
employees= () => {
    var query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";
    connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(chalk.bgMagenta(res.length + " EMPLOYEES FOUND!"));
    console.log(chalk.magenta("ALL EMPLOYEES: "));
    console.table(res); 
    promptStart();
    })
}

departments = () => {
    var query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
    if(err)throw err;
    console.log(chalk.bgMagenta(res.length + " DEPARTMENTS FOUND!"));
    console.log(chalk.magenta("ALL DEPARTMENTS:"));
    console.table(res);
    promptStart();
    })
}

roles = () => {
    var query = 'SELECT r.id, title, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id';
    connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(chalk.magenta("ALL ROLES:"));
    console.table(res);
    promptStart();
    })
}

addEmployee = () => {
    connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input", 
                message: "FIRST NAME: ",
            },
            {
                name: "last_name",
                type: "input", 
                message: "LAST NAME: "
            },
            {
                name: "role", 
                type: "list",
                choices: () => {
                var roleArray = [];
                for (let i = 0; i < res.length; i++) {
                    roleArray.push(res[i].title);
                }
                return roleArray;
                },
                message: "ROLE?"
            }
            ]).then((answer) => {
                let roleID;
                for (let j = 0; j < res.length; j++) {
                if (res[j].title == answer.role) {
                    roleID = res[j].id;
                }                  
                }  
                connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: roleID,
                },
                (err) => {
                    if (err) throw err;
                    console.log(chalk.bgMagenta("EMPLOYEE ADDED!"));
                    promptStart();
                }
                )
            })
    })
}

addDepartment = () => {
    inquirer
    .prompt([
        {
            name: "new_dept", 
            type: "input", 
            message: "NEW DEPARTMENT: "
        }
    ]).then((answer) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.new_dept
            }
        );
        var query = "SELECT * FROM department";
        connection.query(query, (err, res) => {
        if(err)throw err;
        console.log(chalk.bgMagenta("DEPARTMENT ADDED!"));
        promptStart();
        })
    })
}

addRole = () => {
    connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    inquirer 
    .prompt([
        {
            name: "new_role",
            type: "input", 
            message: "NEW ROLE: "
        },
        {
            name: "salary",
            type: "input",
            message: "SALARY: "
        },
        {
            name: "deptChoice",
            type: "rawlist",
            choices: () => {
                var deptArry = [];
                for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                }
                return deptArry;
            },
        }
    ]).then((answer) => {
        let deptID;
        for (let j = 0; j < res.length; j++) {
            if (res[j].name == answer.deptChoice) {
                deptID = res[j].id;
            }
        }

        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.new_role,
                salary: answer.salary,
                department_id: deptID
            },
            (err, res) => {
                if(err)throw err;
                console.log(chalk.bgMagenta("ROLE ADDED!"));
                promptStart();
            }
        )
    })
    })   
}

promptEnd = () => {
    connection.end();
}
