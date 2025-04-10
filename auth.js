// auth.js - User Authentication Handling
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotPassword = document.getElementById('forgot-password');
    const nav = document.querySelector('nav ul');
    
    // Current user state
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Utility Functions
    const showAlert = (message, isSuccess = false) => {
        const alertBox = document.createElement('div');
        alertBox.className = `alert ${isSuccess ? 'alert-success' : 'alert-error'}`;
        alertBox.textContent = message;
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.classList.add('fade-out');
            setTimeout(() => alertBox.remove(), 300);
        }, 3000);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const hashPassword = (password) => {
        // In a real app, use a proper hashing library like bcrypt
        return btoa(unescape(encodeURIComponent(password)));
    };

    // Login Handler
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            const submitBtn = loginForm.querySelector('.form-submit');
            
            // Validation
            if (!email || !password) {
                showAlert('Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address');
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Logging in...';
            
            // Simulate API call delay
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(u => u.email === email && u.password === hashPassword(password));
                
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    showAlert('Login successful! Redirecting...', true);
                    
                    setTimeout(() => {
                        window.location.href = 'Holiday Leisure.html';
                    }, 1500);
                } else {
                    showAlert('Invalid email or password');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Login';
                }
            }, 1000);
        });
    }
    
    // Signup Handler
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm').value;
            const submitBtn = signupForm.querySelector('.form-submit');
            
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                showAlert('Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address');
                return;
            }
            
            if (!validatePassword(password)) {
                showAlert('Password must be at least 8 characters');
                return;
            }
            
            if (password !== confirmPassword) {
                showAlert('Passwords do not match');
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating account...';
            
            // Check if user exists and create new account
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                
                if (users.some(u => u.email === email)) {
                    showAlert('An account with this email already exists');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Sign Up';
                    return;
                }
                
                const newUser = {
                    id: Date.now().toString(),
                    name,
                    email,
                    password: hashPassword(password), // Never store plain text passwords
                    joined: new Date().toISOString()
                };
                
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(newUser));
                
                showAlert('Account created successfully! Redirecting...', true);
                
                setTimeout(() => {
                    window.location.href = 'Holiday Leisure.html';
                }, 1500);
            }, 1000);
        });
    }
    
    // Forgot Password Handler
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('Please enter your email address to receive a password reset link:');
            
            if (email && validateEmail(email)) {
                showAlert('If an account exists with this email, you will receive a reset link shortly.', true);
            } else if (email) {
                showAlert('Please enter a valid email address');
            }
        });
    }
    
    // Update UI based on authentication state
    if (currentUser && nav) {
        const loginLink = document.querySelector('nav a[href="login.html"]');
        const signupLink = document.querySelector('nav a[href="signup.html"]');
        
        if (loginLink && signupLink) {
            // Create user dropdown
            const userDropdown = document.createElement('div');
            userDropdown.className = 'user-dropdown';
            
            const userGreeting = document.createElement('span');
            userGreeting.textContent = `Hi, ${currentUser.name.split(' ')[0]}`;
            userGreeting.className = 'user-greeting';
            
            const dropdownMenu = document.createElement('div');
            dropdownMenu.className = 'dropdown-menu';
            dropdownMenu.innerHTML = `
                <a href="account.html">My Account</a>
                <a href="#" id="logout">Logout</a>
            `;
            
            userDropdown.appendChild(userGreeting);
            userDropdown.appendChild(dropdownMenu);
            
            // Replace login/signup with user dropdown
            const li = document.createElement('li');
            li.appendChild(userDropdown);
            nav.appendChild(li);
            
            loginLink.parentElement.remove();
            signupLink.parentElement.remove();
            
            // Logout handler
            document.getElementById('logout')?.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = 'Holiday Leisure.html';
            });
        }
    }
});
