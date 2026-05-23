const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
const loginBtn = document.getElementById("loginBtn");
const remember = document.getElementById("remember");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
    
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
    
        if (emailValue === "" || passwordValue === "") {
            showToast(
                "please fill in all fields",
                "#ef4444"
            );
            return; 
        }
    
        if (!validateEmail(emailValue)) {
            showToast(
                "please enter a valid email",
                "#f59e0b"
            );
            return;
        }
    
        if (passwordValue.length < 6) {
            showToast(
                "password must be at least 6 characters",
                "#f59e0b"
            );
            return;
        }
    
        if (remember.checked) {
            localStorage.setItem("saveEmail", emailValue);
        } else {
            localStorage.removeItem("saveEmail");
        }
    
        loginBtn.disabled = true;
        loginBtn.textContent = "loading...";
    
        fetch("https://login-auth-project-r3pm.onrender.com/login", {
            
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        })
    
        .then(function(response) {
            return response.json()
                .then(function(data){
                    return {
                        status: response.status,
                        data: data
                    };
                })
        })
    
        .then(function(result) {
            showToast(
                result.data.message,
                result.data.color || "#22c55e"
            );

            if (result.status === 200) {

                localStorage.setItem("loggedInUser", emailValue);
                
                setTimeout(function(){
                    window.location.href = "dashboard.html";
                }, 1000);
            }
        })
    
        .catch(function(error) {
            console.log("Error:", error);
            showToast(
                "Something went wrong.",
                "#ef4444"
            )
        })
    
        .finally(function() {
            loginBtn.disabled = false;
            loginBtn.textContent = "Login";
        });
    
    });
}

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if (emailValue === "" || passwordValue === "") {
            showToast(
                "please fill in all fields",
                "#ef4444"
            );
            return;
        }

        if (passwordValue.length < 6) {
            showToast(
                "password must be at least 6 characters",
                "#f59e0b"
            );
            return;
        }
    
        if (remember.checked) {
            localStorage.setItem("saveEmail", emailValue);
        } else {
            localStorage.removeItem("saveEmail");
        }

        loginBtn.disabled = true;
        loginBtn.textContent = "loading...";

        fetch("https://login-auth-project-r3pm.onrender.com/register", {
           
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        })

        .then(function(response) {
            return response.json();
        })

        .then(function(data) {
            showToast(
                data.message,
                data.color || "#22c55e"
            );
        })

        .catch(function(error) {
            console.log("Error:", error);
            showToast(
                "Something went wrong.",
                "#ef4444"
            );
        })

        .finally(function() {
            loginBtn.disabled = false;
            loginBtn.textContent = "Register";
        });

    });
}


function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function(){
    const type = password.getAttribute("type");

    if (type === "password") {
        password.setAttribute("type", "text");
        togglePassword.textContent = "🙈";
    } else {
        password.setAttribute("type", "password");
        togglePassword.textContent = "👁️";
    }
});

function showToast(text, color) {
    const toast = document.getElementById("toast");

    toast.textContent = text;
    toast.style.background = color;

    toast.classList.add("show");

    setTimeout(function(){
        toast.classList.remove("show");
    }, 3000);
}

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "🌙";
    }
});

const saveEmail = localStorage.getItem("saveEmail");

if (saveEmail) {
    email.value = saveEmail;
    remember.checked = true;
}

