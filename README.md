# Employee-Tracker

Hello, and welcome to my README! This is for my Week 12 Challenge, which was to create an Employee Tracking app using Node.js, MySQL and Inquirer.

[Link to Demo Video](https://drive.google.com/file/d/1NySVZCfwThwg64IAbMGYlMVyQwkuU-Nn/view?usp=sharing)

![finished html](https://github.com/dvicj/Employee-Tracker/blob/main/images/home%20screen.PNG)


It was my job to ensure my Employee Tracker app had the following features:

- User has the following options: 
  - view all departments
    - department name and id 
  - view all roles
    - job tite, role id, department and salary 
  - view all employees
    - id, first and last name, job title, department, salary, manager id 
  - add a department
    - enter name
  - add a role
    - enter name, salary and department 
  - add an employee
    - enter first and last name and role

I was to create this Employee Tracker app, and meet all of the requirements listed above, by using:

- [Node.js](https://nodejs.org/en/)
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [Console Table](https://www.npmjs.com/package/console.table)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- JavaScript - ES6

I completed this project as a way to work on my skills using MySQL and creating databases, a new concept to me. 

Features:

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [Learning](#learning)
* [License](#license)

## Installation

The user must clone all files from this repo. It is important that the location of the files is not changed. 

The user must have [Node.js](https://nodejs.org/en/download/) installed on their computer. 

The user must open the terminal, both command line and powershell will work, then enter "npm install" to download all the required dependencies (inquirer, mySQL2, console.table, chalk). This will allow the user to run the application as intended. To run the application, user must enter "node index". The user just has to answer the prompts in the command line and they will soon have a database of their employees populated with useful information. 

## Usage
Here are some user experience highlights from my page:

![employees](https://github.com/dvicj/Employee-Tracker/blob/main/images/employees.PNG)
![schema](https://github.com/dvicj/Employee-Tracker/blob/main/images/employee%20schema.PNG)

- when the user chooses "EMPLOYEES" they are presented with a table of current employees
- when the user chooses "DEPARTMENTS" they are presented with a table of current departments
- when the user chooses "ROLES" they are presented with a table of current roles.
- when the user chooses "ADD EMPLOYEE", "ADD DEPARTMENT" and/or "ADD ROLE" they are led through a series of extra prompts in order to add the respective data to their database. 
- I used the "chalk" NPM in order to colour code the console.log statements to make the application look nicer. I also added an ASCII art title to add some style. 

## Credits
These are some sources I used to help me along:

- [Node.js](https://nodejs.org/en/download/)
- [Inquirer NPM](https://www.npmjs.com/package/inquirer)
- [MySQL2 NPM](https://www.npmjs.com/package/mysql2)
- [console.table NPM](https://www.npmjs.com/package/console.table)
- [chalk NPM](https://www.npmjs.com/package/chalk)
- [Text to ASCII Art Generator](https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20)
- [mySQL SOURCE error 2?](https://stackoverflow.com/questions/14684063/mysql-source-error-2)
  - when I entered "source schema.sql" in mysql, I got an error message. I was not using the correct file path, the fix was: "source db/schema.sql"
  
## Learning
Here are the highlights of what I learned and issues I had while writing this code.

- Learning to use MySQL/MySQL2 was definitely an experience. It was difficult because I didn't have the weekly lessons to look back on. Luckily, Google exists and I was able to gradually figure things out
- I struggled again with the frequency of my updates to this repository, I would find myself working and not taking breaks to commit - mainly just focusing on trying to figure things out and get my code working

## License
MIT License

![license](https://img.shields.io/static/v1?label=license&message=MIT&color=blueviolet)

Copyright (c) 2021 Devin Jones

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.









