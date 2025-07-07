const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const mongoose = require("mongoose")
const prompt = require('prompt-sync')();
const Customer = require("./model/customer.js");

const username = prompt("What is your name? ");
console.log(`Your name is ${username}`);


const main = async () => {    // Function to connect database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    function displayMenu() {   // Display Menu Function
        console.log("\nWelcome to the CRM\n");
        console.log("What would you like to do?\n");
        console.log("  1. Create a customer");
        console.log("  2. View all customers");
        console.log("  3. Update a customer");
        console.log("  4. Delete a customer");
        console.log("  5. quit");
        return prompt("Number of action to run: ");
    }
    let choice = displayMenu(); // Call displayMenu to show the menu
    console.log(`User selected: "${choice}"`);
    do {
        switch (choice) {
            case "1":
                console.log("Processing option 1");
                await createCustomer();
                break;
            case "2":
                console.log("Processing option 2");
                await viewCustomer(); // Call viewCustomer for option 2
                break;
            case "3":
                console.log("Processing option 3");
                await updateCustomer(); // Call updateCustomer for option 3
                break;
            case "4":
                console.log("Processing option 4");
                console.log("Customer Deleted");
                await deleteCustomer(); 
                break;
            case "5":
                console.log("Processing option 5");
                console.log("Exiting...");
                break;
            default:
                console.log("Invalid option, please try again.");
        }
        if (choice !== "5") {
            choice = displayMenu(); // Show menu again unless quitting
            console.log(`User selected: "${choice}"`);
        }
    } while (choice !== "5");


    await mongoose.connection.close();    // option 5 closes the application
    console.log("Exiting Application.");
}
async function createCustomer() {
    const customersName = prompt("Customers Name: ");
    const customersAge = prompt("Customers Age: ")
    await Customer.create({ name: customersName, age: customersAge })

}

async function viewCustomer() {   //view Customer Function
    console.log("Viewing Customers");
    const customers = await Customer.find()
    console.log("\nlist of Customers:");

    customers.forEach(customer => {  //Each Customer return ID Name Age
        console.log(`ID: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
        if (customer.length === 0) {
            console.log("No customers found.");
            return;
        }
    });
}
async function updateCustomer() {
    const updateCustomer = prompt("Customer ID");
    const customersName = prompt("Customers Name: ");
    const customersAge = prompt("Customers Age: ")
    await Customer.findByIdAndUpdate(updateCustomer, { name: customersName, age: customersAge })

}

async function deleteCustomer() {
    const deleteCustomer = prompt("Customer ID");
    await Customer.findByIdAndDelete("delete customer");
}









main()
