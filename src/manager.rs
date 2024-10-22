use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs::OpenOptions;
use std::io::{Read, Write};
use std::fs::create_dir_all;
use std::env;
use std::path::PathBuf;
use dirs;

#[derive(Serialize, Deserialize, Debug)]
pub struct PasswordManager {
    pub master_password: String,
    pub entries: HashMap<String, (String, String)>,
}

impl PasswordManager {
    pub fn new(master_password: String) -> Self {
        Self {
            master_password,
            entries: HashMap::new(),
        }
    }
}

pub fn save_manager(manager: &PasswordManager) {
    // Get the path for saving the password manager
    let password_path = get_password_path();
    
    // Create the directory if it doesn't exist
    if let Some(parent_dir) = password_path.parent() {
        create_dir_all(parent_dir).expect("Failed to create config directory");
    }

    // Serialize the PasswordManager instance
    let serialized = serde_json::to_string(manager).unwrap();
    
    // Open the file for writing
    let mut file = OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open(password_path)
        .expect("Failed to open password manager file");

    // Write the serialized data to the file
    file.write_all(serialized.as_bytes()).expect("Failed to write to password manager file");
}

pub fn load_manager() -> PasswordManager {
    let password_path = get_password_path();

    let mut file = OpenOptions::new()
        .read(true)
        .open(password_path)
        .unwrap_or_else(|_| {
            eprintln!("No password manager found. Run `passm init` first.");
            std::process::exit(1);
        });

    let mut content = String::new();
    file.read_to_string(&mut content).unwrap();
    serde_json::from_str(&content).expect("Failed to deserialize password manager")
}

pub fn get_master_password() -> String {
    let manager = load_manager();
    manager.master_password
}

pub fn get_password_path() -> PathBuf {
    // Check if the JSON_PATH environment variable is set
    if let Ok(custom_path) = env::var("JSON_PATH") {
        let path = PathBuf::from(custom_path);
        if !path.parent().unwrap().exists() {
            create_dir_all(path.parent().unwrap()).expect("Failed to create custom directory");
        }
        return path;
    }

    // Fallback to the default directory
    let home_dir = dirs::home_dir().expect("Failed to get home directory");
    let app_dir = home_dir.join(".config").join("passm");
    app_dir.join("passwords.json")
}