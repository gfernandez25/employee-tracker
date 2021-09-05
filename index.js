const questionsService = require('./utils/questions.service');
const tablesService = require('./utils/tables.service');
const queryService = require('./utils/queries.service');

init();


function init() {
    initialQuestions();
}

async function initialQuestions() {
    console.log('\n')
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