
USE bamazon;

CREATE TABLE departments (
    department_id   INTEGER(50)   NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100)  NOT NULL,
    overhead_cost   DECIMAL(10,2) NOT NULL,

    PRIMARY KEY (department_id)
);

INSERT INTO deparments (department_name, overhead_costs)
    VALUES ('clothing', 0.75),
           ('techonlogies', 5.00),
           ('books', 1.00),
           ('foods', 3.25),
           ('pet accessories', 3.79),
           ('phone accessories', 2.75),
           ('artwork', 1.25)