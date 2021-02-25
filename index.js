// dependencies 
const inquirer = require('inquirer');
const mysql = require("mysql2");
const consoletable = require('console.table');

const pool = mysql.createPool({
    host: "localhost",
    user: "root", 
    password: "94Lucien!@",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    database: "employee_trackerDB"
});

// connection 
pool.getConnection(function(err) {
    if(err) throw err
    console.log("Connected as Id")
    promptStart(); 
});
// prompts 
function promptStart() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View all employees.",
                "View all employees by roles.",
                "View all employees by department.",
                "View all employees by manager.",
                "Update employee.",
                "Add employee.",
                "Add role.",
                "Add department."
            ]
        }
    ]).then(function(val) {
        switch (val.choice) {
            case "View all employees.":
                viewAllEmployees();
            break;
    
            case "View all employees by role.":
                viewAllRoles();
            break;

            case "View all employees by department.":
                viewAllDepartments();
            break;

            case "View all employees by manager.":
                viewAllManagers(); 
            break;
          
            case "Add employee.":
                addEmployee();
            break;

            case "Update employee.":
                updateEmployee();
            break;
      
            case "Add role.":
                addRole();
            break;
      
            case "Add department.":
                addDepartment();
            break;
        }
    })
}

//view all employees
function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}
//view all roles 
function viewAllRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
    })
};
//view all employees by department 
function viewAllDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
};

//view all employees by department 
function viewAllManagers() {
    connection.query("SELECT employee.first_name, employee.last_name, employee.manager_id AS Manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
};
//role title for add employee 
var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
};
//role queries the managers 
var managersArr = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
};
//add an employee
function addEmployee() { 
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Employee's first name?"
        },
        {
            name: "lastname",
            type: "input",
            message: "Employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "Employee's role?",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Manager's name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          startPrompt()
      })
  })
};
//update employee 
function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    if (err) throw err
    console.log(res)
    inquirer.prompt([
            {
                name: "lastName",
                type: "rawlist",
                choices: function() {
                    var lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "Employee's last name?",
            },
            {
                name: "role",
                type: "rawlist",
                message: "Employees new title?",
                choices: selectRole()
            },
        ]).then(function(val) {
            var roleId = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET WHERE ?", 
            {
                last_name: val.lastName
           
            }, 
            {
                role_id: roleId
           
            }, 
            function(err){
                if (err) throw err
                console.table(val)
                startPrompt()
            })
  
        });
    });
};
//add employee role
function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
            name: "Title",
            type: "input",
            message: "What is the roles Title?"
        },
        {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
  
        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: res.Title,
                salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
  
    });
});
};
//add department 
function addDepartment() { 
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
                name: res.name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
};


