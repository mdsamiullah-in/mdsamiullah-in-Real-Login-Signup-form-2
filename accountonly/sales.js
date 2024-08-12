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
      item.onclick = function(){
        var div = document.createElement("div");
        div.className = "div";
        this.parentElement.style.position = "relative";
        this.parentElement.appendChild(div)
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




  


