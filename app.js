const {Configuration , OpenAIApi} = require("openai");
const dotenv = require("dotenv");
const readLineSync = require("readline-sync");
const colors = require("colors")

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

async function main(){
    console.log(colors.bold.green("Welcome to Chatbot PRogram"));
    console.log(colors.bold.blue("Now you can start chatting..."));

    const chatHistory = [];

    while(true){

        const userInput = readLineSync.question(colors.yellow("You: "));

        try {
       
            const messagess = chatHistory.map(([role,content])=> ({role, content})) ;

            messagess.push({ role: "user" , content: userInput});

            const completion =await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages:messagess,
        });

        const chatCompletion = completion.data.choices[0].message.content;

        if(userInput.toLowerCase() === "exit"){
                console.log(colors.green("Bot: " )+ chatCompletion); 
                return;
            }
         
            console.log(colors.green("Bot: " )+ chatCompletion);  
            
            chatHistory.push(["user", userInput]);
            chatHistory.push(["assistant", chatCompletion ]);

         } catch (error) {
            console.log(colors.red("Error: " , error.message))
        }
    }
}

main();