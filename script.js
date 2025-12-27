// Initialize users array from JSON file or localStorage
let users = [];

// Load users from JSON file
async function loadUsersFromJSON() {
    try {
        const response = await fetch('users.json');
        if (response.ok) {
            const data = await response.json();
            users = data.users || [];
            // Save to localStorage as backup
            localStorage.setItem('users', JSON.stringify(data));
            return true;
        }
    } catch (error) {
        console.log('Could not load users.json, using localStorage or defaults');
    }
    return false;
}

// Load users from localStorage
function loadUsersFromStorage() {
    try {
        const stored = localStorage.getItem('users');
        if (stored) {
            const data = JSON.parse(stored);
            users = data.users || [];
            return true;
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
    return false;
}

// Save users to localStorage and update JSON file structure
function saveUsers() {
    const data = {
        users: users
    };
    localStorage.setItem('users', JSON.stringify(data));
    // Update JSON file structure (for display/download purposes)
    window.usersData = data;
}

// Language and Theme state
let currentLanguage = localStorage.getItem('language') || 'en';
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Update theme icon
function updateThemeIcon(isDark) {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.classList.remove('fa-moon', 'fa-sun');
        themeIcon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
    }
}

// Update language
function updateLanguage(lang) {
    currentLanguage = lang;
    
    // Update text elements (spans, labels, etc.)
    document.querySelectorAll('[data-en][data-mn]').forEach(element => {
        if (element.tagName !== 'INPUT' && element.tagName !== 'BUTTON') {
            const text = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-mn');
            if (text) {
                element.textContent = text;
            }
        }
    });

    // Update button texts
    document.querySelectorAll('button[data-en][data-mn]').forEach(button => {
        const text = lang === 'en' ? button.getAttribute('data-en') : button.getAttribute('data-mn');
        if (text) {
            button.textContent = text;
        }
    });

    // Update input placeholders
    document.querySelectorAll('input[data-placeholder-en][data-placeholder-mn]').forEach(input => {
        const placeholder = lang === 'en' 
            ? input.getAttribute('data-placeholder-en') 
            : input.getAttribute('data-placeholder-mn');
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });

    // Update labels
    document.querySelectorAll('label[data-en][data-mn]').forEach(label => {
        const text = lang === 'en' ? label.getAttribute('data-en') : label.getAttribute('data-mn');
        if (text) {
            label.textContent = text;
        }
    });

    // Update language toggle button text
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = lang === 'en' ? 'MN' : 'EN';
    }
}

// Get translated text
function getText(enText, mnText) {
    return currentLanguage === 'en' ? enText : mnText;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Try to load from JSON file first, then localStorage
    const loadedFromJSON = await loadUsersFromJSON();
    if (!loadedFromJSON) {
        loadUsersFromStorage();
    }

    // Initialize theme
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }

    // Initialize language
    updateLanguage(currentLanguage);

    // Language toggle
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'en' ? 'mn' : 'en';
            localStorage.setItem('language', currentLanguage);
            updateLanguage(currentLanguage);
        });
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            localStorage.setItem('darkMode', isDarkMode);
            document.body.classList.toggle('dark-mode', isDarkMode);
            updateThemeIcon(isDarkMode);
        });
    }

    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Social login buttons
    const googleBtn = document.getElementById('googleBtn');
    if (googleBtn) {
        googleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert(getText('Google login would be implemented here', 'Google нэвтрэлт энд хэрэгжүүлэх болно'));
        });
    }

    const facebookBtn = document.getElementById('facebookBtn');
    if (facebookBtn) {
        facebookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert(getText('Facebook login would be implemented here', 'Facebook нэвтрэлт энд хэрэгжүүлэх болно'));
        });
    }

    // Forgot password link
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert(getText('Forgot password functionality would be implemented here', 'Нууц үг сэргээх функц энд хэрэгжүүлэх болно'));
        });
    }

    // Toggle between login and register
    const showLoginBtn = document.getElementById('showLogin');
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLogin();
        });
    }

    const showLoginFromSignupBtn = document.getElementById('showLoginFromSignup');
    if (showLoginFromSignupBtn) {
        showLoginFromSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLogin();
        });
    }

    // Sign Up button handler
    const signUpBtn = document.getElementById('signUpBtn');
    if (signUpBtn) {
        signUpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showRegister();
        });
    }

    // Password toggle buttons
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            togglePasswordVisibility('password', togglePassword);
        });
    }

    const toggleRegPassword = document.getElementById('toggleRegPassword');
    if (toggleRegPassword) {
        toggleRegPassword.addEventListener('click', () => {
            togglePasswordVisibility('regPassword', toggleRegPassword);
        });
    }
});

// Toggle password visibility
function togglePasswordVisibility(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Show register form
function showRegister() {
    const loginWrapper = document.getElementById('loginWrapper');
    const registerBox = document.getElementById('registerBox');
    
    if (loginWrapper && registerBox) {
        loginWrapper.style.display = 'none';
        registerBox.style.display = 'block';
        clearMessages();
        window.scrollTo(0, 0);
    }
}

// Show login form
function showLogin() {
    const loginWrapper = document.getElementById('loginWrapper');
    const registerBox = document.getElementById('registerBox');
    
    if (loginWrapper && registerBox) {
        loginWrapper.style.display = 'block';
        registerBox.style.display = 'none';
        clearMessages();
        window.scrollTo(0, 0);
    }
}

// Clear all messages
function clearMessages() {
    const errorMsg = document.getElementById('errorMessage');
    const successMsg = document.getElementById('successMessage');
    const regErrorMsg = document.getElementById('regErrorMessage');
    const regSuccessMsg = document.getElementById('regSuccessMessage');
    
    if (errorMsg) errorMsg.textContent = '';
    if (successMsg) successMsg.textContent = '';
    if (regErrorMsg) regErrorMsg.textContent = '';
    if (regSuccessMsg) regSuccessMsg.textContent = '';
}

// Auto login after registration
function autoLogin(username, password) {
    // Switch to login form first
    showLogin();
    
    // Fill in the login form
    setTimeout(() => {
        // Try email first, then username
        const emailInput = document.getElementById('email');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        
        // Use email if available, otherwise username
        if (emailInput) {
            // For now, use username as email placeholder
            emailInput.value = username + '@example.com';
        } else if (usernameInput) {
            usernameInput.value = username;
        }
        if (passwordInput) passwordInput.value = password;
        
        // Trigger login - but we need to find user by username since we don't have email in registration
        setTimeout(() => {
            // Manually trigger login with username
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                const errorMsg = document.getElementById('errorMessage');
                const successMsg = document.getElementById('successMessage');
                if (successMsg) {
                    const welcomeMsg = getText('Login successful! Welcome back, ', 'Амжилттай нэвтэрлээ! Тавтай морил, ');
                    successMsg.textContent = welcomeMsg + (user.name || user.username) + '!';
                }
                if (errorMsg) errorMsg.textContent = '';
                setTimeout(() => {
                    const alertMsg = getText('Login successful! Welcome, ', 'Амжилттай нэвтэрлээ! Тавтай морил, ');
                    alert(alertMsg + (user.name || user.username) + '!');
                }, 500);
            }
        }, 300);
    }, 300);
}

// Handle login
function handleLogin(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    clearMessages();

    const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
    const username = document.getElementById('username') ? document.getElementById('username').value.trim() : '';
    const password = document.getElementById('password').value;

    const errorMsg = document.getElementById('errorMessage');
    const successMsg = document.getElementById('successMessage');

    // Use email if available, otherwise username
    const loginIdentifier = email || username;

    // Validate input
    if (!loginIdentifier || !password) {
        if (errorMsg) errorMsg.textContent = getText('Please fill in all fields', 'Бүх талбарыг бөглөнө үү');
        return;
    }

    // Check if user exists (support both email and username for backward compatibility)
    const user = users.find(u => 
        (u.email === loginIdentifier || u.username === loginIdentifier) && u.password === password
    );

    if (user) {
        if (successMsg) {
            const welcomeMsg = getText('Login successful! Welcome back, ', 'Амжилттай нэвтэрлээ! Тавтай морил, ');
            successMsg.textContent = welcomeMsg + (user.name || user.username) + '!';
        }
        if (errorMsg) errorMsg.textContent = '';
        
        // Clear form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) loginForm.reset();
        
        // Show success message
        setTimeout(() => {
            const alertMsg = getText('Login successful! Welcome, ', 'Амжилттай нэвтэрлээ! Тавтай морил, ');
            alert(alertMsg + (user.name || user.username) + '!');
        }, 500);
    } else {
        if (errorMsg) errorMsg.textContent = getText('Invalid email or password', 'Имэйл эсвэл нууц үг буруу байна');
        if (successMsg) successMsg.textContent = '';
    }
}

// Handle registration
function handleRegister(e) {
    e.preventDefault();
    clearMessages();

    const name = document.getElementById('regName').value.trim();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;

    const errorMsg = document.getElementById('regErrorMessage');
    const successMsg = document.getElementById('regSuccessMessage');

    // Validate input
    if (!name || !username || !password) {
        if (errorMsg) errorMsg.textContent = getText('Please fill in all fields', 'Бүх талбарыг бөглөнө үү');
        return;
    }

    // Check password length
    if (password.length < 8) {
        if (errorMsg) errorMsg.textContent = getText('Password must be at least 8 characters long', 'Нууц үг дор хаяж 8 тэмдэгт байх ёстой');
        return;
    }

    // Check if username already exists
    if (users.some(u => u.username === username)) {
        if (errorMsg) errorMsg.textContent = getText('Username already exists. Please choose another.', 'Энэ хэрэглэгчийн нэр аль хэдийн бүртгэгдсэн байна. Өөр нэр сонгоно уу.');
        return;
    }

    // Add new user
    const newUser = {
        id: Date.now().toString(),
        name: name,
        username: username,
        password: password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers();

    if (successMsg) successMsg.textContent = getText('Registration successful! Logging you in...', 'Амжилттай бүртгүүллээ! Нэвтэрч байна...');
    if (errorMsg) errorMsg.textContent = '';

    // Clear form
    document.getElementById('registerForm').reset();

    // Automatically log in the user after registration
    setTimeout(() => {
        autoLogin(username, password);
    }, 1500);
}
