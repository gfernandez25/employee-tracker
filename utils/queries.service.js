const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql123',
    database: 'employee_tracker'
});

const queries = {
    getDepartmentsQuery: `SELECT * FROM department;`,
    getDepartmentsListQuery: `SELECT id AS "value", name FROM department;`,
    getAllRolesQuery: `SELECT * FROM role;`,
    getRolesListQuery: `SELECT id AS "value", title AS "name" FROM role;`,
    getEmployeeListQuery: `SELECT id AS "value", CONCAT(first_name, " ", last_name) AS "name" FROM employee;`,
    getEmployeesQuery: `
        SELECT
            employee.first_name,
            employee.last_name,
            role.title,
            department.name AS department,
            role.salary,
            IFNULL(CONCAT(m.first_name, " ", m.last_name), '') AS manager
        FROM employee
        INNER JOIN role ON role.id=employee.role_id
        INNER JOIN department ON role.department_id=department.id
        LEFT JOIN employee m ON employee.manager_id=m.id;`,
    addDepartmentQuery: (departmentName) => `
        INSERT INTO department (name) 
        VALUES ("${departmentName}");`,
    updateEmployeeRoleQuery: (selectEmployee, employeeRole) => `
        UPDATE employee 
        SET role_id = ${parseInt(employeeRole)}
        WHERE id = ${parseInt(selectEmployee)};`,
    addRoleQuery: (role, salary, departmentId) => `
        INSERT INTO role (title, salary, department_id) 
        VALUES ("${role}", "${parseInt(salary)}", "${parseInt(departmentId)}");`,
    addEmployeeQuery: (firstName, lastName, roleId, managerId) => `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)         
        VALUES ("${firstName}", "${lastName}", "${parseInt(roleId)}", "${parseInt(managerId)}");`
}

// ----------------------------------------------------------
async function getDepartments() {
    return await submitQuery(queries.getDepartmentsQuery)
}

async function getDepartmentsList() {
    return await submitQuery(queries.getDepartmentsListQuery)
}

async function getAllRoles() {
    return await submitQuery(queries.getAllRolesQuery)
}

async function getRolesList() {
    return await submitQuery(queries.getRolesListQuery)
}

async function getEmployeeList() {
    return await submitQuery(queries.getEmployeeListQuery)
}

async function getEmployees() {
    return await submitQuery(queries.getEmployeesQuery)
}

async function setDepartment(departmentName) {
    const query = queries.addDepartmentQuery(departmentName);
    await submitQuery(query)
}

async function setRole(name, salary, departmentID) {
    const query = queries.addRoleQuery(name, salary, departmentID)
    await submitQuery(query)
}

async function setEmployee(firstName, lastName,  roleId, managerId) {
    const query = queries.addEmployeeQuery(firstName, lastName,  roleId, managerId)
    await submitQuery(query)
}

async function updateEmployeeRole(selectEmployee, employeeRole) {
    const query = queries.updateEmployeeRoleQuery(selectEmployee, employeeRole)
    await submitQuery(query)
}

// ------------------------
async function submitQuery(queryString) {
    const query = await db.promise().query(queryString);
    return query[0];
}

module.exports = {
    getDepartments,
    getDepartmentsList,
    getAllRoles,
    getRolesList,
    getEmployees,
    setDepartment,
    setRole,
    setEmployee,
    getEmployeeList,
    updateEmployeeRole
}