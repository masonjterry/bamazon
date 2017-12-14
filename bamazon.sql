CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50),
department_name VARCHAR(50),
price INTEGER,
stock_quantity INTEGER,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 1000, 20), ("tv", "electronics", 600, 10), ("couch", "furniture", 500, 5), ("chair", "furniture", 50, 20), ("coffe maker", "appliances", 30, 30), ("washer", "appliances", 300, 5), ("refrigerator", "appliances", 600, 5), ("sunglasses", "accessories", 20, 50), ("backpack", "accessories", 30, 10), ("t-shirt", "clothing", 10, 40);

SELECT * FROM products;

UPDATE products SET product_name = "lawn chair", department_name = "furniture", price = 20, stock_quantity = 20 WHERE id = 13;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (product_name = "shoes", department_name = "clothing", price = 30, stock_quantity = 10);