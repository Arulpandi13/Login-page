const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn'); // for registering
const loginBtn = document.querySelector('.login-btn');       // for logging in


registerBtn.addEventListener('click', () => {
    container.classList.add('active'); // show register form
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active'); // show login form
});

//Form valdiations
// Target the register form
const registerForm = document.querySelector('.form-box.register form');

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    fetch("https://login-backend-arul.onrender.com/register"
, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      })
      .then(res => res.text())
    //   .then(data => alert(data))
    //   .catch(err => alert("Error: " + err));
    

    // Check empty fields
    if (username === '' || email === '' || password === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Empty Fields',
            text: 'Please fill in all the fields!'
        });
        return;
    }

    // Basic email format check
    if (!email.includes('@') || !email.includes('.')) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address!'
        });
        return;
    }

    // password validation
    if (password.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Weak password',
            text: 'password must be at least 6 characters long!'
        });
        return;
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUppercase || !hasSpecialChar) {
        Swal.fire({
            icon: 'error',
            title: 'password Rule',
            text: 'password must have 1 capital letter and 1 special character!'
        });
        return;
    }

    // If everything is OK
    Swal.fire({
        icon: 'success',
        title: 'Registered!',
        text: `Welcome, ${username}!`
    });

    // Clear form after success (optional)
    registerForm.reset();
});


// Target the login form
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.form-box.login form');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Validation checks (optional)
    if (username === '' || password === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Fields',
        text: 'Please fill in all the fields!'
      });
      return;
    }

    // ✅ Fetch with GET + Query Params
  fetch("https://login-backend-arul.onrender.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ username, password })
})
      .then(data => {
        if (data === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Login Success!',
            text: `Welcome ${username}`
          }).then(() => {
            window.location.href = "dashboard.html"; // ✅ Next page
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

// End of script.js
// Add any additional JavaScript functionality here if needed

//login form api
