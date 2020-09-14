// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/
function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2?
 *    counter1 is a closure; this counter uses lexical context inside of the inner function counter() when manipulating a variable declared in the outer scope of the function counterMaker().
 *    counter2 is not a closure. This counter utilizes a global variable and has nothing regarding nested scopes other than reaching outside to the global scope from within the function. 
 * 
 * 2. Which of the two uses a closure? How can you tell?
 *    counter1 is the closure. This counter uses lexical context inside of the inner function counter() when manipulating a variable declared in the outer scope of the function counterMaker(). 
 *    The variable count is declared within the function counterMaker, therefore making it locally scoped at the function level. 
 * 
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? 
 *    counter1 would be preferable if a programmer was aiming to associate the count variable with the specific counter and be able to make multiple instances of this counter. 
 *    
 *    counter2 would likely be better in the situation wherein only one counter was being used and only one "count" variable was being manipulated. Creating nested functions typically leads to 
 *    memory duplicity and thus slows applications down, so counter2 would be the way to go if the developer only wanted the ONE counter. 
 *
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}


/* Task 2: inning() 

Write a function called `inning` that generates a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning(){
  const score = Math.floor(Math.random() * 3);
  return score;
}
console.log(inning());
console.log(inning());
console.log(inning());


/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/ 
function finalScore(inning, numIns){
  let homeScore = 0;
  let awayScore = 0;
  for (let i=0; i<numIns; i++) {
    homeScore += inning(); 
    awayScore += inning();
  }
  return {
    "Home": homeScore,
    "Away": awayScore,
  }
}
console.log(finalScore(inning, 9));

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(2) A number of innings

and returns the score at each pont in the game, like so:

1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam

Final Score: awayTeam - homeTeam */

function scoreboard(getInningScore, inning, numInnings, game) {
  game = getInningScore(game, inning);
  return `${numInnings} inning: Away ${game.awayScore} - Home ${game.homeScore}`;
}

function getInningScore(game, inning) {
  inningHome = inning();
  inningAway = inning();
  game.homeScore += inningHome;
  game.awayScore += inningAway;
  inning++;
  return game;
}


const game = {
  homeScore: 0,
  awayScore: 0,
  inning: 0,
}


console.log(scoreboard(getInningScore, inning, 1, game));
console.log(scoreboard(getInningScore, inning, 2, game));
console.log(scoreboard(getInningScore, inning, 3, game));
console.log(scoreboard(getInningScore, inning, 4, game));
console.log(scoreboard(getInningScore, inning, 5, game));
console.log(scoreboard(getInningScore, inning, 6, game));
console.log(scoreboard(getInningScore, inning, 7, game));
console.log(scoreboard(getInningScore, inning, 8, game));
console.log(scoreboard(getInningScore, inning, 9, game));






/*******************************************************************************************************/
// PERSONAL, CUSTOM FUNCTION THAT CREATES A GAME OBJECT AND DOES EVERYTHING IN THIS ASSIGNMENT IN A DIFFERENT WAY 
function startGame() {
  return {
    "Home": 0,
    "Away": 0,
    "Inning": 0,
    scoreInning: function() {
      this["Inning"]++;
      this["Home"] += inning();
      this["Away"] += inning();
    },
    scoreboard: function() {
      return `${this["Inning"]} inning: Away ${this["Away"]} — Home ${this["Home"]}`;
    },
  };
}


const game1 = startGame();

function playInning(game) {
  game.scoreInning();
  console.log(game.scoreboard());
}
playInning(game1);
playInning(game1);
playInning(game1);
playInning(game1);
playInning(game1);
playInning(game1);
playInning(game1);
playInning(game1);
playInning(game1);