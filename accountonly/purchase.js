function ledger() {
  var partyName = document.getElementById("partyName");
  var hint = document.getElementById("hintBox");

  partyName.oninput = function() {
      var inputValue = partyName.value.trim().toLowerCase(); // Trim and convert to lowercase

      if (inputValue === "") {
          hint.style.display = "none"; // Hide the hint box if the input is empty
          hint.innerHTML = ""; // Clear any previous hints
          return; // Exit the function early
      }

      hint.innerHTML = ""; // Clear previous hints
      hint.style.display = "none"; // Hide hintBox initially

      for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (key.match("ledger_Detail_")) {
              var keyData = localStorage.getItem(key);
              var mainData = JSON.parse(keyData);
              var ledgerName = mainData.ledgerName.toLowerCase(); // Convert ledgerName to lowercase

              // Check if the inputValue is found anywhere in ledgerName
              if (ledgerName.includes(inputValue) && mainData.group === "Purchase account") {
                  hint.style.display = "flex";

                  // Create a div for each result and add it to the hint box
                  var item = document.createElement("div");
                  item.innerHTML = mainData.ledgerName;
                  item.style.cursor = "pointer"; // Make it clear the item is clickable
                  hint.appendChild(item);

                  // Add an event listener to each item
                  item.addEventListener("click", function() {
                      partyName.value = this.innerHTML; // Set the input value to the clicked name
                      hint.style.display = "none"; // Hide the hint box after selection
                  });
              }
          }
      }
  }
}

ledger();





function addItem(){
  document.getElementById("addItem").onclick = function() {
    var itemBox = document.getElementById("itemBox");
    var div = document.createElement("div");
    div.className = "inputDiv";
    div.innerHTML = `
        <input type="text" placeholder="Item" class="item">
        <input type="text" placeholder="qnt" class="qnt">
        <input type="text" placeholder="1"  class="rate">
        <input type="number" placeholder="1" class="sailingPrice">
        <input type="number" placeholder="1" class="amount" readonly>
        <i class="fa-solid fa-trash del"></i>
    `;
    itemBox.appendChild(div);
  
    // Event listener to calculate amount when qnt or rate changes
    var qntInput = div.querySelector('.qnt');
    var rateInput = div.querySelector('.rate');
    var amountInput = div.querySelector('.amount');
    var sailingPrice = div.querySelector(".sailingPrice");
    sailingPrice.oninput = function(){
      var maxNum = Math.max(rateInput, sailingPrice);
      if(maxNum == sailingPrice){
       
      }else{
        alert("Sailing must be larger than rate price")
      }
    }
  
    function calculateAmount() {
      var qnt = parseFloat(qntInput.value) || 0;
      var rate = parseFloat(rateInput.value) || 0;
      amountInput.value = (qnt * rate).toFixed(2);
      updateSubtotal();
  
  
  
    }
  
    qntInput.addEventListener('input', calculateAmount);
    rateInput.addEventListener('input', calculateAmount);
  
    // Event listener to delete the current line
    var delIcon = div.querySelector('.del');
    delIcon.onclick = function() {
      div.remove();
      updateSubtotal();
    };
  };
}

addItem()







document.getElementById("taxNameInput").onchange = function() {
  if (this.value.indexOf("tax") != -1) {
    document.getElementById("taxNumberInput").oninput = function() {
      if (this.value.charAt(0).indexOf("%") == -1) {
      } else {
        alert("% not allowed at first place");
      }
    };
  } else {
    alert("Please enter tax word ");
    this.value = "";
  }
};

document.getElementById("done").onclick = function() {
  var taxNumber = document.getElementById("taxNumberInput").value;
  var taxName = document.getElementById("taxNameInput").value;

  var formData = {
    taxNumber: taxNumber,
    taxName: taxName
  };

  localStorage.setItem('formData', JSON.stringify(formData));

  document.getElementById("taxNumberInput").value = "";
  document.getElementById("taxNameInput").value = "";

  var extract = JSON.parse(localStorage.getItem("formData"));
  document.getElementById("taxName").innerText = extract.taxName + " (" + extract.taxNumber + "%)";

  updateSubtotal();
};

function updateSubtotal() {
  var amountInputs = document.querySelectorAll('.amount');
  var subtotal = 0;
  amountInputs.forEach(function(input) {
    subtotal += parseFloat(input.value) || 0;
  });

  document.getElementById('subtotal').innerText = " ₹ " + subtotal.toFixed(2);

  var formData = JSON.parse(localStorage.getItem("formData"));
  var total = subtotal;

  if (formData) {
    var taxRate = parseFloat(formData.taxNumber) || 0;
    var taxAmount = subtotal * (taxRate / 100);
    document.getElementById('tax').innerText = " ₹ " + taxAmount.toFixed(2);
    total = subtotal + taxAmount;
  }

  // Subtract paid amount
  var paidAmount = parseFloat(document.getElementById("paidAmount").value) || 0;
  total -= paidAmount;

  document.getElementById('total').innerText = " ₹ " + total.toFixed(2);
  document.getElementById('due').innerText = total.toFixed(2);
}

// Event listener to recalculate when the paid amount changes
document.getElementById("paidAmount").oninput = function() {
  updateSubtotal();
};

// Initialize the subtotal calculation
updateSubtotal();



function storeVoucher(){
   var i, storeItem = [], storeQty = [], storeRate = [], storeSp = [], storeAmount = [];

   var voucherNo = document.getElementById("voucherNum").innerHTML;
   var voucherDate = document.getElementById("date").innerHTML;
   var partyName = document.getElementById("partyName").value;

   var itemInput = document.getElementsByClassName("item");
   for(var i=0; i<itemInput.length; i++){
      storeItem[i] = itemInput[i].value
   }

   var qnt = document.getElementsByClassName("qnt");
   for(var i=0; i<qnt.length; i++){
    storeQty[i] = qnt[i].value
   }
    
  
   var rate = document.getElementsByClassName("rate");
   for(var i=0; i<rate.length; i++){
    storeRate[i] = rate[i].value;
   }


   var sailingPrice = document.getElementsByClassName("sailingPrice");
   for(var i=0; i<sailingPrice.length; i++){
       storeSp[i] = sailingPrice[i].value;
   }


   var amount = document.getElementsByClassName("amount");
   for(var i=0; i<amount.length; i++){
       storeAmount[i] = amount[i].value;
   }


   var subtotal = document.getElementById("subtotal").innerHTML;
   var tax = document.getElementById("tax").innerHTML;
   var total = document.getElementById("total").innerHTML;
   var paidAmount = document.getElementById("paidAmount").value;
   var due = document.getElementById("due").innerHTML;


   var purchaseDetail = {
       voucherNo: voucherNo,
       voucherDate: voucherDate,
       partyName: partyName,
       storeItem: storeItem,
       storeQty: storeQty,
       storeRate: storeRate,
       storeSp: storeSp,
       storeAmount: storeAmount,
       subtotal: subtotal,
       tax: tax,
       total: total,
       paidAmount: paidAmount,
       due: due
   }

   var purchaseData = JSON.stringify(purchaseDetail);
   localStorage.setItem("purchase_voucher_" + voucherNo, purchaseData);
   if(localStorage.getItem("purchase_voucher_"+voucherNo) != null ){
       alert("Purchased bill succeed")
       setTimeout(function(){
        alert("Purchased bill succeed").style.display = "none"
       },2000)
   }


  }



  function storeNow() {
    document.getElementById("store").onclick = function() {
        storeVoucher();
    }
}



function voucherNo() {
    var voucherNo = document.getElementById("voucherNum");
    var maxVoucherNo = 0;

    // Find the maximum voucher number stored in localStorage
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith("ledger_Detail_")) {
            var voucherNumber = Number(key.replace("ledger_Detail_", ""));
            if (voucherNumber > maxVoucherNo) {
                maxVoucherNo = voucherNumber;
            }
        }
    }

    voucherNo.innerHTML = maxVoucherNo + 1;
 }

 voucherNo();
 storeNow()



 function totalCal() {
  var credit = 0;

  for (var i = 0; i < localStorage.length; i++) {

      var allKeys = localStorage.key(i);
      if (allKeys.match("ledger_Detail_")) {
          var ledgerData = localStorage.getItem(allKeys);
          var ledger = JSON.parse(ledgerData);
          if (ledger.mode == "Dr") {
              credit += Number(ledger.balance);
              document.getElementById("PurchaseDr").innerHTML = credit + " Cr";
          }
      }
  }

}



totalCal();



var today = new Date();
var day = String(today.getDate()).padStart(2, '0');
var month = String(today.getMonth() + 1).padStart(2, '0'); 
var year = today.getFullYear();
var formattedDate = year + '-' + month + '-' + day;
document.getElementById('date').value = formattedDate;



function searchVoucher(){
  var searchPurchase = document.getElementById("searchPurchase");
  searchPurchase.onkeyup = function(event){
    if(event.keyCode == 13){
       if(this.value != ""){

        var voucher = localStorage.getItem("purchase_voucher_" + this.value);
        if(voucher != null){
          
              var data = JSON.parse(voucher);
              document.getElementById("voucherNum").innerHTML = data.voucherNo
              document.getElementById("partyName").value = data.partyName
              var i;
              for(i=0; i<data.storeItem.length; i++){
                    document.getElementById("addItem").click()
              }

              var itemInput = document.getElementsByClassName("item");
              for(i=0; i<itemInput.length; i++){
                itemInput[i].value = data.storeItem[i]
              }


              var qnt = document.getElementsByClassName("qnt");
              for(i=0; i<qnt.length; i++){
                qnt[i].value = data.storeQty[i]
              }

              document.getElementById("subtotal").innerHTML = data.subtotal;
              document.getElementById("tax").innerHTML = data.tax;
              document.getElementById("total").innerHTML = date.total;
              document.getElementById("paidAmount").value = data.paidAmount;
              document.getElementById("due").innerHTML = data.due;


              var rate = document.getElementsByClassName("rate");
              for(i=0; i<rate.length; i++){
                rate[i].value = storeRate[i]
              }


              var sailingPrice = document.getElementsByClassName("sailingPrice");
              for(i=0; i<sailingPrice.length; i++){
                sailingPrice[i].value = storeSp[i]
              }


              var amount = document.getElementsByClassName("amount");
              for(i=0; i<amount.length; i++){
                amount[i].value = storeAmount[i]
              }

              
  
                  

        }else{
          alert("Purchase not found")
        }
           
       }else{
        alert("Enter voucher no")
       }
    }
  }
  
}


searchVoucher()











