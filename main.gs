/*
MARS 2614
FIRST Stronghold
Scouting Bot 2016

Created by: Sidd Subramanyam, Daphne Barretto
*/

//Google Apps Script uses a form of JavaScript
//Integrates with webhooks with Slack.com


//////////////////////////////////////////////////doGet//////////////////////////////////////////////////

var userName = "";     //declares and initializes variable userName

//Runs on HTTP GET -> Need to implement if statments to check command names
function doGet(e){
  
  //postToSlack("Test Title","Test Message",'good');     //test message
  
  botLog(e.parameter.command, e.parameter.user_name, e.parameter.text);    //logs the slash command, inputted parameters/text user, and time of usage into a separate spreadsheet
  
  userName = e.parameter.user_name;                      //userName is valued with the user of the slash command
  
  if (e.parameter.command == "/pun"){                    //if "/pun" was used, run function makePun
    makePun();
  }
  else if (e.parameter.command == "/teaminfosheet"){     //if "/teaminfosheet" was used, run function teamInfoLinks
    teamInfoLinks(e.parameter.text);
  }
  else if (e.parameter.command == "/qualmatch"){         //if "/qualmatch" was used, run function qualMatchComparison
    qualMatchComparison(e.parameter.text);
  }  
//  else if (e.parameter.command == "/nextmatch"){       //"/nextmatch" is not a currently usable function and is in development
//    nextMatchComparison();
//  }
  
  return ContentService.createTextOutput("");            //function doGet returns a space
}


////////////////////////////////////////////////// /qualmatch //////////////////////////////////////////////////


//Posts team datasheet link to slack
function qualMatchComparison(qualNumber){
  
  var spreadsheetKey = "1MmqZKaqdiNWPYjyURGS6DUc3er48yZIs3vLPsiZXKO4";
  var qualificationComparisonLink = "https://docs.google.com/spreadsheets/d/1MmqZKaqdiNWPYjyURGS6DUc3er48yZIs3vLPsiZXKO4/pubhtml?gid=2143242851&single=true";
  
  if (userName == "ryan_utzman"){  //Rickroll for ryan
    qualificationComparisonLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }
  
  SpreadsheetApp.openById(spreadsheetKey).getSheetByName("Qualification Comparison").getRange("C2").setValue(qualNumber);  
  Utilities.sleep(1000);
  postToSlack("Match Info for Qualification " + qualNumber, "<" +  qualificationComparisonLink + "| Click Here >" , 'good' );
  
};


////////////////////////////////////////////////// /nextmatch NOT CURRENTLY FUNCTIONAL//////////////////////////////////////////////////


//Posts team datasheet link to slack
function nextMatchComparison(){
  
  var spreadsheetKey = "1MmqZKaqdiNWPYjyURGS6DUc3er48yZIs3vLPsiZXKO4";
  var qualificationComparisonLink = "https://docs.google.com/spreadsheets/d/1MmqZKaqdiNWPYjyURGS6DUc3er48yZIs3vLPsiZXKO4/edit#gid=2143242851";
  
  SpreadsheetApp.openById(spreadsheetKey).getSheetByName("MARS Matches").getRange("K13").setValue(Date());  
  
/*  for (var matchRow = 2; matchRow > 11; matchRow++) {
  
    var matchTime = SpreadsheetApp.openById(spreadsheetKey).getSheetByName("MARS Matches").getRange("H2").getValue();
    
    //if (matchRow =
  
        var i = 3;
  
        var qualNumber = SpreadsheetApp.openById(spreadsheetKey).getSheetByName("MARS Matches").getRange(i, 1).getValue();
  
    var winnerColor = (150,0,255);
  
    SpreadsheetApp.openById(spreadsheetKey).getSheetByName("Qualification Comparison").getRange("C2").setValue(qualNumber);  
    
    
  
    postToSlack("Next Match Info for Qualification " + qualNumber, "<" + qualificationComparisonLink  + "|Click here>", winnerColor );
  
  }*/
    
};


////////////////////////////////////////////////// /teaminfosheet //////////////////////////////////////////////////


//Posts team datasheet link to slack
function teamInfoLinks(teamNumber){
  
  var teamLink = teamLookup(teamNumber);
  
  if (userName == "ryan_utzman"){  //Rickroll for ryan
    teamLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }
  
  //Logger.log(teamLink);
  postToSlack("Team Info for " + teamNumber, "<" + teamLink  + "|Click here>", 'good' );
  
};


////////////////////////////////////////////////// /pun //////////////////////////////////////////////////


//Makes Puns
function makePun(){

    var puns = ["I wasn't going to get a brain transplant, but I changed my mind.", 
                "I'd tell you a chemistry pun but I know I won't get a reaction.", 
                "Don't eat a clock. It's very time consuming.", 
                "Don't trust stairs. They're always up to something.", 
                "What's that pun about amnesia? I forgot...", 
                "I did a theatrical performance about puns. It was really just a play on words.",
                "You should never fall for a tennis player. Love means nothing to them.",
                "I'm reading a book about anti-gravity. It's impossible to put down.",
                "The moon is having an economic crisis! It's down to its last quarter!",
                "Watch out... I make periodic chemistry puns!",
                "I'm ALWAYS right! -the arrogant 90 degree wall corner",
                "Chemistry jokes? What has my life come to? Time to Zinc it over...",
                "It got really tense, really quickly... Past, Present, and Future just came in...",
                "Clones are people 2! -pacifist clone activist",
                "Haha! You guys have no life! -Earth to other planets in the solar system",
                "Stop it, pi! You're being irrational! -i; At least I'm real! -pi",
                "The programmers quit when they didn't get arrays...",
                "I entered 10 of these to a pun competition to see which would win, but no pun in 10 did...",
                "Thanks for nothing to whomever invented the concept of zero!",
                "Math puns are the first sin(madness)",
                "If you start discussing infinity, you'll never hear the end of it.",
                "An astronaut stepped in gum on the moon and now he's stuck in orbit."
               ];
    var randomNumber = Math.random() * puns.length;    //Multiply by array size value
    var roundedRandomNumber = Math.round(randomNumber);//Round to an integer
  
    if (userName == "ryan_utzman"){  //Rickroll for ryan
      teamLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    } else {
      postToSlack("A good pun is its own reword",puns[roundedRandomNumber],'good');   //posts randomly chosen pun
    } 
}

/* TO BE IMPLEMENTED

function teamInfoText(){};
function matchInfoText(){};
function defenseSelection(){};

*/

////////////////////////////////////*Utility Functions*///////////////////////////////////////////

//logging information to spreadsheet since GAS can't log Web Apps
function botLog(command, user_name, text){
  var sheetId = "1cdaqAk4OFKQCNCJ17xAK5NuKvB2l3KRFKN7sXajaobc";
  var logSpreadsheet = SpreadsheetApp.openById(sheetId);
  var logSheet = logSpreadsheet.getSheetByName("Log");
  logSheet.insertRowBefore(1); 
  logSheet.getRange("A1").setValue(command); //Log command
  logSheet.getRange("B1").setValue(text); //Log inputted text/parameters
  logSheet.getRange("C1").setValue(user_name); //Log user
  logSheet.getRange("D1").setValue(Date()); //Log time
}

//look up team number and return team data sheet url
var scoutingSpreadsheetKey = "1b5eJs4Qwss_ovfW6l3bX9hyx7la93kfncO7sYaeX8hQ";

function teamLookup(teamNumber){  
  var teamsLookup = SpreadsheetApp.openById(scoutingSpreadsheetKey).getSheetByName("Teams").getRange("B2:C76").getValues();
  var thing = "ERROR: TEAM NOT FOUND";
  for(var i = 0; i < teamsLookup.length; i++){
    var teamNumString = teamsLookup[i][0];
    if(("" + teamNumber).equals(teamNumString))
    {
      thing = teamsLookup[i][1];
      i = teamsLookup.length + 10;
    }
    
  }
  
  //Logger.log(teamsLookup);
  Logger.log(thing);
  return thing;
};

//Utility function to simplify sending messages to slack
function postToSlack(title, message, color){
  
  var payload= {
	"fallback": title, //Smartphone Notification Message
	"color": color, // Can either be one of 'good', 'warning', 'danger', or any hex color code
	"fields": [{
			"title": title, // Message Header
			"value": message, // Message to be displayed
			"short": false // Optional flag indicating whether the `value` is short enough to be displayed side-by-side with other values
		      }]
    };  
  
  //Logger.log(payload);
  
  var options = {
            'method' : 'post',
            'payload' : JSON.stringify(payload),
        };
  
  var webhookUrl = 'https://hooks.slack.com/services/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';
  UrlFetchApp.fetch(webhookUrl, options);
} 
