INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Marketing"),
        ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES  ("Head of Sales", 125000, 1),
        ("Salesperson", 80000, 1),
        ("Electrical Engineer", 200000, 2), 
        ("Software Engineer", 175000, 2), 
        ("Accountant", 125000, 3), 
        ("Head of Marketing", 200000, 4), 
        ("Marketing Assistant", 130000, 4), 
        ("VP Human Resources", 190000, 5), 
        ("Office Manager", 80000, 5); 

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Bella", "Swan", 3), 
        ("Edward", "Cullen", 1),
        ("Jacob", "Black", 6),
        ("Charlie", "Swan", 4),
        ("Alice", "Cullen", 2),
        ("Seth", "Clearwater", 7), 
        ("Emmett", "McCarty", 5), 
        ("Rosalie", "Hale", 8), 
        ("Jasper", "Hale", 9);