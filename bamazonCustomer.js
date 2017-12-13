let inquirer = require("inquirer");
let mysql = require("mysql");
let colors = require("colors");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  listItems();
});

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
    console.log("IDNum", result.idNum);
    console.log("amount", result.amount);
    buyItem(result.idNum, result.amount);
  });
  }

function buyItem(id, amount) {
  connection.query("UPDATE products SET ? WHERE ?",
  [
    {
    stock_quantity: amount
  },
  {
    id: id
  }
],
  function(err, result){
    if (err) throw err;
    console.log("Thank you for your purchase");
  });
  whatToBuy();
  connection.end();
}
