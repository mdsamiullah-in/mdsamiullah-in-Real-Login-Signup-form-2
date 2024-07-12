

// function showing_date(){
//     var date = new Date();
//     var current_date = date.getDate();
//     var month = date.getFullYear();
//     document.getElementById("date").innerHTML += current_date+"-"+month+1+"-"+year
// }

// showing_date()





var plus = document.getElementById("plus");
plus.onclick = function(){
  var input = document.createElement("input");
  var div = document.createElement("div");
 

  div.innerHTML = 
  `
     
  `
}           

var unit = document.getElementById("unit");
unit.onclick = function(){
    document.getElementById("myForm").style.display = "flex"
}


document.getElementById("cut").onclick = function(){
        document.getElementById("myForm").style.display = "none"
}


      // Get form and input elements
      const form = document.getElementById('myForm');
      const symbolInput = document.getElementById('symbolInput');
      const nameInput = document.getElementById('nameInput');
  
      // Event listener for form submission
      form.addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent default form submission
  
          // Get input values
          const symbol = symbolInput.value.trim();
          const name = nameInput.value.trim();
  
          // Check if symbol and name are not empty
          if (symbol !== '' && name !== '') {
              // Get existing data from localStorage or initialize empty array
              const dataArray = JSON.parse(localStorage.getItem('dataArray')) || [];
  
              // Add new data to array
              dataArray.push({ symbol, name });
  
              // Save updated array to localStorage
              localStorage.setItem('dataArray', JSON.stringify(dataArray));
  
              // Optionally, reset the form
              form.reset();
  
              // Optionally, provide feedback or update UI
              console.log('Data saved to localStorage:', dataArray);
          } else {
              alert('Please fill out both fields.');
          }
      });




              // Save data to local storage
              document.getElementById('submit').addEventListener('click', function() {
                var userInfo = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    address: document.getElementById('address').value,
                    phone: document.getElementById('phone').value
                };
    
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
                alert('Data saved to local storage!');
                updateHeaderInfo();
            });

            // Retrieve data from local storage and update header info
            function updateHeaderInfo() {
                var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
                if (userInfo) {
                    document.getElementById('savedName').textContent = 'Name: ' + userInfo.name;
                    document.getElementById('savedEmail').textContent = 'Email: ' + userInfo.email;
                    document.getElementById('savedAddress').textContent = 'Address: ' + userInfo.address;
                    document.getElementById('savedPhone').textContent = 'Phone: ' + userInfo.phone;
                }
            }
    
            // Update header info on page load
            window.onload = function() {
                updateHeaderInfo();
            };
    


            function validateInputs() {
                var billInputs = document.querySelectorAll('.bill-input');
                for (var i = 0; i < billInputs.length; i++) {
                    var itemName = billInputs[i].querySelector('.itemName');
                    var priceInput = billInputs[i].querySelector('.price');
                    var qntInput = billInputs[i].querySelector('.qnt');
                    if (!itemName.value || !priceInput.value || !qntInput.value) {
                        return false;
                    }
                }
                return true;
            }
    
           

            document.getElementById("plus").onclick = function() {
                if (!validateInputs()) {
                    alert("Please fill in item description, price, and quantity fields before adding a new item.");
                    return;
                }
                
                var billInputs = document.getElementById("billInputs");
                var div = document.createElement('div');
                div.classList.add('bill-input');
                div.innerHTML = `
                    <input type="text" placeholder="Item Description" class="itemName">
                    <input type="number" placeholder="0.0" class="price" oninput="calculateSubTotal()">
                    <input type="number" placeholder="1" class="qnt" oninput="calculateSubTotal()">
                    <input type="text" placeholder="Rs 0.00" class="amount" readonly>
                `;
                billInputs.appendChild(div);
            };
            
            function calculateSubTotal() {
                var items = document.getElementsByClassName('bill-input');
                var subTotal = 0;
            
                for (var i = 0; i < items.length; i++) {
                    var price = parseFloat(items[i].querySelector('.price').value) || 0;
                    var quantity = parseFloat(items[i].querySelector('.qnt').value) || 1;
                    var amount = price * quantity;
                    
                    items[i].querySelector('.amount').value = 'Rs ' + amount.toFixed(2);
                    subTotal += amount;
                }
            
                document.getElementById('subTotal').textContent = 'Subtotal ' + subTotal.toFixed(2);
            }
            
            function validateInputs() {
                // Implement your validation logic here if needed
                return true; // For now, assuming all inputs are valid
            }
            


 var sales = document.getElementById("sales");
sales.onclick = function(){
 var inputFields = document.getElementById("inputFields");
 inputFields.style.display = "flex"
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
 document.getElementById("taxFormCut").onclick = function(){
        document.getElementById("TaxForm").style.display = "none"
}
document.getElementById("TaxSetup").onclick = function(){
    document.getElementById("TaxForm").style.display = "flex"
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
    document.getElementById("TaxForm").style.display = "none";

    // Recalculate subtotal, tax, and total to reflect the new tax rate
    calculateSubTotal();
};

function calculateSubTotal() {
    var items = document.getElementsByClassName('bill-input');
    var subTotal = 0;

    // Calculate subTotal
    for (var i = 0; i < items.length; i++) {
        var price = parseFloat(items[i].querySelector('.price').value) || 0;
        var quantity = parseFloat(items[i].querySelector('.qnt').value) || 1;
        var amount = price * quantity;
        
        items[i].querySelector('.amount').value = 'Rs ' + amount.toFixed(2);
        subTotal += amount;
    }

    document.getElementById('subTotal').textContent = 'Subtotal: Rs ' + subTotal.toFixed(2);

    // Retrieve the taxNumber from localStorage
    var savedFormData = JSON.parse(localStorage.getItem('formData'));
    var taxNumber = savedFormData ? parseFloat(savedFormData.taxNumber) : 0;

    // Calculate tax
    var tax = (subTotal * taxNumber) / 100;
    document.getElementById('tax').textContent = 'Tax (' + taxNumber.toFixed(2) + '%): Rs ' + tax.toFixed(2);

    // Calculate total
    var total = subTotal + tax;
    document.getElementById('total').textContent = 'Total: Rs ' + total.toFixed(2);
}

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

// Add event listener to the "Add Item" button
document.getElementById('addItem').addEventListener('click', createNewItem);

// Initial call to setup the first item
createNewItem();


function calculateSubTotal() {
    var items = document.getElementsByClassName('bill-input');
    var subTotal = 0;

    // Calculate subTotal
    for (var i = 0; i < items.length; i++) {
        var price = parseFloat(items[i].querySelector('.price').value) || 0;
        var quantity = parseFloat(items[i].querySelector('.qnt').value) || 1;
        var amount = price * quantity;
        
        items[i].querySelector('.amount').value = 'Rs ' + amount.toFixed(2);
        subTotal += amount;
    }

    document.getElementById('subTotal').textContent = 'Subtotal: Rs ' + subTotal.toFixed(2);

    // Retrieve the taxNumber from localStorage
    var savedFormData = JSON.parse(localStorage.getItem('formData'));
    var taxNumber = savedFormData ? parseFloat(savedFormData.taxNumber) : 0;

    // Calculate tax
    var tax = (subTotal * taxNumber) / 100;
    document.getElementById('tax').textContent = 'Tax (' + taxNumber + '%): Rs ' + tax.toFixed(2);

    // Calculate total
    var total = subTotal + tax;
    document.getElementById('total').textContent = 'Total: Rs ' + total.toFixed(2);
}

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

// Add event listener to the "Add Item" button
document.getElementById('addItem').addEventListener('click', createNewItem);

// Initial call to setup the first item
createNewItem();


function calculateSubTotal() {
    var items = document.getElementsByClassName('bill-input');
    var subTotal = 0;

    // Calculate subTotal
    for (var i = 0; i < items.length; i++) {
        var price = parseFloat(items[i].querySelector('.price').value) || 0;
        var quantity = parseFloat(items[i].querySelector('.qnt').value) || 1;
        var amount = price * quantity;
        
        items[i].querySelector('.amount').value = 'Rs ' + amount.toFixed(2);
        subTotal += amount;
    }

    document.getElementById('subTotal').textContent = 'Subtotal: Rs ' + subTotal.toFixed(2);

    // Retrieve the taxNumber from localStorage
    var savedFormData = JSON.parse(localStorage.getItem('formData'));
    var taxNumber = savedFormData ? parseFloat(savedFormData.taxNumber) : 0;
    
    // Calculate tax
    var tax = (subTotal * taxNumber) / 100;
    document.getElementById('tax').textContent = 'Tax: Rs ' + tax.toFixed(2);

    // Calculate total
    var total = subTotal + tax;
    document.getElementById('total').textContent = 'Total: Rs ' + total.toFixed(2);
}

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







