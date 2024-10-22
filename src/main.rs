pub mod cli;
pub mod encryption;
pub mod manager;

use crate::manager::get_master_password;
use colored::*;
use dialoguer::{Input, Password};
use dotenv::dotenv;

fn main() {
    dotenv().ok();
    let matches = cli::create_cli().get_matches();

    if let Some(_) = matches.subcommand_matches("init") {
        initialize_password_manager();
    } else if let Some(matches) = matches.subcommand_matches("add") {
        let service = matches.get_one::<String>("service").unwrap();
        let username = matches.get_one::<String>("username");
        let password = matches.get_one::<String>("password");
        add_password_entry(service, username, password);
    } else if let Some(matches) = matches.subcommand_matches("get") {
        let service = matches.get_one::<String>("service").unwrap();
        get_password_entry(service);
    } else if let Some(matches) = matches.subcommand_matches("delete") {
        let service = matches.get_one::<String>("service").unwrap();
        delete_password_entry(service);
    } else if let Some(_) = matches.subcommand_matches("list") {
        list_password_entries();
    } else if let Some(matches) = matches.subcommand_matches("update") {
        let service = matches.get_one::<String>("service").unwrap();
        let new_username = matches.get_one::<String>("username");
        let new_password = matches.get_one::<String>("password");
        update_password_entry(service, new_username, new_password);
    }
}

fn initialize_password_manager() {
    println!("{}", "Create a master password: ".blue().bold());
    let master_password = Password::new()
        .with_prompt("Master password")
        .interact()
        .unwrap();
    let hashed_password = encryption::hash_password(&master_password);
    let manager = manager::PasswordManager::new(hashed_password);

    manager::save_manager(&manager);
    println!("{}", "Password manager initialized.".green().bold());
}

fn add_password_entry(service: &str, username: Option<&String>, password: Option<&String>) {
    let mut manager = manager::load_manager();

    // If username is not provided, prompt the user interactively
    let username = if let Some(u) = username {
        u.to_string()
    } else {
        Input::new()
            .with_prompt("Enter the username")
            .interact_text()
            .unwrap()
    };

    // If password is not provided, prompt the user to enter it securely
    let password = if let Some(p) = password {
        p.to_string()
    } else {
        Password::new()
            .with_prompt("Enter the password")
            .interact()
            .unwrap()
    };

    let encrypted_password = encryption::encrypt_password(&password, &username).unwrap();

    manager
        .entries
        .insert(service.to_string(), (username, encrypted_password));

    manager::save_manager(&manager);
    println!("{}", "Password entry added successfully.".green().bold());
}

fn get_password_entry(service: &str) {
    let manager = manager::load_manager();

    if let Some((username, encrypted_password)) = manager.entries.get(service) {
        println!("{}", "Enter your master password: ".blue().bold());
        let master_password = Password::new()
            .with_prompt("Master password")
            .interact()
            .unwrap();
        let master_password_base64 = get_master_password();
        if encryption::verify_master_password(&master_password_base64, &master_password) {
            match encryption::decrypt_password(encrypted_password, username) {
                Ok(password) => {
                    println!("Username: {}", username.green().bold());
                    println!("Password: {}", password.green().bold());
                }
                Err(e) => println!(
                    "{}",
                    format!("Error decrypting password: {}", e).red().bold()
                ),
            }
        } else {
            println!("{}", "Invalid master password.".red().bold());
        }
    } else {
        println!(
            "{}",
            format!("No entry found for service: {}", service)
                .red()
                .bold()
        );
    }
}

fn delete_password_entry(service: &str) {
    let mut manager = manager::load_manager();

    // Prompt for master password
    println!("{}", "Enter your master password to confirm deletion: ".blue().bold());
    let master_password = Password::new()
        .with_prompt("Master password")
        .interact()
        .unwrap();
    let master_password_base64 = get_master_password();

    // Verify the master password
    if encryption::verify_master_password(&master_password_base64, &master_password) {
        if manager.entries.remove(service).is_some() {
            // Save the updated manager
            manager::save_manager(&manager);
            println!("{}", format!("Service '{}' deleted successfully.", service).green().bold());
        } else {
            println!(
                "{}",
                format!("No entry found for service: {}", service)
                    .red()
                    .bold()
            );
        }
    } else {
        println!("{}", "Invalid master password.".red().bold());
    }
}

fn list_password_entries() {
    let manager = manager::load_manager();
    
    if manager.entries.is_empty() {
        println!("{}", "No entries found.".yellow().bold());
    } else {
        for (service, (username, _)) in &manager.entries {
            println!("Service: {}, Username: {}", service.green().bold(), username.blue().bold());
        }
    }
}

fn update_password_entry(service: &str, new_username: Option<&String>, new_password: Option<&String>) {
    let mut manager = manager::load_manager();

    // Check if the service exists
    if let Some((current_username, current_encrypted_password)) = manager.entries.get(service) {
        // Validate the master password
        println!("{}", "Enter your master password: ".blue().bold());
        let master_password = Password::new()
            .with_prompt("Master password")
            .interact()
            .unwrap();
        let master_password_base64 = get_master_password();
        if encryption::verify_master_password(&master_password_base64, &master_password) {
            
            // Decrypt the existing password using the current username
            let decrypted_password = match encryption::decrypt_password(current_encrypted_password, current_username) {
                Ok(password) => password,
                Err(e) => {
                    println!("{}", format!("Error decrypting password: {}", e).red().bold());
                    return;
                }
            };

            // Update the username if a new one is provided, otherwise keep the current one
            let updated_username = if let Some(new_username) = new_username {
                new_username.clone()
            } else {
                current_username.clone()
            };

            // Update the password if a new one is provided, otherwise keep the decrypted password
            let updated_password = if let Some(new_password) = new_password {
                new_password.clone()
            } else {
                decrypted_password.clone()
            };

            // Re-encrypt the password using the (possibly) updated username
            let encrypted_password = encryption::encrypt_password(&updated_password, &updated_username).unwrap();

            // Update the manager entry with the new values
            manager.entries.insert(service.to_string(), (updated_username.clone(), encrypted_password));

            // Save the updated manager
            manager::save_manager(&manager);

            println!(
                "{}",
                format!("Entry for service '{}' updated successfully.", service)
                    .green()
                    .bold()
            );
        } else {
            println!("{}", "Invalid master password.".red().bold());
        }
    } else {
        println!("{}", format!("No entry found for service: {}", service).red().bold());
    }
}