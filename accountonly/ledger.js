function create() {
    document.getElementById("createLedger").addEventListener("click", function () {
        var group = document.getElementById("group");

        if (group.value !== "Select group") {
            var ledgerNo = document.getElementById("ledger-no").innerText;
            var ledgerName = document.getElementById("ledgerName").value;
            var balance = document.getElementById("balanceInput").value;
            var mode = document.getElementById("mode").value;
            var mailingName = document.getElementById("MailingName").value;
            var textMessage = document.getElementById("textMessage").value;

            if (group.value === "Purchase account" || group.value === "Sundry debitors") {
                mode = "Dr";
            } else {
                mode = "Cr";
            }

            var ledgerDetail = {
                ledgerName: ledgerName,
                balance: balance,
                mode: mode,
                group: group.value,
                mailingName: mailingName,
                textMessage: textMessage
            };

            var ledgerExtract = JSON.stringify(ledgerDetail);
            localStorage.setItem("ledger_Detail_" + ledgerNo, ledgerExtract);

            // Update ledger number for next entry
            document.getElementById("ledger-no").innerText = Number(ledgerNo) + 1;

        } else {
            alert("Please select a group");
        }
    });
}

function ledger_no() {
    var maxNo = 0;
    for (var i = 0; i < localStorage.length; i++) {
        var allKeys = localStorage.key(i);
        if (allKeys.startsWith("ledger_Detail_")) {
            var no = allKeys.split("_")[2];
            if (Number(no) > maxNo) {
                maxNo = Number(no);
            }
        }
    }
    document.getElementById("ledger-no").innerText = maxNo + 1;
}

ledger_no();

function totalCal() {
    var credit = 0, debit = 0;

    for (var i = 0; i < localStorage.length; i++) {

        var allKeys = localStorage.key(i);
        if (allKeys.match("ledger_Detail_")) {
            var ledgerData = localStorage.getItem(allKeys);
            var ledger = JSON.parse(ledgerData);
            if (ledger.mode == "Cr") {
                credit += Number(ledger.balance);
                document.getElementById("credit").innerHTML = credit + " Cr";
            } else {
            debit += Number(ledger.balance);
                document.getElementById("debit").innerHTML = debit + " Dr";
            }

        }
    }

    if (credit < debit) {
        document.getElementById("dif").innerHTML =  debit - credit + " Cr";
    } else {
        document.getElementById("dif").innerHTML = credit - debit + " Cr";
    }
}



totalCal();

function edit_ledger() {

    var ledger_no = document.getElementById("edit-ledger");
    ledger_no.onkeyup = function(event) {
        if (event.keyCode === 13) {
            if (this.value === "") {
                return false;
            } else {
                if (localStorage.getItem("ledger_Detail_" + this.value) != null) {
                    var ledgerData = localStorage.getItem("ledger_Detail_" + this.value);
                    var ledger = JSON.parse(ledgerData);

                    document.getElementById("editNo").innerHTML = "Ledger no: " + "<span id='ledgerNumber'>" + this.value + "</span>";
                    document.getElementById("editName").innerHTML = "Ledger Name: " + "<span contenteditable id='ledgerGroup'>" + ledger.ledgerName + "</span>";
                    document.getElementById("editGroup").innerHTML = "Group Name: " + "<span id='currentGroup'>" + ledger.group + "</span>";
                    document.getElementById("groups").style.display = "block";
                    document.getElementById("edit-balance").innerHTML = "Balance: " + "<span contenteditable id='currentBalance'>" + ledger.balance +  "</span>";
                    document.getElementById("editMailname").innerHTML = "Mail Name: " + "<span contenteditable id='currentMail'>" + ledger.mailingName + "</span>";
                    document.getElementById("editAddress").innerHTML = "Address: " + "<span contenteditable id='currentMessage'>" + ledger.textMessage + "</span>";

                    document.getElementById("groups").onchange = function() {
                        var group = document.getElementById("groups");
                        if (group.value === "Purchase account" || group.value === "Sundry debitors") {
                            mode = "Dr";
                        } else {
                            mode = "Cr";
                        }

                        var currentGroup = document.getElementById("currentGroup");
                        currentGroup.innerHTML = group.value;
                    };

                    document.getElementById("saveEdit").onclick = function() {
                        var saveData = { 
                            ledgerName: document.getElementById("ledgerGroup").innerHTML,
                            group: document.getElementById("currentGroup").innerHTML,
                            balance: document.getElementById("currentBalance").innerHTML,
                            mailingName: document.getElementById("currentMail").innerHTML,
                            textMessage: document.getElementById("currentMessage").innerHTML
                        };

                        var finalData = JSON.stringify(saveData);
                        var ledger_no = document.getElementById("edit-ledger").value;
                        localStorage.setItem("ledger_Detail_" + ledger_no, finalData);
                    };

                } else {
                    alert("Ledger not found");
                }
            }
        }
    };
}

edit_ledger();



function search(){
    var ledger_no = document.getElementById("search-ledger");
    ledger_no.onkeyup = function(event) {
        if (event.keyCode === 13) {
            if (this.value === "") {
                return false;
            } else {
                if (localStorage.getItem("ledger_Detail_" + this.value) != null) {
                    var ledgerData = localStorage.getItem("ledger_Detail_" + this.value);
                    var ledger = JSON.parse(ledgerData);

                    document.getElementById("searchNo").innerHTML =  this.value ;
                    document.getElementById("searchName").innerHTML =  ledger.ledgerName ;
                    document.getElementById("searchGroup").innerHTML = ledger.group;
                    document.getElementById("searchbalance").innerHTML = ledger.balance;
                    document.getElementById("searchMailname").innerHTML =   ledger.mailingName;
                    document.getElementById("searchAddress").innerHTML =   ledger.textMessage;
                }
            }

            document.getElementById("deleteLedger").onclick = function(){
                var ledger_no = document.getElementById("search-ledger").value;
                localStorage.removeItem("ledger_Detail_" + ledger_no)
                location.reload()
            }

        }
    }
}


search()


create();

