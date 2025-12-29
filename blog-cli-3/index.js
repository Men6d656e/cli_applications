#!/usr/bin/env node
// |==============================================================================================|
// |=  Learn from https://betterstack.com/community/guides/scaling-nodejs/commander-explained/  ==|
// |==============================================================================================|

import { Command } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";

const program = new Command();

function showError(messages) {
  console.error(chalk.red.bold(`Error: ${messages}`));
  process.exit(1);
}

program
  .name("blog-cli")
  .description("A ClI application built with Commander.js")
  .version("1.0.0")
  .option("-d, --debug", "output extra debugging information")
  .option("-f, --file <path>", "specify the file to process")
  .option("-t, --timeout <seconds>", "specify the timeout in seconds", "60")
  .option("-v, --verbose", "enable verbose output");

program
  .command("list")
  .description("List all items")
  .option("-a, --all", "list all items, including hidden ones")
  .action((options) => {
    console.log("Listing items...");
    if (options.all) {
      console.log("Including hidden items");
    }
  });

const validTypes = ["default", "special", "custom"];

program
  .command("create <name>")
  .description("create a new item")
  .option("-t, --type <type>", "specify the items type", "default")
  .action((name, options) => {
    if (name.length < 3) {
      console.error(
        showError("Error: The item name must be at least 3 characters long")
      );
      process.exit(1); // Exit with an error code
    }
    if (!validTypes.includes(options.type)) {
      console.error(
        showError(
          `Error: Invalid types "${
            options.type
          }".\nAllowed types: ${validTypes.join(", ")}`
        )
      );
      process.exit(1);
    }
    console.log(
      chalk.green(`Creating item '${name}' of type "${options.type}"`)
    );
  });

//   modofied create command
program
  .command("create2")
  .description("Create a new item with interactive input")
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the item name:",
        validate: (input) =>
          input.length >= 3
            ? true
            : "The name must be at least 3 characters long.",
      },
      {
        type: "list",
        name: "type",
        message: "Select the item type:",
        choices: ["default", "special", "custom"],
      },
    ]);

    console.log(
      chalk.green(
        `Successfully created item "${answers.name}" of type "${answers.type}"`
      )
    );
  });

program.parse();

// Access The options
const options = program.opts();

if (options.debug) {
  console.log("Debug mode i enabled");
  console.log("Options: ", options);
}
