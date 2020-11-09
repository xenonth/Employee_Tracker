const inquirer = require("inquirer");

const count = 0;
inquirer.prompt({
    name: "response",
    message: "who are you? ",
    type: "input",
}).then(function (anwers) {
    console.log(anwers.response)
})