use base64::{engine::general_purpose, Engine as _};
use chacha20poly1305::aead::generic_array::GenericArray;
use chacha20poly1305::aead::{Aead, AeadCore, KeyInit, OsRng};
use chacha20poly1305::ChaCha20Poly1305;
use ring::{digest, pbkdf2};
use std::num::NonZeroU32;
use ring::digest::{Digest, SHA256};
use std::env;

use crate::manager::get_master_password;

const CREDENTIAL_LEN: usize = digest::SHA256_OUTPUT_LEN;
const NONCE_SIZE: usize = 12;
const PBKDF2_ITERATIONS: u32 = 100_000;

fn get_hash_salt() -> Vec<u8> {
    let salt = env::var("HASH_SALT").unwrap_or_else(|_| "default_salt_value".to_string());
    salt.into_bytes()
}

// Hashing the password using PBKDF2 with a salt
pub fn hash_password(password: &str) -> String {
    let mut pbkdf2_hash = [0u8; CREDENTIAL_LEN];
    let hash_salt = get_hash_salt();
    pbkdf2::derive(
        pbkdf2::PBKDF2_HMAC_SHA256,
        NonZeroU32::new(PBKDF2_ITERATIONS).unwrap(),
        &hash_salt,
        password.as_bytes(),
        &mut pbkdf2_hash,
    );
    general_purpose::STANDARD_NO_PAD.encode(pbkdf2_hash)
}

// Verifying the hashed password with PBKDF2
pub fn verify_master_password(stored_hash: &str, input_password: &str) -> bool {
    let iterations = 100_000;
    let stored_hash = general_purpose::STANDARD_NO_PAD
        .decode(stored_hash)
        .unwrap();
    let hash_salt = get_hash_salt();
    pbkdf2::verify(
        pbkdf2::PBKDF2_HMAC_SHA256,
        NonZeroU32::new(iterations).unwrap(),
        &hash_salt,
        input_password.as_bytes(),
        &stored_hash,
    )
    .is_ok()
}

// Encrypting the password using ChaCha20Poly1305
pub fn encrypt_password(password: &str, username: &str) -> Result<String, Box<dyn std::error::Error>> {
    let salt = generate_salt(username);
    let master_password = get_master_password();
    let key = derive_key(&master_password, &salt);

    // Creating a new ChaCha20Poly1305 cipher
    let cipher = ChaCha20Poly1305::new(GenericArray::from_slice(&key));
    let nonce = ChaCha20Poly1305::generate_nonce(&mut OsRng); // Generate a random nonce

    // Encrypt the password
    let ciphertext = cipher
        .encrypt(&nonce, password.as_bytes())
        .map_err(|_| "encryption error")?;
    // Prepend the nonce to the ciphertext
    let mut result = nonce.to_vec();
    result.extend_from_slice(&ciphertext);

    Ok(general_purpose::STANDARD_NO_PAD.encode(result))
}

// Decrypting the password using ChaCha20Poly1305
pub fn decrypt_password(encrypted_data: &str, username: &str) -> Result<String, Box<dyn std::error::Error>> {
    let salt = generate_salt(username);
    let master_password = get_master_password();
    let key = derive_key(&master_password, &salt);

    // Decode the encrypted data (which contains both nonce and ciphertext)
    let encrypted_data = general_purpose::STANDARD_NO_PAD.decode(encrypted_data)?;

    // Split the encrypted data into nonce and ciphertext
    let (nonce, ciphertext) = encrypted_data.split_at(NONCE_SIZE);

    // Creating a ChaCha20Poly1305 cipher
    let cipher = ChaCha20Poly1305::new(GenericArray::from_slice(&key));
    let nonce = GenericArray::from_slice(nonce);

    // Decrypt the ciphertext
    let decrypted_text = cipher
        .decrypt(nonce, ciphertext)
        .map_err(|_| "decryption error")?;

    // Convert decrypted bytes to a UTF-8 string
    let decrypted_string =
        String::from_utf8(decrypted_text).map_err(|e| format!("utf-8 conversion error: {}", e))?;

    Ok(decrypted_string)
}

// Generate a random salt for encryption
fn generate_salt(username : &str) -> [u8; 16] {
    // Hash the username using SHA-256
    let hash: Digest = digest::digest(&SHA256, username.as_bytes());
    // Use the first 16 bytes of the hash as the salt
    let mut salt = [0u8; 16];
    salt.copy_from_slice(&hash.as_ref()[..16]); // Take the first 16 bytes
    salt
}

// Derive a key from the master password and a unique salt
fn derive_key(master_password: &str, salt: &[u8]) -> Vec<u8> {
    let mut key = vec![0u8; CREDENTIAL_LEN];
    pbkdf2::derive(
        pbkdf2::PBKDF2_HMAC_SHA256,
        NonZeroU32::new(PBKDF2_ITERATIONS).unwrap(),
        salt,
        master_password.as_bytes(),
        &mut key,
    );
    key
}