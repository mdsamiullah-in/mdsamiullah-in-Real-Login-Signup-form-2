function signup() {
    var name = btoa(document.getElementById("name").value);
    var email = document.getElementById("email").value;
    var mobile = btoa(document.getElementById("mobile").value);
    var password = btoa(document.getElementById("password").value);

    // Simple email validation
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailPattern.test(email)) {
        document.getElementById("signup_error").innerHTML = "Invalid email";
        return false;
    }

    setTimeout(function(){
        if (!emailPattern.test(email)) {
            document.getElementById("signup_error").innerHTML = "";
            return false;
        }
    },2000)


    if (name !== "" && email !== "" && mobile !== "" && password !== "") {
        // Check if user already exists
        if (localStorage.getItem(email) !== null) {
            document.getElementById("user_found").innerHTML = "User Already Exists";
            return false; // Prevent form submission
        }

        // User does not exist, proceed with signup
        var user_input = { name: name, email: email, mobile: mobile, password: password };
        var user_data = JSON.stringify(user_input);
        localStorage.setItem(email, user_data);

        // Reset form fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("password").value = "";

        document.getElementById("signup_success").innerHTML = "Sign up Successful";

        setTimeout(function () {
            document.getElementById("signup_success").innerHTML = "";
        }, 2000);

        return false;
    } else {
        document.getElementById("signup_error").innerHTML = "All fields are required";
        return false;


    }

    
}

setTimeout(function(){
    document.getElementById("signup_error").innerHTML = "";
},2000)

function user_existed() {
    var email = document.getElementById("email").value;
    if (localStorage.getItem(email) !== null) {
        document.getElementById("user_found").innerHTML = "User Already Exists";
        document.getElementById("mobile").disabled = true;
        document.getElementById("password").disabled = true;
        document.getElementById("signup_submit").disabled = true;
        document.getElementById("email").style.backgroundColor = "black";
        document.getElementById("email").style.color = "white";
        document.getElementById("email").onclick = function () {
            this.value = "";
            this.style.background = "";
            this.style.color = "";
            document.getElementById("user_found").innerHTML = "";
            document.getElementById("mobile").disabled = false;
            document.getElementById("password").disabled = false;
            document.getElementById("signup_submit").disabled = false;
        };
    } else {
        document.getElementById("mobile").disabled = false;
        document.getElementById("password").disabled = false;
        document.getElementById("signup_submit").disabled = false;
    }
}

function login() {
    var username = document.getElementById("login-user").value;
    var password = btoa(document.getElementById("login-password").value);

    if (username === "" || password === "") {
        alert("Username and Password are required");
        return false;
    }

    var storedUser = localStorage.getItem(username);
    if (storedUser) {
        var userDetail = JSON.parse(storedUser);
        if (userDetail.password === password) {
            sessionStorage.setItem("user_mail", username);
            location.replace("profile.html");
            return false;
        } else {
            alert("Password Not Matched");
            return false;
        }
    } else {
        alert("User does not exist");
        return false;
    }
}






function validateSignupPassword() {
    var passwordInput = document.getElementById('password');
    var errorMessage = document.getElementById('validation');
    var password = passwordInput.value;

    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasNumbers = /\d/.test(password);
    var hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    var isLengthValid = password.length >= 8;

    if (!hasUpperCase) {
        errorMessage.innerHTML = 'Password must have uppercase.';
        errorMessage.style.color = "white";
    }
    else if (!hasLowerCase) {
        errorMessage.innerHTML = 'Password must have lowercase.';
        errorMessage.style.color = "white";
    }
    else if (!hasNumbers) {
        errorMessage.innerHTML = "Password must have number.";
        errorMessage.style.color = "white";
    }
    else if (!hasSpecialChars) {
        errorMessage.innerHTML = "Password must have symbols.";
        errorMessage.style.color = "white";
    }
    else if (isLengthValid) {
        errorMessage.innerHTML = "Password is strong.";
        errorMessage.style.color = "white";
    } else {
        errorMessage.innerHTML = 'Password must contain at least 8 characters.';
        errorMessage.style.color = "white";
    }

}


setTimeout(function(){
    errorMessage.innerHTML = '';
},2000)