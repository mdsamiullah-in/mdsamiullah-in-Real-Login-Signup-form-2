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
  



document.getElementById("print").onclick = function(){
print()

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
                    return;
                }
                
                var billInputs = document.getElementById("billInputs");
                var div = document.createElement('div');
                div.classList.add('bill-input');
                div.id = "myDiv"
                div.innerHTML = `
                    
                <div id="inputForm">
                    <input type="text" placeholder="Item" class="itemName">
                    <input type="number" placeholder="0.0" class="price" oninput="calculateSubTotal()">
                    <input type="number" placeholder="1" class="qnt" oninput="calculateSubTotal()">
                    <input type="text" placeholder="Rs 0.00" class="amount" readonly>
                </div>
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
            
                document.getElementById('toatal').textContent =  subTotal.toFixed(2);
            }
            
            function validateInputs() {
                return true;
            }
            



//  var sales = document.getElementById("sales");
// sales.onclick = function(){

//    


    //  function voucher(){

    //     var i; 
    //     for(i=0; i<localStorage.length; i++){
    //         var allKeys = localStorage.key(i);
    //         if(allKeys.match("buyer_Object_")){
    
    //             var findNum = allKeys.split("_");
    //             allVoucherNo = findNum[2]
    //             document.getElementById("salesVoucher").innerHTML = "Voucher no : " + allVoucherNo++;
    
    
    //         }else if(allKeys.match("buyer_Object_") == null){
    //           document.getElementById("salesVoucher").innerHTML = allVoucherNo++;
    //         }
    //     }

    //  }
    //  voucher()




//     var formBox = document.getElementById("formBox");
//     var input = formBox.getElementsByTagName("input");
//     input[0].focus();


//     input[0].onkeyup = function(event){
       
//        if(event.keyCode == 13){
//            input[1].focus();
//        }
//     }


//    input[1].onkeyup = function(event){
       
//         if(event.keyCode == 13){
//             input[2].focus()
//         }

//    } 


//    input[2].onkeyup = function(event){
     
//      if(event.keyCode == 13){
//         input[3].focus();
//      }

//    }






//    input[3].onkeyup = function(event){
     
//     if(event.keyCode == 13){
//       var iconPluse = document.getElementById("iconPluse");
//       iconPluse.click()
//     }

//   }



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
    document.getElementById('balanceDue').textContent = "₹ " + finalMoney.toFixed(2)
 }


}


var i, storeItem = [], store_price = [], store_Qty = [], store_amount = [];

document.getElementById("Submit").onclick = function(){
   
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

search_voucher()




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







