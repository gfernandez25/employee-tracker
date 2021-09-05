const inquirer = require('inquirer');
const queryService = require("./queries.service");


//initial questions
const selection = {
    type: 'list',
    name: 'selectedItem',
    message: 'What would you like to do?',
    choices: [
        'view all departments',
        'view all roles',
        'view all employees',
        'add a department',
        'add a role',
        'add an employee',
        'update an employee role'
    ]
}

//add a department question set
const addDepartment = {
    type: 'input',
    name: 'departmentName',
    message: 'Please enter the new Department Name',
    validate: titleInput => {
        return !!titleInput
    }
}

//add a role question set
const addRole = {
    type: 'input',
    name: 'roleName',
    message: 'Please enter the new role'
}
const addRoleSalary = {
    type: 'input',
    name: 'roleSalary',
    message: 'Please enter the salary for the role'
}

async function addRoleDepartment() {
    return {
        type: 'list',
        name: 'roleDepartment',
        message: 'Please select the department this role will belong to ',
        choices: await queryService.getRolesList()
    }
}

//add a employee question set
const addEmployeeFirstName = {
    type: 'input',
    name: 'employeeFirstName',
    message: 'Please enter the employee\'s first Name'
}
const addEmployeelastName = {
    type: 'input',
    name: 'employeeLastName',
    message: 'Please enter the employee\'s last Name'
}

async function addEmployeeRole() {
    return {
        type: 'list',
        name: 'employeeRole',
        message: 'Please select the employee\'s role',
        choices: await queryService.getRolesList()
    }
}

async function addEmployeeManager() {
    return {
        type: 'list',
        name: 'employeeManager',
        message: 'Please select the employee\'s manager',
        choices: await queryService.getEmployeeList()
    }
}

async function selectEmployee() {
    return {
        type: 'list',
        name: 'selectEmployee',
        message: 'Please select an employee',
        choices: await queryService.getEmployeeList()
    }
}


//update an employee role question set
//display employee list
//question to select employee id
//question to select new role
//display confirmation message


const generateInitialQuestion = function () {
    return inquirer.prompt([selection]);
}

const generateAddDepartmentQuestions = function () {
    return inquirer.prompt([
        addDepartment
    ]);
}

const generateAddRoleQuestions = async function () {
    return inquirer.prompt([
        addRole,
        addRoleSalary,
        await addRoleDepartment()
    ])
}

const generateAddEmployeeQuestions = async function () {
    return inquirer.prompt([
        addEmployeeFirstName,
        addEmployeelastName,
        await addEmployeeRole(),
        await addEmployeeManager(),
    ])
}

const generateUpdateEmployeeQuestions = async function () {
    return inquirer.prompt([
        await selectEmployee(),
        await addEmployeeRole(),

    ])
}

module.exports = {
    generateInitialQuestion,
    generateAddDepartmentQuestions,
    generateAddRoleQuestions,
    generateAddEmployeeQuestions,
    generateUpdateEmployeeQuestions
};
