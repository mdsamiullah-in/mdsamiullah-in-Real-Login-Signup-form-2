

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
                    <input type="number" placeholder="0.0" class="price">
                    <input type="number" placeholder="1" class="qnt">
                    <input type="text" placeholder="Rs 0.00" class="amount" readonly>
                    <p class="percent">2%</p>
                `;
                billInputs.appendChild(div);
            
                var priceInput = div.querySelector('.price');
                var qntInput = div.querySelector('.qnt');
                var amountInput = div.querySelector('.amount');
            
                function calculateAmount() {
                    var price = parseFloat(priceInput.value) || 0;
                    var quantity = parseFloat(qntInput.value) || 0;
                    var amount = price * quantity;
                    var totalAmount = amount + (amount * 0.02);
                    amountInput.value = `Rs ${totalAmount.toFixed(2)}`;
            
                    updateSubtotal(); // Call function to update subtotal
                }
            
                priceInput.addEventListener('input', calculateAmount);
                qntInput.addEventListener('input', calculateAmount);
            
                // Function to update subtotal
                function updateSubtotal() {
                    var subTotalElement = document.getElementById("subTotal");
                    var amounts = document.querySelectorAll('.amount');
                    var subtotal = 0;
                 
            
                    amounts.forEach(function(item) {
                        var value = parseFloat(item.value.replace('Rs ', '')) || 0;
                        subtotal += value;


                        var total = document.getElementById("total")
                        total.innerHTML =  "Total " + JSON.stringify(subtotal += value);

       
                    });
            
                    subTotalElement.textContent = `Subtotal ${subtotal.toFixed(2)}`;
                }
            
                updateSubtotal(); // Update subtotal initially


            };
            


            var sales = document.getElementById("sales");
            sales.onclick = function(){
                var inputFields = document.getElementById("inputFields");
                inputFields.style.display = "flex"
            }


     document.getElementById("done").onclick = function(){
        
    var taxName = document.getElementById("taxNameInput").value;
    var taxNumber = document.getElementById("taxNumberInput").value;
         localStorage.setItem(taxName, taxNumber)
        
         if(taxName || taxNumber == ""){
            alert("Please fill the fields")
         }else{
            alert("Success")
         }
     }
            