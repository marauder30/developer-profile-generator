const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const generateHTML = require("./generateHTML");
let username;
let realName;

// module.exports = myData = [realName, company, location, github, blog, bio, publicRepos, followers, following];




const writeFileAsync = util.promisify(fs.writeFile);


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


async function axiosCall() {
    
        try {
        
                axios
                .get(`https://api.github.com/users/${username}`)
                .then(function(response) {
                        console.log(response.data);
            
                        realName = response.data.name;
                        console.log(realName);


            

                    })
                }  catch(err) {
                        console.log(err);
                    }
                
                }
                
// function axiosCall() {
    
    //     axios
    //     .get(`https://api.github.com/users/${username}`)
    //     .then(function(response) {
        //         realName = response.data.name;
        //         console.log(realName);
        //     })
        // }

        
        // function writeToFile(fileName, data) {
            
    // }
    
    async function init() {
        
        try {
            const answers = await promptUser();
            
            username = answers.name;
            
            
            
            
            axiosCall();
            
            const html = generateHTML(answers);
            await writeFileAsync(`${username}.html`, html);
            console.log(`Successfully wrote to ${username}.html!`);
            
            
            
            
        } catch(err) {
            console.log(err);
        }
        
    }
    
    init();
    
    
    