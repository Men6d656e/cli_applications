#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";

const program = new Command();

program
  .version("1.0.0")
  .description("A simple greeting CLI")
  .argument("<name>", "user to greet")
  .action((name) => {
    console.log(chalk.green(`Hello, ${name}! Welcome to the terminal.`));
  });

program.parse(process.argv);
