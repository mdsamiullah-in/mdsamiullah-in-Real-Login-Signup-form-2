




class Accordion {
    constructor(el) {
      // Store the <details> element
      this.el = el;
      // Store the <summary> element
      this.summary = el.querySelector('summary');
      // Store the <div class="content"> element
      this.content = el.querySelector('.content');
  
      // Store the animation object (so we can cancel it if needed)
      this.animation = null;
      // Store if the element is closing
      this.isClosing = false;
      // Store if the element is expanding
      this.isExpanding = false;
      // Detect user clicks on the summary element
      this.summary.addEventListener('click', (e) => this.onClick(e));
    }
  
    onClick(e) {
      // Stop default behaviour from the browser
      e.preventDefault();
      // Add an overflow on the <details> to avoid content overflowing
      this.el.style.overflow = 'hidden';
      // Check if the element is being closed or is already closed
      if (this.isClosing || !this.el.open) {
        this.open();
      // Check if the element is being openned or is already open
      } else if (this.isExpanding || this.el.open) {
        this.shrink();
      }
    }
  
    shrink() {
      // Set the element as "being closed"
      this.isClosing = true;
      
      // Store the current height of the element
      const startHeight = `${this.el.offsetHeight}px`;
      // Calculate the height of the summary
      const endHeight = `${this.summary.offsetHeight}px`;
      
      // If there is already an animation running
      if (this.animation) {
        // Cancel the current animation
        this.animation.cancel();
      }
      
      // Start a WAAPI animation
      this.animation = this.el.animate({
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight]
      }, {
        duration: 400,
        easing: 'ease-out'
      });
      
      // When the animation is complete, call onAnimationFinish()
      this.animation.onfinish = () => this.onAnimationFinish(false);
      // If the animation is cancelled, isClosing variable is set to false
      this.animation.oncancel = () => this.isClosing = false;
    }
  
    open() {
      // Apply a fixed height on the element
      this.el.style.height = `${this.el.offsetHeight}px`;
      // Force the [open] attribute on the details element
      this.el.open = true;
      // Wait for the next frame to call the expand function
      window.requestAnimationFrame(() => this.expand());
    }
  
    expand() {
      // Set the element as "being expanding"
      this.isExpanding = true;
      // Get the current fixed height of the element
      const startHeight = `${this.el.offsetHeight}px`;
      // Calculate the open height of the element (summary height + content height)
      const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
      
      // If there is already an animation running
      if (this.animation) {
        // Cancel the current animation
        this.animation.cancel();
      }
      
      // Start a WAAPI animation
      this.animation = this.el.animate({
        // Set the keyframes from the startHeight to endHeight
        height: [startHeight, endHeight]
      }, {
        duration: 400,
        easing: 'ease-out'
      });
      // When the animation is complete, call onAnimationFinish()
      this.animation.onfinish = () => this.onAnimationFinish(true);
      // If the animation is cancelled, isExpanding variable is set to false
      this.animation.oncancel = () => this.isExpanding = false;
    }
  
    onAnimationFinish(open) {
      // Set the open attribute based on the parameter
      this.el.open = open;
      // Clear the stored animation
      this.animation = null;
      // Reset isClosing & isExpanding
      this.isClosing = false;
      this.isExpanding = false;
      // Remove the overflow hidden and the fixed height
      this.el.style.height = this.el.style.overflow = '';
    }
  }
  
  document.querySelectorAll('details').forEach((el) => {
    new Accordion(el);
  });
  



  function upload_pic() {
    var input = document.getElementById("uploadLogo");
    var fileReader = new FileReader();

    fileReader.readAsDataURL(input.files[0]);
    fileReader.onloadend = function(event) {
        var image_url = event.target.result;
        var show = document.getElementById("MainLogo");
        show.style.background = "url(" + image_url + ")";
        show.style.backgroundRepeat = "no-repeat";
        show.style.backgroundSize = "cover";
        show.style.backgroundPosition = "center";
        show.style.objectFit = "cover";
        localStorage.setItem(sessionStorage.getItem('user_mail') + "images", image_url);
        location.reload()
    };
}


function displayImage() {
    const userMail = sessionStorage.getItem('user_mail');
    const imageUrl = localStorage.getItem(userMail + "images");
    if (imageUrl) {
        document.getElementById('MainLogo').src = imageUrl;
    }
}

// Display image on page load if it exists in localStorage
document.addEventListener('DOMContentLoaded', function() {
    displayImage();
});


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
            localStorage.removeItem("companyData");
            localStorage.removeItem("allVoucherNo")
            function deleteMatchingLocalStorageItems(pattern) {
                const keys = Object.keys(localStorage);
            
                keys.forEach(key => {
                    if (key.startsWith(pattern)) {
                        localStorage.removeItem(key);
                    }
                });
            }
            

            deleteMatchingLocalStorageItems('buyer_Object_');
            
            alert("Company data deleted successfully upon login.");
            location.reload()
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





  document.getElementById("Logout").onclick = function() {
    sessionStorage.clear();
    setTimeout(function() {
        alert("Logout")
        location.replace("index.html");
    }, 2000);
}





     document.getElementById("bars").onclick = function(){
        document.getElementById("sidebar").className = "animate__animated animate__slideInLeft animate__faster"
        document.getElementById("sidebar").style.display = "flex"
     }


     document.getElementById("cutSidebar").onclick = function(){
          document.getElementById("sidebar").style.display = "none"
     }



     var taxName = document.getElementById("taxNameInput")
     var taxNumber = document.getElementById("taxNumberInput")
     localStorage.setItem(taxName, taxNumber)
     taxName.onchange = function(){
                 if(this.value.indexOf("tax") != -1){
                     
                     taxNumber.oninput = function(){
                         if(taxNumber.value.charAt(0).indexOf("%") == -1){
              
                         }else{
                             alert("% not allowed at first place")
                         }
                     }
     
     
                 }else{
                     alert("Please enter tax word ");
                     taxName.value = ""
                 }
     
     }         

     document.getElementById("plus").onclick = function() {
        if (!validateInputs()) {
            alert("Please fill in item description, price, and quantity fields before adding a new item.");
            return true;
        }
        
        var billInputs = document.getElementById("billInputs");
        var div = document.createElement('div');
        div.classList.add('bill-input');
        div.id = "myDiv"
        div.innerHTML = `
            
        <div id="inputForm">
        <p class="serialNum" id="num"></p>
            <input type="text" placeholder="Item" class="itemName">
            <input type="number" placeholder="0.0" class="price" oninput="calculateSubTotal()">
            <input type="number" placeholder="1" class="qnt" oninput="calculateSubTotal()">
           <input type="text" placeholder="Rs 0.00" class="amount" id="amountTotal" readonly>
           <i onclick="deleteInputFields(this)" id="cutInput" class="fa-solid fa-xmark cutInput"></i>
        </div>
        `;
        billInputs.appendChild(div);

        updateSerialNumbers();
        calculateSubTotal();

    };


    function updateSerialNumbers() {
        let serialNumbers = document.querySelectorAll('.serialNum');
        serialNumbers.forEach((serialNumber, index) => {
            serialNumber.textContent = index + 1;
        });
    }
    
    function deleteInputFields(element) {
        let inputForm = element.closest('.bill-input');
        inputForm.remove();
        updateSerialNumbers();
        calculateSubTotal();
    }


            
            function calculateSubTotal() {
                var items = document.getElementsByClassName('bill-input');
                var subTotal = 0;
                var i;

            
                for (i=0; i < items.length; i++) {
                    var price = parseFloat(items[i].querySelector('.price').value) || 0;
                    var quantity = parseFloat(items[i].querySelector('.qnt').value) || 1;
                    var amount = price * quantity;
                    items[i].querySelector('.amount').value = 'Rs ' + amount.toFixed(2);
                    subTotal += amount;
                }
            
                document.getElementById('toatal').textContent =  subTotal.toFixed(2);

                
                
            }



            
            function validateInputs() {
                return true;
            }
            

//  var sales = document.getElementById("sales");
// sales.onclick = function(){

//      function voucher(){
//         var i; 
//         for(i=0; i<localStorage.length; i++){
//             var allKeys = localStorage.key(i);
//             if(allKeys.match("buyer_Object_")){
    
//                 var findNum = allKeys.split("_");
//                 allVoucherNo = findNum[2]
//                 document.getElementById("voucher").innerHTML = "Voucher no : " + allVoucherNo++;
    
    
//             }else if(allKeys.match("buyer_Object_") == null){
//               document.getElementById("voucher").innerHTML = allVoucherNo++;
//             }
//         }

//      }
//      voucher()

//  }



// var showBill = document.getElementById("showBill");
// showBill.onclick = function(){
//     document.getElementById("manage-section").style.display = "flex"
// }


var taxName = document.getElementById("taxNameInput")
var taxNumber = document.getElementById("taxNumberInput")
localStorage.setItem(taxName, taxNumber)
taxName.onchange = function(){
            if(this.value.indexOf("tax") != -1){
                
                taxNumber.oninput = function(){
                    if(taxNumber.value.charAt(0).indexOf("%") == -1){
         
                    }else{
                        alert("% not allowed at first place")
                    }
                }


            }else{
                alert("Please enter tax word ");
                taxName.value = ""
            }

}         


// Save the taxNumber and taxName in localStorage on button click
document.getElementById("done").onclick = function() {
    var taxNumber = document.getElementById("taxNumberInput").value;
    var taxName = document.getElementById("taxNameInput").value;

    var formData = {
        taxNumber: taxNumber,
        taxName: taxName
    };

    localStorage.setItem('formData', JSON.stringify(formData));

    taxNumber = "";
    taxName = ""

    // Recalculate subtotal, tax, and total to reflect the new tax rate
    calculateSubTotal();
};

var store_subtotal, store_total, store_paid, store_dues, store_tax, allVoucherNo = 1;
function calculateSubTotal() {
    var items = document.getElementsByClassName('bill-input');
    var subTotal = 0;
    var i;


    // Calculate subTotal
    for (i=0; i < items.length; i++) {
        var price = parseFloat(items[i].querySelector('.price').value) || 0;
        var quantity = parseFloat(items[i].querySelector('.qnt').value) || 1;
        var amount = price * quantity;
        
        items[i].querySelector('.amount').value = 'Rs ' + amount.toFixed(2);
        subTotal += amount;


    }



    



    store_subtotal = subTotal.toFixed(2)
    document.getElementById('toatal').textContent = '₹ ' + subTotal.toFixed(2);

    // Retrieve the taxNumber from localStorage
    var savedFormData = JSON.parse(localStorage.getItem('formData'));
    var taxNumber = savedFormData ? parseFloat(savedFormData.taxNumber) : 0;
    
    // Calculate tax
    var tax = (subTotal * taxNumber) / 100;
    store_tax = tax.toFixed(2)
    document.getElementById('tax').textContent = '₹ ' + tax.toFixed(2);

    // Calculate total
    var total = subTotal + tax;
    store_total = total.toFixed(2);
    document.getElementById('total').textContent = '₹ ' + total.toFixed(2);



    store_paid = this.value;
 document.getElementById("paid").oninput = function(){
    var totalMoney = total;
    var finalMoney = totalMoney - this.value;
    store_dues = finalMoney.toFixed(2)
    document.getElementById('balanceDue').textContent = "₹ " + finalMoney.toFixed(2)
 }


}


companyDetail()










var i, storeItem = [], store_price = [], store_Qty = [], store_amount = [];
document.getElementById("Submit").onclick = function(){

   
    var buyer_name = document.getElementById("name").value;
    var buyer_email = document.getElementById("email").value;
    var buyer_address = document.getElementById("address").value;
    var buyer_number = document.getElementById("phone").value

    var paidInput = document.getElementById("paid").value;
    

    var item = document.getElementsByClassName("itemName");
    for(i=0; i<item.length; i++){
        storeItem[i] = item[i].value;
   } 
    var buyer_price = document.getElementsByClassName("price");
     for(i=0; i<buyer_price.length; i++){
        store_price[i] = buyer_price[i].value;
     }
    var buyer_qty = document.getElementsByClassName("qnt");
    for(i=0; i<buyer_qty.length; i++){
        store_Qty[i] = buyer_qty[i].value
    }
    var storeAmount = document.getElementsByClassName("amount");
    for(i=0; i<storeAmount.length; i++){
        store_amount[i] = storeAmount[i].value
    }
    
              
                                                                                                                                                                 
    var buyerObject = {
        buyer_name: buyer_name,
        buyer_email: buyer_email,
        buyer_address: buyer_address,
        buyer_number: buyer_number,
        storeItem: storeItem,
        store_price: store_price,
        store_Qty: store_Qty,
        store_amount: store_amount,
        store_subtotal: store_subtotal,
        store_total: store_total,
        store_paid: store_paid,
        store_dues: store_dues,
        store_tax: store_tax
    };


    var buyerObjectString = JSON.stringify(buyerObject);

    var allVoucherNo = localStorage.getItem('allVoucherNo');
    if (!allVoucherNo) {
      allVoucherNo = 1;
    } else {
        if(paidInput == ""){
            alert("please create input field")
        }else{
        
            allVoucherNo = parseInt(allVoucherNo) + 1;
            document.getElementById("voucher").textContent = allVoucherNo;
        }

    }
    
    localStorage.setItem('allVoucherNo', allVoucherNo);
    localStorage.setItem('buyer_Object_' + allVoucherNo, buyerObjectString);



    document.getElementById("savedName").textContent =  "Name : " + buyer_name;
    document.getElementById("savedEmail").textContent = "Email : " + buyer_email;
    document.getElementById("savedAddress").textContent = "Address : " + buyer_address;
    document.getElementById("savedPhone").textContent = "Mob. number : " + buyer_number;

}


function date(){
    var date = new Date();
    var day = date.getUTCDate();
    var month = date.getUTCMonth() + 1;
    var year = date.getUTCFullYear()
    var dates = day+"-"+ month+ "-"+ year
    document.getElementById("date").innerHTML = dates;
}
date()

function time(){
    var date = new Date();
    var time = date.toLocaleTimeString();
    document.getElementById("time").innerHTML = time
}


setInterval(function(){
    time()
},500)


// Function to create a new item input row

function createNewItem() {
    var itemContainer = document.getElementById('itemsContainer');
    var newItem = document.createElement('div');
    newItem.className = 'item bill-input';

    newItem.innerHTML = `
        <input type="text" placeholder="Item Description" class="itemName">
        <input type="number" placeholder="0.0" class="price" oninput="calculateSubTotal()">
        <input type="number" placeholder="1" class="qnt" oninput="calculateSubTotal()">
        <input type="text" placeholder="Rs 0.00" class="amount" readonly>
    `;
 itemContainer.appendChild(newItem);
   
}


document.getElementById("search").onclick = function(){

  var search_field = document.getElementById("search-voucher");
  



  var fill = document.getElementById("fillUser");
  fill.click()



          var userInput = "buyer_Object_"+ search_field.value;
         var i;
         for(i=0; i<localStorage.length; i++){
             var allKeys = localStorage.key(i)
             if(allKeys == userInput){
              var buyer_Object = localStorage.getItem(allKeys);
              var buyerObjectExtract = JSON.parse(buyer_Object)
              document.getElementById("voucher").innerHTML = "Voucher No : " + search_field.value;
              document.getElementById("name").value =  buyerObjectExtract.buyer_name;
              document.getElementById("email").value =  buyerObjectExtract.buyer_email;
              document.getElementById("address").value =  buyerObjectExtract.buyer_address;
              document.getElementById("phone").value =  buyerObjectExtract.buyer_number;
              document.getElementById("toatal").textContent = "₹ "+ buyerObjectExtract.store_subtotal;
              document.getElementById("total").textContent = "₹ "+buyerObjectExtract.store_total;
              document.getElementById("tax").textContent = "₹ " + buyerObjectExtract.store_tax;
              document.getElementById("paid").textContent = "₹ " + buyerObjectExtract.store_paid
              document.getElementById("plus").style.display = "none";
              document.getElementById("Submit").style.display = "none"

              function myFunction(x) {
                if (x.matches) { // If media query matches
                  document.getElementById("sidebar").style.display = "none"
                } else {
                 document.getElementById("sidebar").style.display = "flex"
                }
              }
              
              // Create a MediaQueryList object
              var x = window.matchMedia("(max-width: 767px)")
              
              // Call listener function at run time
              myFunction(x);
              
              // Attach listener function on state changes
              x.addEventListener("change", function() {
                myFunction(x);
              });
   
              var item = document.getElementsByClassName("itemName");
              item.disabled = false
              var price = document.getElementsByClassName("price");
              var qty = document.getElementsByClassName("qnt");
              var amount = document.getElementsByClassName("amount")


              var itemLength = buyerObjectExtract.storeItem.length;
              var j;
              for(j=0; j<itemLength; j++){
                  document.getElementById("plus").click()
                  item[j].value = buyerObjectExtract.storeItem[j]
                  item[j].disabled = true
                  price[j].value = buyerObjectExtract.store_price[j]
                  price[j].disabled = true
                  qty[j].value = buyerObjectExtract.store_Qty[j]
                  qty[j].disabled = true
                  amount[j].value = buyerObjectExtract.store_amount[j]
                  amount[j].disabled = true
              }

             }
         }

   
      

      }


      function companyDetail(){
             var company = "companyData";
             var i;
             for(i=0; i<localStorage.length; i++){
                var companyKeys = localStorage.key(i);
                if(companyKeys == company){
                    var companyData = localStorage.getItem(companyKeys)
                    var companyDataExtract = JSON.parse(companyData);
                   document.getElementById("companyName").textContent =  companyDataExtract.companyName;
                   document.getElementById("tag").textContent = "Address : " + companyDataExtract.address
                   document.getElementById("contactTag").textContent = "Contact Us : " + companyDataExtract.phoneNumber;
                }
             }
      }
    
    
      




// Add event listener to the "Add Item" button
document.getElementById('addItem').addEventListener('click', createNewItem);

// Initial call to setup the first item
createNewItem();

window.onload = function() {
    var savedFormData = JSON.parse(localStorage.getItem('formData'));
    var tax = document.getElementById("tax");
    if (savedFormData) {
        tax.innerText = savedFormData.taxNumber;
    }

};



var company = document.getElementById("company");
company.onclick = function() {
    if (!localStorage.getItem("companyData")) {
        document.getElementById("boxesdiv").style.display = "none";
        document.getElementById("tag").style.display = "none";
        document.getElementById("head").style.display = "none";
        document.getElementById("formBox").style.display = "block";
    } else {

        location.href("company.html")
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







