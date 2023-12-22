import readlineSync from 'readline-sync';

const randomNumber = (rangeLen, minNumber = 0) => Math.floor(Math.random()
* rangeLen + minNumber); // helper

const getGameResult = (inputUserChoose, inputComputerNum, inputOptions) => { // helper
  let userChoose;
  let userFigure;
  let computerChoose = inputComputerNum + 1; // use starts from 1 when input from 0
  const computerFigure = inputOptions[computerChoose * 2 - 1]; // options = [number:str, figure...]
  const inputOptionsLen = inputOptions.length;

  // function to get userChooseNum and userFigure
  // Can be imported as needed as helper
  for (let i = inputOptionsLen - 1; i >= 0; i -= 1) {
    if (inputUserChoose === inputOptions[i]) {
      if (i % 2 === 0) { // in array: is number position else word
        userFigure = inputOptions[i + 1];
      } else {
        userFigure = inputOptions[i];
      }
      userChoose = Math.floor(i / 2 + 1);
      break;
    }
  }

  // Return output array of game result
  // Here might be changed computerChoose and userChoose
  switch (userChoose) {
    case 1:
    case 2:
    case 3:
      if (userChoose === computerChoose) {
        return [`draw! ${userFigure} are same as ${computerFigure}.`, ''];
      }
      // change order of last extreme element to the first if true
      if (userChoose === 1 && computerChoose === 3) {
        computerChoose = 0;
      }
      if (userChoose === 3 && computerChoose === 1) {
        userChoose = 0;
      }
      if (userChoose < computerChoose) { // compare elements order for user victory
        return [`you won! ${userFigure} beat ${computerFigure}.`, 'user'];
      }
      return [`computer won! ${computerFigure} beat ${userFigure}.`, 'computer']; // if user doesn't win
    default:
      return ['Wrong input', ''];
  }
};

// main
const options = ['Rock', 'Scissors', 'Paper'];
const inputOptions = ['1', 'rock', '2', 'scissors', '3', 'paper'];
const optionsLen = options.length;
const score = [0, 0];
let isGameAgain = true;
console.log('Welcome to the game "Rock, Scissors, Paper"!');
while (isGameAgain) {
  console.log('Choose your figure:');
  for (let i = 0; i < optionsLen; i += 1) {
    console.log(`${i + 1}. ${options[i]}`);
  }

  const userChoose = readlineSync.question('Your choose: ').trim().toLowerCase();
  const computerChoose = randomNumber(optionsLen);
  console.log(`Computer choose: ${options[computerChoose]}`);
  const [resultText, winner] = getGameResult(userChoose, computerChoose, inputOptions);

  // can be as helper to import for another modes
  if (winner === 'user') {
    score[0] += 1;
  }
  if (winner === 'computer') {
    score[1] += 1;
  }
  console.log(resultText);
  console.log(`Score is ${score.join(' : ')}`);

  // can be as helper to import for another modes
  let tryAgain = true;
  while (tryAgain) {
    const tryAnswer = readlineSync.question('Wanna try again? (yes/no): ').trim().toLowerCase();
    isGameAgain = !(tryAnswer === 'no');
    tryAgain = !(tryAnswer === 'yes' || tryAnswer === 'no');
  }
  console.log('');
}
console.log('Thanks for playing! See you next time!');
