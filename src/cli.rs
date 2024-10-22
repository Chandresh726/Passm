use clap::{Arg, Command};

pub fn create_cli() -> Command {
    Command::new("passm")
        .version("1.0")
        .about("A CLI password manager to securely store and retrieve passwords.")
        .long_about("Passm is a command-line utility that allows you to securely manage passwords for different services using encryption. It supports adding, retrieving, listing, updating, and deleting password entries.")
        .subcommand(
            Command::new("init")
                .about("Initialize the password manager")
                .long_about("Sets up the password manager with a master password. You must initialize the manager before adding any passwords."),
        )
        .subcommand(
            Command::new("add")
                .about("Add a new password entry for a service")
                .arg(Arg::new("service").required(true).help("Service name (e.g., 'github')"))
                .arg(Arg::new("username").short('u').long("username").help("Username for the service"))
                .arg(Arg::new("password").short('p').long("password").help("Password for the service"))
                .long_about("Adds a new password entry for a given service. If a username or password is not provided, you'll be prompted to enter it interactively."),
        )
        .subcommand(
            Command::new("get")
                .about("Retrieve the password for a service")
                .arg(Arg::new("service").required(true).help("Service name"))
                .long_about("Retrieves and displays the username and password for the specified service. You'll need to provide your master password to decrypt the data."),
        )
        .subcommand(
            Command::new("list")
                .about("List all stored services")
                .long_about("Displays a list of all the services for which passwords have been stored in the password manager."),
        )
        .subcommand(
            Command::new("update")
                .about("Update the username or password for a service")
                .arg(Arg::new("service").required(true).help("Service name"))
                .arg(Arg::new("username").short('u').long("username").help("New username"))
                .arg(Arg::new("password").short('p').long("password").help("New password"))
                .long_about("Updates the username and/or password for an existing service entry. The current entry will be decrypted before being updated."),
        )
        .subcommand(
            Command::new("delete")
                .about("Delete a password entry for a service")
                .arg(Arg::new("service").required(true).help("Service name"))
                .long_about("Deletes the stored username and password for the specified service. You'll need to confirm your master password before deletion."),
        )
}