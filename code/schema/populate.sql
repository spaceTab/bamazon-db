/* drops table if it is exists */
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE         bamazon;

USE bamazon;

/* Creates table with neccisary columns*/
CREATE TABLE products (
    item_id         INTEGER(50) NOT NULL AUTO_INCREMENT,
    product_name    VARCHAR(50) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    item_price      DECIMAL(10,2) NOT NULL,
    stock_quantity  INTEGER(200)  NOT NULL,
    
    /* assigns primary key to item_id column */
    primary key (item_id)
);

/* inserts values into products table -> values added by order of column (populates)*/

/* my recent amazon purchases */
INSERT INTO products(product_name, department_name, item_price, stock_quantity)
    VALUES ('Etnies', 'clothing', '49.95', '100'),
           ('speakerbox', 'technologies', '8.95', '179'),
           ('Song of fire & ice', 'books', '50.00', '35'),
           ('shinRamen', 'food', '8.99', '200'),
           ('velocifire keyboard', 'technologies', '25.99', '123'),
           ('tabasco', 'foods', '3.99', '200'),
           ('lobster toy', 'pet accessories', '13.85', '89'),
           ('leather color', 'pet accessories', '9.99', '15'),
           ('HDMI cord', 'phone accessories', '2.99', '200'),
           ('guide to shell-scripts', 'books', '19.89', '10'),
           ('twizzlers LARGE', 'foods', '12.50', '200'),
           ('Neon Genesis-Poster', 'artwork', '15.00', '5')
