

// function showing_date(){
//     var date = new Date();
//     var current_date = date.getDate();
//     var month = date.getFullYear();
//     document.getElementById("date").innerHTML += current_date+"-"+month+1+"-"+year
// }

// showing_date()







var get = document.getElementById("get");
get.onclick = function(){
    print()
}


var toggle = document.getElementById("toggle");

toggle.onclick = function(){
   var manageSection = document.getElementById("manage-section");
 
   if(manageSection.style.display === "block"){

        manageSection.style.display = "none"

   }else{
    manageSection.style.display = "block"
   }


 


}




var cut = document.getElementById("none");
cut.onclick = function(){
  
    document.getElementById("manage-section").style.display = "none";
    var inputs = document.getElementById("inputFields")
    var searchVoucher = document.getElementById("search-voucher");
    inputs.style.display = "none"
    searchVoucher.value = ""
    
    
    

  
}







document.getElementById("print").onclick = function(){
    print()
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
                div.id = "myDiv"
                div.innerHTML = `
                    
                <div id="inputForm">
                    <input type="text" placeholder="Item Description" class="itemName">
                    <input type="number" placeholder="0.0" class="price" oninput="calculateSubTotal()">
                    <input type="number" placeholder="1" class="qnt" oninput="calculateSubTotal()">
                    <input type="text" placeholder="Rs 0.00" class="amount" readonly>
                </div>
                `;
                billInputs.appendChild(div);


              var inputForm = document.getElementById("inputForm");
              var input = inputForm.getElementsByTagName("input");
              input[0].focus()


              input[0].onkeyup = function(event){
                    
                if(event.keyCode == 13){
               
                    input[1].focus()

                }

              }


              input[1].onkeyup = function(event){

              if(event.keyCode == 13){
                
               input[2].focus()

              }

              }



              input[2].onkeyup = function(event){
                 
                if(event.keyCode == 13){
                  
                    document.getElementById("plus").click()          

                }

              }





 
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
            
                document.getElementById('toatal').textContent =  subTotal.toFixed(2);
            }
            
            function validateInputs() {
                return true;
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



 var sales = document.getElementById("sales");
sales.onclick = function(){

    var i;

 var inputFields = document.getElementById("inputFields");
    inputFields.style.display = "inline"


    for(i=0; i<localStorage.length; i++){
        var allKeys = localStorage.key(i);
        if(allKeys.match("buyer_Object_")){

            var findNum = allKeys.split("_");
            allVoucherNo = findNum[2]
            document.getElementById("salesVoucher").innerHTML = "Voucher no : " + allVoucherNo++;


        }else if(allKeys.match("buyer_Object_") == null){
          document.getElementById("salesVoucher").innerHTML = allVoucherNo;
        }
    }



    var formBox = document.getElementById("formBox");
    var input = formBox.getElementsByTagName("input");
    input[0].focus();


    input[0].onkeyup = function(event){
       
       if(event.keyCode == 13){
           input[1].focus();
       }
    }


   input[1].onkeyup = function(event){
       
        if(event.keyCode == 13){
            input[2].focus()
        }

   } 


   input[2].onkeyup = function(event){
     
     if(event.keyCode == 13){
        input[3].focus();
     }

   }






   input[3].onkeyup = function(event){
     
    if(event.keyCode == 13){
      var iconPluse = document.getElementById("iconPluse");
      iconPluse.click()
    }

  }



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




document.getElementById("submit").onclick = function(){
    var i, storeItem = [], store_price = [], store_Qty = [], store_amount = [];
    var buyer_name = document.getElementById("name").value;
    var buyer_email = document.getElementById("email").value;
    var buyer_address = document.getElementById("address").value;
    var buyer_number = document.getElementById("phone").value

    
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
    localStorage.setItem('buyer_Object_'+ allVoucherNo, buyerObjectString);
    
}





var store_subtotal, store_total, store_paid, store_dues, store_tax, allVoucherNo = 1;
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




 document.getElementById("paid").oninput = function(){
    store_paid = this.value;
    var totalMoney = total;
    var finalMoney = totalMoney - this.value;
    store_dues = finalMoney.toFixed(2)
    document.getElementById('balanceDue').textContent = "Balance Due ____" + finalMoney.toFixed(2)
 }


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
    document.getAnimations("timeSpan").textContent = time
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

search_voucher()


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




//Search Voucher
function search_voucher(){
    
    var search_field = document.getElementById("search-voucher");

    search_field.onkeyup = function(event){
      
        if(event.keyCode == 13){
            var userInput = "buyer_Object_"+this.value;
           var i;
           for(i=0; i<localStorage.length; i++){
               var allKeys = localStorage.key(i)
               if(allKeys == userInput){
                var buyer_Object = localStorage.getItem(allKeys);
                var buyerObjectExtract = JSON.parse(buyer_Object)
                document.getElementById("sales").click();
                document.getElementById("salesVoucher").innerHTML = "Voucher no :"+ this.value;
                document.getElementById("savedName").textContent = buyerObjectExtract.buyer_name;
                document.getElementById("savedEmail").textContent = buyerObjectExtract.buyer_email;
                document.getElementById("savedAddress").textContent = buyerObjectExtract.buyer_address;
                document.getElementById("savedPhone").textContent = buyerObjectExtract.buyer_number;
                document.getElementById("toatal").textContent = "₹ "+ buyerObjectExtract.store_subtotal;
                document.getElementById("total").textContent = "₹ "+buyerObjectExtract.store_total;
                document.getElementById("taxBox").style.display = "none"
                document.getElementById("paidBox").style.display = "none";
                document.getElementById("balanceDue").style.display = "none"
                document.getElementById("buttonBox").style.display = "none"
                document.getElementById("formBox").style.display = "none"


                

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

    }

}

