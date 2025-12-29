#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

let users = [
  { id: 1, name: "Akash" },
  { id: 2, name: "Mirza" },
  { id: 3, name: "Saqib" },
];

program
  .name("cli-4_self_try")
  .version("1.0.0")
  .description("Manage a Simple User List");

program
  .command("get")
  .description("Display all Users List")
  .action(() => {
    console.log(`\n--- Current User List ---\n`);
    users.forEach((u) => {
      console.log(`${u.id}: ${u.name}`);
    });
  });

program
  .command("create <name>")
  .description("Add a new user")
  .action((username) => {
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    users.push({ id: newId, name: username });
    console.log(`Added user: ${username} (ID: ${newId})`);
  });

program
  .command("update <id> <newName>")
  .description("Update a user's name by ID")
  .action((id, newName) => {
    const user = users.find((u) => u.id === parseInt(id));
    if (!user) {
      console.log(`User with ID: ${id} not found.`);
      return;
    }
    user.name = newName;
    console.log(`Updated ID ${id} to name: ${newName}`);
  });

program
  .command("delete <id>")
  .description("Remove a user by ID")
  .action((id) => {
    const initialLength = users.length;
    users = users.filter((u) => u.id !== parseInt(id));

    if (users.length < initialLength) {
      console.log(`Deleted user with ID: ${id}`);
    } else {
      console.log(`! No user found with ID: ${id}`);
    }
  });

program.parse();
