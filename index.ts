#!/usr/bin/env node

import  inquirer from 'inquirer';
import  chalk from 'chalk';

// ----------------------------------Function to animate text------------------------------------------

async function animateText(text: string, delay: number = 30) {
    for (let char of text) {
        process.stdout.write(char);
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
}

async function fastAnimate(text: string, delay: number = 18) {
    for (let char of text) {
        process.stdout.write(char);
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
}

async function slowAnimate(text: string, delay: number = 30) {
    for (let char of text) {
        process.stdout.write(char);
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
}
//----------------------------ASKING USER NAME-----------------------------------

const askUserName = async () => {

    const userName_ans = await inquirer.prompt([
      {
      name: `usr_name`,
      type: `input`,
      message: chalk.green(`\nWhat is Your Good Name:`),
      validate: (input) => {
  
        const trimmedInput = input.trim();
        if (trimmedInput === ``) {
          return chalk.redBright(`Please enter your name.`);
        } else if (!/^[a-zA-Z]+$/.test(trimmedInput)) {
          return chalk.redBright(`Please enter a valid name without numbers.`);
        }
        return true;
      },
      }
    ]);
    return userName_ans.usr_name;
  };
  const userName = await askUserName();
  
  //-------------------------CountDown Timer Heading -------------------------
  
  let appName: string = chalk.magenta.underline.italic(
    ` Welcome "${userName}" in Countdown Timer App: `
  );
  await slowAnimate(chalk.magenta.bold(`\n<------------------------------${appName}--------------------------------->\n\n`));
  
  
  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  
  async function run() {
    const { duration } = await inquirer.prompt([
      {
        type: 'input',
        name: 'duration',
        message: 'Enter the duration of the timer in seconds:',
      },
    ]);
  
    const endTime = new Date(Date.now() + parseInt(duration) * 1000);
  
    while (Date.now() < endTime.getTime()) {
      const timeLeft = (endTime.getTime() - Date.now()) / 1000;
      console.log(chalk.yellow(`Time left: ${timeLeft.toFixed(2)}`));
      await sleep(100);
    }
  
    console.log(chalk.green('Time\'s up!'));
  }
  
  run().catch((error) => {
    console.error(chalk.red(error.message));
  });
  