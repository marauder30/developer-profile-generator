const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateHTML = require("./generateHTML");
var username;

const writeFileAsync = util.promisify(fs.writeFile);

// const questions = [
  
// ];

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "WOT is your (github user)name?"
        },
        {
            type: "list",
            name: "color",
            message: "WOT is your favourite colour?",
            choices: ["green", "blue", "pink", "red"]
        }
    ]);
}


function writeToFile(fileName, data) {
 
}

async function init() {

    try {
        const answers = await promptUser();

        console.log(answers.name);

        username = answers.name;

        const html = generateHTML(answers);

        await writeFileAsync(`${username}.html`, html);

        console.log(`Successfully wrote to ${username}.html!`)
    } catch(err) {
        console.log(err);
    }

}

init();
