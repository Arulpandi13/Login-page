// ✅ Register fetch
fetch("https://login-backend-arul.onrender.com/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, email, password })
})
.then(res => {
    if (!res.ok) throw new Error("Registration failed");
    return res.json(); // ✅ Correct
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


//login form valdiation


// ✅ Login fetch


fetch("https://login-backend-arul.onrender.com/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
})
.then(res => res.json()) // ✅ Fix here
.then(data => {
    if (data.message === 'success') {
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
            text: data.message
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
