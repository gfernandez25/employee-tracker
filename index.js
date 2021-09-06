const questionsService = require('./utils/questions.service');
const tablesService = require('./utils/tables.service');
const queryService = require('./utils/queries.service');
const CFonts = require('cfonts');

init();


function init() {

    CFonts.say('Employee Tracker', {
        font: 'tiny',                       // define the font face
        align: 'left',                      // define text alignment
        colors: ['red', 'green', 'gray'],   // define all colors
        background: 'transparent',          // define the background color, you can also use `backgroundColor` here as key
        letterSpacing: 1,                   // define letter spacing
        lineHeight: 1,                      // define the line height
        space: true,                        // define if the output text should have empty lines on top and on the bottom
        maxLength: '0',                     // define how many character can be on one line
        gradient: ['red', "#f80"],          // define your two gradient colors
        independentGradient: false,         // define if you want to recalculate the gradient for each new line
        transitionGradient: false,          // define if this is a transition between colors directly
        env: 'node'                         // define the environment CFonts is being executed in
    });


    initialQuestions();
}

async function initialQuestions() {
    //console.log('\n')
    const answer = await questionsService.generateInitialQuestion()

    switch (answer.selectedItem) {
        case 'view all departments':
            viewAllDepartments()
            break;
        case 'view all roles':
            viewAllRoles()
            break;
        case   'view all employees':
            viewAllEmployees()
            break;
        case    'add a department':
            addDepartment()
            break;
        case 'add a role':
            addRole()
            break;
        case 'add an employee':
            addEmployee()
            break;
        case 'update an employee role':
            updateEmployee()
            break;
    }
}

async function viewAllDepartments() {
    const data = await queryService.getDepartments()
    tablesService.displayTable(data)
    await initialQuestions()
}

async function viewAllRoles() {
    const data = await queryService.getAllRoles()
    tablesService.displayTable(data)
    await initialQuestions()
}

async function viewAllEmployees() {
    const data = await queryService.getEmployees()
    tablesService.displayTable(data)
    await initialQuestions()
}

async function addDepartment() {
    //display departments
    const data = await queryService.getDepartments()
    tablesService.displayTable(data)

    // collecting department name
    const answer = await questionsService.generateAddDepartmentQuestions()

    //update departments table
    queryService.setDepartment(answer.departmentName)

    await viewAllDepartments()
}

async function addRole() {
    //display roles table
    const data = await queryService.getAllRoles()
    tablesService.displayTable(data)

    // ask user questions : role name , salary and dept ID
    const answer = await questionsService.generateAddRoleQuestions()

    //destructure answers
    const {roleName, roleSalary, roleDepartment} = answer;

    //insert the parameters into role table
    queryService.setRole(roleName, roleSalary, roleDepartment)

    await viewAllRoles();
}

async function addEmployee() {
    const data = await queryService.getEmployees()
    tablesService.displayTable(data)

    const answer = await questionsService.generateAddEmployeeQuestions()

    const {employeeFirstName, employeeLastName, employeeRole, employeeManager} = answer;

    queryService.setEmployee(employeeFirstName, employeeLastName, employeeRole, employeeManager);

    await viewAllEmployees()
}

async function updateEmployee() {
    const answer = await questionsService.generateUpdateEmployeeQuestions()

    const {selectEmployee, employeeRole} = answer;

    queryService.updateEmployeeRole(selectEmployee, employeeRole);

    await viewAllEmployees()
}