function addItem(){
    document.getElementById("addSaleItem").onclick = function() {
      var itemBox = document.getElementById("saleitemBox");
      var div = document.createElement("div");
      div.className = "inputDiv";
      div.innerHTML = `
          <input type="text" placeholder="Item" class="saleItem">
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
      var item = div.querySelector(".saleItem");
     
     
      item.onclick = function() {
        this.oninput = function() {
            var existingDiv = this.parentElement.querySelector('.div');
            if (existingDiv) {
                existingDiv.remove();
            }
    
            var div = document.createElement("div");
            div.className = "div";
            this.parentElement.style.position = "relative";
            this.parentElement.appendChild(div);

            div.style.display = "block"
    
            for (var i = 0; i < localStorage.length; i++) {
                var allKeys = localStorage.key(i);
                if (allKeys.match("purchase_voucher")) {
                    var keyData = localStorage.getItem(allKeys);
                    var data = JSON.parse(keyData);
                    for (var j = 0; j < data.storeItem.length; j++) {
                        if (data.storeItem[j].toUpperCase().indexOf(this.value.toUpperCase()) != -1) {
                            var p = document.createElement("p");
                            p.append(document.createTextNode(data.storeItem[j]));
                            div.appendChild(p);
                            p.onclick = function(){
                              item.value = this.innerHTML 
                              div.style.display = "none"
                            }

                            
                        }
                    }
                }
            }
        };
    };
    

    
    
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




  


  function ledger() {
    var partyName = document.getElementById("salesPartyName");
    var hint = document.getElementById("hintsBox");
  
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