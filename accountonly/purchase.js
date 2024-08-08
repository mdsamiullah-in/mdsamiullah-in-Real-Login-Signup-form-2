function ledger() {
  var partyName = document.getElementById("partyName");
  partyName.oninput = function() {
    for (var i = 0; i < localStorage.length; i++) {
      var allKeys = localStorage.key(i);
      if (allKeys.match("ledger_Detail_" + partyName.value)) {
        var keyData = localStorage.getItem(allKeys);
        var mainData = JSON.parse(keyData);
        if (mainData.group.match("Purchase account")) {
          var hint = document.getElementById("hintBox");
          hint.style.display = "flex";
          hint.innerHTML = mainData.ledgerName + "<br>";
        }
      }
    }
  }
}

ledger();

document.getElementById("addItem").onclick = function() {
  var itemBox = document.getElementById("itemBox");
  var div = document.createElement("div");
  div.className = "inputDiv";
  div.innerHTML = `
      <input type="text" placeholder="Item" class="item">
      <input type="text" placeholder="qnt" class="qnt">
      <input type="text" placeholder="rate" value="1" class="rate">
      <input type="number" placeholder="sailing" class="sailingPrice">
      <input type="number" placeholder="1" class="amount" readonly>
      <i class="fa-solid fa-trash del"></i>
  `;
  itemBox.appendChild(div);

  // Event listener to calculate amount when qnt or rate changes
  var qntInput = div.querySelector('.qnt');
  var rateInput = div.querySelector('.rate');
  var amountInput = div.querySelector('.amount');

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
