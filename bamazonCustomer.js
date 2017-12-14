let inquirer = require("inquirer");
let mysql = require("mysql");
let colors = require("colors");
let newStock = 0;

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  welcome();
});

function welcome() {
  inquirer.prompt([
    {
      message: "Would you like to buy something today? ('yes' or 'no')",
      name: "welcome"
    }
  ]).then(function(result) {
    if (result.welcome === "yes") {
      listItems();
    } else {
      console.log("Thank you!");
      connection.end();
    }
  });
}

function welcomeAgain() {
  inquirer.prompt([
    {
      message: "Would you like to buy something else today? ('yes' or 'no')",
      name: "welcome"
    }
  ]).then(function(result) {
    if (result.welcome === "yes") {
      listItems();
    } else {
      console.log("Thank you!");
      connection.end();
    }
  });
}

function listItems() {
  connection.query("SELECT * FROM products", function(err, data) {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      console.log("ID Number: ".yellow + data[i].id, "\nProduct Name: ".yellow + data[i].product_name, "\nDepartment Name: ".yellow + data[i].department_name, "\nPrice: ".yellow + data[i].price, "\nNumber In Stock: ".yellow + data[i].stock_quantity);
      console.log("-----------------------------");
    }
    whatToBuy();
  });
}

function whatToBuy() {
  inquirer.prompt([
    {
      name: "idNum",
      type: "input",
      message: "What is the ID of the product you want to buy?"
    },
    {
      name: "amount",
      type: "input",
      message: "How many would you like to buy?"
    }
  ]).then(function(result) {
    buyItem(result.idNum, result.amount);
  });
  }

function buyItem(id, amount) {
  connection.query("SELECT * FROM products", function(err, data) {
    if (err) throw err;
    if (id > data.length) {
      console.log("I'm sorry, we don't seem to have that item.");
      welcome();
    } else if (data[id -1].stock_quantity < amount) {
      console.log("We don't have that many in stock. Please check back later.")
      welcomeAgain();
    } else {
      newStock = data[id - 1].stock_quantity - amount;
      connection.query("UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: newStock
        },
        {
          id: id
        }
      ],
      function(err, result) {
        if (err) throw err;
        console.log("Thank you for your purchase");
        welcomeAgain();
      });
    }
  });
}
