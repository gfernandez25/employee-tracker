INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000 , 4),
       ('Lawyer', 190000 ,  4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('James', 'Fraser', 1, NULL),
       ('Jack', 'London', 2, 1),
       ('Robert', 'Bruce', 2, 1),
       ('Peter', 'Greenaway', 2, 1),
       ('Derek', 'Jarman', 2, 1),
       ('Paolo', 'Pasolini', 2, 1),
       ('Heathcote', 'Williams', 3, NULL),
       ('Sandy', 'Powell', 3, NULL),
       ('Emil', 'Zola', 4, 7),
       ('Sissy', 'Coalpits', 4, 7),
       ('Antoinette', 'Capet', 4, 7),
       ('Samuel', 'Delany', 4, 8),
       ('Tony', 'Duvert', 4, 8),
       ('Dennis', 'Cooper', 4, 8),
       ('Monica', 'Bellucci', 4, 8),
       ('Samuel', 'Johnson', 5, NULL),
       ('John', 'Dryden', 6, NUll),
       ('Alexander', 'Pope', 7, 17),
       ('Lionel', 'Johnson', 7, 17);

