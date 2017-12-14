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
  menuOptions();
});

function menuOptions() {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do to day?",
      choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Stop Working"],
      name: "task"
    }
  ]).then(function(ans) {
    switch (ans.task) {
      case "View Products For Sale":
        listProducts();
        break;
      case "View Low Inventory":
        lowInventory();
        break;
      case "Add to Inventory":
        addInventory();
        break;
      case "Add New Product":
        addProduct();
        break;
      case "Stop Working":
        stopWorking();
        break;
      default:
        break;
    }
  });
}

function moreWork() {
  inquirer.prompt([
    {
      message: "Would you like to do something else? ('yes' or 'no')",
      name: "moreWork"
    }
  ]).then(function(ans) {
    if (ans.moreWork === "yes") {
      menuOptions();
    } else {
      connection.end();
    }
  });
}

function stopWorking() {
  console.log("Have a good day!");
  connection.end();
}

function listProducts() {
  connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function(err, data) {
    for (let i = 0; i < data.length; i++) {
      console.log("Product ID: ".yellow + data[i].id + "\nProduct Name: ".yellow + data[i].product_name + "\nDepartment Name: ".yellow + data[i].department_name + "\nPrice: ".yellow + data[i].price + "\nNumber In Stock: ".yellow + data[i].stock_quantity);
      console.log("-----------------------------");
    }
    moreWork();
  });
}

function lowInventory() {
  connection.query("SELECT id, product_name, department_name, price, stock_quantity FROM products", function(err, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].stock_quantity < 10){
      console.log("Product ID: ".yellow + data[i].id + "\nProduct Name: ".yellow + data[i].product_name + "\nDepartment Name: ".yellow + data[i].department_name + "\nPrice: ".yellow + data[i].price + "\nNumber In Stock: ".yellow + data[i].stock_quantity);
      console.log("-----------------------------");
      }
    }
    moreWork();
  });
}

function addInventory() {
  console.log("addInventory is working");
  // what product would you like to add more of
  // add more of what they type to the item they selected
  menuOptions();
}

function addProduct() {
  console.log("addProduct is working");
  // add id
  // what product would you like to add (name)
  // what is the department_name
  // what is the price
  // how many items do you want to add
  menuOptions();
}
