const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

// ✅ Register Form
const registerForm = document.querySelector('.form-box.register form');

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // ✅ Do validation BEFORE fetch
    if (username === '' || email === '' || password === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Empty Fields',
            text: 'Please fill in all the fields!'
        });
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address!'
        });
        return;
    }

    if (password.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Weak password',
            text: 'Password must be at least 6 characters long!'
        });
        return;
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUppercase || !hasSpecialChar) {
        Swal.fire({
            icon: 'error',
            title: 'Password Rule',
            text: 'Password must have 1 capital letter and 1 special character!'
        });
        return;
    }

    // ✅ All validations passed
    fetch("https://login-backend-arul.onrender.com/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    })
        .then(res => {
            if (!res.ok) throw new Error("Registration failed");
            return res.json(); // or res.text()
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Registered!',
                text: `Welcome, ${username}!`
            });
            registerForm.reset();
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message
            });
        });
});


// ✅ Login Form
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.form-box.login form');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (username === '' || password === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Empty Fields',
                text: 'Please fill in all the fields!'
            });
            return;
        }

        fetch("https://login-backend-arul.onrender.com/login", {
            method: "POST", // now using POST correctly
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => {
                if (!res.ok) throw new Error("Invalid credentials");
                return res.text(); // change this if your server returns JSON
            })
            .then(data => {
                if (data === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Success!',
                        text: `Welcome ${username}`
                    }).then(() => {
                        window.location.href = "dashboard.html";
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: data
                    });
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: err.message
                });
            });

        loginForm.reset();
    });
});
