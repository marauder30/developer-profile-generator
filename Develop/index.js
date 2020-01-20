const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const Prince = require("prince");
const generateHTML = require("./generateHTML");
let username = [];
let color;
let realName;

// module.exports = myData = [realName, company, location, github, blog, bio, publicRepos, followers, following];




const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {
        return inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is your GitHub username?"
            },
            {
                type: "list",
                name: "color",
            message: "What color would you prefer?",
            choices: ["green", "blue", "pink", "red"]
        }
    ]);

    
}


async function axiosCall() {
    
  try {
              return axios
                .get(`https://api.github.com/users/${username}`)
                .then(function(response) {
                        




                  console.log(response.data.name);
                  realName = response.data.name;
                  console.log(realName);

                  // starsCall();


                  return response.data;
                }) 

            


                
} catch(err) {

  console.log(err);
}
}



async function starsCall() {

  try {


  
  return axios
  .get(`https://api.github.com/users/${username}/repos`)
  .then(function(response) {

    console.log(realName);
    console.log(username);

    console.log(response.data[17].stargazers_count);

    return response.data;

  })
} catch(err) {
  console.log(err);
}

}

// async function 



async function init() {
                            
                            try {
                                const answers = await promptUser();
                                

                                console.log(answers);
                                username = answers.name;
                                color = answers.color;


                                let userData = await axiosCall();

                                console.log(userData);


                                let userStars = await starsCall();

                                // axiosCall();

                                console.log(userStars[2].stargazers_count);


                                // forEach loop to pull stargazers_count from each
                                // array and tally the collected numbers
                                

                                const html = generateHTML(answers, userData);
                                await writeFileAsync(`${username}.html`, html);
                                console.log(`Successfully wrote to ${username}.html!`);
                                
                                
                                
                                Prince()
                                .inputs(`${username}.html`)
                                .output(`${username}.pdf`)
                                .execute()
                                .then(function () {
                                  console.log("OK: Done")
                                }, function (error) {
                                  console.log("ERROR: ", util.inspect(error))
                                })
                            
                                
                                
                                
                                
                              } catch(err) {
                                console.log(err);
                              }
                              
}
                          
                            
                            
init();

                    
                            
                            