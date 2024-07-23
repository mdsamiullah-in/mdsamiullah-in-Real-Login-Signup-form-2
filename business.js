var company = document.getElementById("company");
company.onclick = function() {
    if (!localStorage.getItem("companyData")) {
        document.getElementById("boxesdiv").style.display = "none";
        document.getElementById("tag").style.display = "none";
        document.getElementById("head").style.display = "none";
        document.getElementById("formBox").style.display = "block";
    } else {

        location.replace("company.html")
       
    }
document.getElementById("cut").onclick = function() {
    document.getElementById("boxesdiv").style.display = "flex";
    document.getElementById("tag").style.display = "flex";
    document.getElementById("head").style.display = "flex";
    document.getElementById("formBox").style.display = "none";
}
}
function saveToLocalStorage() {
    // Gather all the values
    var companyName = document.getElementById("companyName").value;
    var mailingName = document.getElementById("mailingName").value;
    var address = document.getElementById("address").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var faxNumber = document.getElementById("FaxNumber").value;
    var email = document.getElementById("email").value;
    var website = document.getElementById("website").value;
    var fineYear = document.getElementById("FineYear").value;
    var bookBegin = document.getElementById("BookBegin").value;
    document.getElementById("companyTag").value = "Open Company"
    // Check if company data already exists
    if (localStorage.getItem("companyData")) {
        alert("Company already exists. You cannot create another one.");
        return;
    }

    // Create an object to store all the data
    var companyData = {
        companyName: companyName,
        mailingName: mailingName,
        address: address,
        phoneNumber: phoneNumber,
        faxNumber: faxNumber,
        email: email,
        website: website,
        fineYear: fineYear,
        bookBegin: bookBegin
    };

    // Convert the object to a JSON string
    var companyDataJson = JSON.stringify(companyData);

    // Save to localStorage
    localStorage.setItem("companyData", companyDataJson);

    alert("Company data saved successfully.");
}

document.getElementById("click").onclick = function() {
    document.getElementById("btnDiv").style.display = "block";
    document.getElementById("span").style.display = "block";
}



document.getElementById("Logout").onclick = function() {
    sessionStorage.clear();
    setTimeout(function() {
        location.replace("index.html");
    }, 2000);
}








    document.getElementById("create").onclick = function() {
        saveToLocalStorage();
        var companyName = document.getElementById("companyName");
        var mailingName = document.getElementById("mailingName");

        companyName.onchange = function() {
            if (isNaN(this.value)) {
                mailingName.onchange = function() {
                    if (this.value == companyName.value) {
                        this.value = "Enter different name to your company name";
                        this.style.color = "red";
                        this.style.borderColor = "red";
                        this.className = "animate__animated animate__pulse animate__infinite";
                        this.onclick = function() {
                            this.value = "";
                            this.style.color = "black";
                            this.style.border = "0.3px solid black";
                            this.className = "";
                        }
                    } else {
                        if (this.value.indexOf(companyName.value + ".pvt.ltd") != -1 || this.value.indexOf(companyName.value + ".govt.ltd") != -1) {
                            // Valid name format
                        } else {
                            this.value = "Enter company name.pvt.ltd or .govt.ltd";
                            this.style.color = "red";
                            this.style.borderColor = "red";
                            this.className = "animate__animated animate__pulse animate__infinite";
                            this.onclick = function() {
                                this.value = "";
                                this.style.color = "black";
                                this.style.border = "0.3px solid black";
                                this.className = "";
                            }
                        }
                    }
                }
            } else {
                this.value = "Number is not required";
                this.style.color = "red";
                this.style.borderColor = "red";
                this.className = "animate__animated animate__pulse animate__infinite";
                this.onclick = function() {
                    this.value = "";
                    this.style.border = "0.3px solid black";
                    this.style.color = "black";
                    this.className = "";
                }
            }
        }
    }


    var x = document.getElementById("x");
    x.onclick = function(){
        var loginBox = document.getElementById("loginBox");
        loginBox.style.display = "none"
    }


    function del() {
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
                // Delete the company data upon successful login
                localStorage.removeItem("companyData");
                function deleteMatchingLocalStorageItems(pattern) {
                    // Get all keys from localStorage
                    const keys = Object.keys(localStorage);
                
                    // Loop through the keys and remove items that match the pattern
                    keys.forEach(key => {
                        if (key.startsWith(pattern)) {
                            localStorage.removeItem(key);
                        }
                    });
                }
                
                // Call the function with your specific pattern
                deleteMatchingLocalStorageItems('buyer_Object_');
                
                alert("Company data deleted successfully upon login.");
                location.reload
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
    






document.addEventListener('DOMContentLoaded', function() {
    // Get the icon element and the corresponding file input
    var icon = document.querySelector('.boxes#company i');
    var fileInput = document.getElementById('logoUpload');

    // Add click event listener to the icon
    icon.addEventListener('click', function() {
        fileInput.click(); // Trigger click on the file input
    });

    // Handle file input change (when user selects a file)
    fileInput.addEventListener('change', function() {
        var file = fileInput.files[0]; // Get the selected file
        if (file) {
            // Example: Display the filename or handle further processing
            console.log('Selected file:', file.name);
            // You can also display the selected file name on the UI if needed
        }
    });
});







