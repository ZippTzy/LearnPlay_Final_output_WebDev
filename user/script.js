
let users = JSON.parse(localStorage.getItem('users')) || [];
let loginAttempts = 0; // Counter for login attempts
const maxLoginAttempts = 3; // Maximum allowed login attempts

// Function to generate a random key for encryption
async function generateKey() {
    return await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true, // extractable
        ["encrypt", "decrypt"]
    );
}

// Function to encrypt a password
async function encryptPassword(password, key) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
    const encodedPassword = new TextEncoder().encode(password);
    
    const encryptedPassword = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encodedPassword
    );

    return { encryptedPassword: new Uint8Array(encryptedPassword), iv }; // Return both encrypted password and IV
}

// Function to decrypt a password
async function decryptPassword(encryptedPassword, iv, key) {
    const decryptedPassword = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        key,
        encryptedPassword
    );

    return new TextDecoder().decode(decryptedPassword);
}

// Function to handle registration
document.getElementById('registerButton').addEventListener('click', async function() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    // Check if username already exists
    const userExists = users.some(user => user.username === username);
    
    if (userExists) {
        alert('Username already exists. Please choose a different username.');
    } else {
        const key = await generateKey(); // Generate a new key for encryption
        const { encryptedPassword, iv } = await encryptPassword(password, key);
        
        // Store user in the array
        users.push({ username, password: Array.from(encryptedPassword), iv: Array.from(iv) });
        localStorage.setItem('users', JSON.stringify(users)); // Save to local storage
        alert('Registration successful!');
        document.getElementById('registerForm').reset(); // Reset the form
    }
});

// Function to handle login
document.getElementById('loginButton').addEventListener('click', async function() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Check if user exists
    const user = users.find(user => user.username === username);
    
    if (user) {
        // Decrypt the stored password
        const encryptedPassword = new Uint8Array(user.password);
        const iv = new Uint8Array(user.iv);
        const key = await generateKey(); // You need to use the same key for decryption

        try {
            const decryptedPassword = await decryptPassword(encryptedPassword, iv, key);
            if (decryptedPassword === password) {
                alert('Login successful! Welcome back!');
                // Reset login attempts on successful login
                loginAttempts = 0;
                // Redirect or perform further actions
            } else {
                loginAttempts++;
                alert('Invalid username or password. Please try again.');
            }
        } catch (error) {
            alert('Error during decryption. Please try again.');
        }
    } else {
        loginAttempts++;
        alert('Invalid username or password. Please try again.');
    }

    // Check if the maximum number of login attempts has been reached
    if (loginAttempts >= maxLoginAttempts) {
        alert('Maximum login attempts reached. Please try again later.');
        document.getElementById('loginButton').disabled = true; // Disable the login button
    }
});
