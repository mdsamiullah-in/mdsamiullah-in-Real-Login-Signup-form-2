
document.getElementById("cutForm").onclick = function(){
   document.getElementById("formBox").style.display = "none"
}


var company = document.getElementById("business");
company.onclick = function() {
    if (!localStorage.getItem("companyData")) {
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

document.getElementById("create").onclick = function()
 {
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
}}

function showing_pic_name(){
    var names = document.getElementById("welcomeUserName");
    var user_mail = sessionStorage.getItem("user_mail");
    var user_details = localStorage.getItem(user_mail);
    var user_data = JSON.parse(user_details);
    var fullname = user_data.name;
    names.innerHTML = atob(fullname)

    var img = document.getElementById("img2");
    var image_name = localStorage.getItem(user_mail + "images");
    img.style.background = "url("+ image_name+")"
    img.style.backgroundRepeat = "no-repeat";
    img.style.backgroundSize = "cover";
    img.style.backgroundPosition = "center";
    img.style.objectFit = "cover";
}
showing_pic_name()

function logout(){
    sessionStorage.clear();
    document.getElementById("logoutMessage").style.display = "block";
    setTimeout(function(){
        location.replace("index.html");
    },2000)
}

