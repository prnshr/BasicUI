let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");

// call to the particular server and response mai uska html lelo
// firr uss server prr cheerio ki help see parse krk, information extract krlo
// firr uss information ko txt file mai store kra do

let url = "https://www.worldometers.info/coronavirus/?fbclid=IwAR35ZFiRZJ8tyBCwazX2N-k7yJjZOLDQiZSA_MsJAfdK74s8f2a_Dgx4iVk";

request(url , cbRequest);

function cbRequest(error, response, body){
    
    if(error == null && response.statusCode != 404){
        // cheerio prr call krdo
        parseResponse(body);

    }
    else{
        console.log("Some Problem Ocurred");
        console.log(error);
        console.log(response.statusCode);
    }
}


// cheerio mai loading and extraction, 2 phases hote hai
// All we want to do is to is to extract Total cases, Deaths and Recovered
// We'll aceess them with the help of selectors and combinators

function parseResponse(body){

   
    let data ="";

    let $ = cheerio.load(body);
    let ContentArr = $("#maincounter-wrap >div >span");
    let Headings = $("#maincounter-wrap >h1");

    

    // console.log(ContentArr);
    for(let i = 0; i < ContentArr.length;i++){
        // console.log($(ContentArr[i]).text());
        let currContent =$(ContentArr[i]).text();
        let currHeading = $(Headings[i]).text();

        let str = currHeading + " : " + currContent;
        data = data +str+"\n";
    }

    fs.writeFileSync("data.txt",data);

    console.log("The Data is stored as data.txt, Execution Done!!!!!");

}
