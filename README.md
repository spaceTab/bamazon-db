# Bamazon online shopping
## An interactive shopping application made with _mySql_ & _node.js_ allowing users to to pick from three different categories **Customer, Manager, Supervisor**. Each category gives the user a different options to choose from.

# Customer Page
### The customer page gives the user the option to choose which file they will run at the very beginning. Letting them decide between the Customer, Manager, and Supervisor optionsallows for the user to purchase an item, from the displayed items. Showing how many the user bought, and what is left in stock. After purchasing it the user is then prompted to see if they would like to make a purchase. This continues until the user says no to making another purchase.
![customer](./code/images/customer_1.gif)

# Manager Page
### The manager page, gives the user 4 options, Restock item, add item, remove item, and check for items with a stock less than 5. The restock option allows the user to select a pre-existing item within the database, and add a specified amount of stock to it. The add item allows the user to add a completely new item into the database. Setting it's name, price, & stock quantity. The remove item allows the user to input a specific item id of a pre-existing item in the database, and remove it. The low stock option will display a table of all the items with a stock amount that is less than 5. 
![mangager](./code/images/manager.gif)

# Supervisor Page

### Allows the user to add a new department into the database, as well as to look at the total profits of each department with in the database. The total profits column is added dynamically. 
![supervisor](./code/images/supervisor.gif)

# Bamazon Starter Page
### The Bamazon Starter page if ran gives the user a beggining prompt that allows them to choose between the 3 of the files, so they can decide whether they would like to use the Customer, Manager, or the Supervisor page.




# Technologies used: 
* Node.js
* Javascript
* SQL
  - *mySql Work bench*
* Vagrant
  - *ubuntu 14.04 server*
## NPM installs
* mySQL
* inquirer
* cli-table
* dotenv

# How to use
* Clone repo onto your local machine & open CLI of your choosing
* enter the cloned repos directory directory
    - *OPTIONAL*
    - *Run in vagrant (Virtual Machine)*
    - *Install VAGRANT/Virtualbox*
    - *Once in the cloned repository*
    - *run the command _vagrant up_ and once that is completed _vagrant ssh_*

* then navigate to the code directory by running _cd /var/code/_
* once in that directory you can begin testing the app by running _node bamazonStarter_

* If you would like to test each page individually, run these commands
* _node bamazonCustomer.js_    :: For Customer Pagelike you wouldn't 
* _node bamazonManager.js_     :: For Manager Page
* _node bamazonSupervisor.js_ :: For Supervisor Page

### Developed by
###### Jake Plaisted
###### In September of 2018