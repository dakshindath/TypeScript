var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
document.addEventListener('DOMContentLoaded', function () {
    var _a, _b;
    var paymentDetails = [];
    function processPayment(payment) {
        paymentDetails.push(payment);
        console.log(paymentDetails);
        displayPaymentDetails();
    }
    function displayPaymentDetails() {
        var cardContainer = document.getElementById('cardDetails');
        var upiContainer = document.getElementById('upiDetails');
        var bankContainer = document.getElementById('netBankingDetails');
        var cardTemplate = document.getElementById('cardTemplate');
        var upiTemplate = document.getElementById('upiTemplate');
        var bankTemplate = document.getElementById('bankTemplate');
        console.log('Card Template:', cardTemplate);
        console.log('UPI Template:', upiTemplate);
        console.log('Bank Template:', bankTemplate);
        // Ensure templates exist
        if (!cardTemplate || !upiTemplate || !bankTemplate) {
            console.error('One or more templates are missing in the DOM.');
            return;
        }
        // Clear existing content in containers
        if (cardContainer)
            cardContainer.innerHTML = '';
        if (upiContainer)
            upiContainer.innerHTML = '';
        if (bankContainer)
            bankContainer.innerHTML = '';
        paymentDetails.forEach(function (payment) {
            if ('cardNumber' in payment) {
                var clone = cardTemplate.content.cloneNode(true);
                clone.querySelector('.transaction-id').textContent = payment.transactionId;
                clone.querySelector('.amount').textContent = payment.amount.toFixed(2);
                clone.querySelector('.card-number').textContent = payment.cardNumber.slice(-4);
                clone.querySelector('.expiry-date').textContent = payment.expiryDate;
                clone.querySelector('.timestamp').textContent = payment.timestamp.toLocaleString();
                cardContainer === null || cardContainer === void 0 ? void 0 : cardContainer.appendChild(clone);
            }
            else if ('upiId' in payment) {
                var clone = upiTemplate.content.cloneNode(true);
                clone.querySelector('.transaction-id').textContent = payment.transactionId;
                clone.querySelector('.amount').textContent = payment.amount.toFixed(2);
                clone.querySelector('.upi-id').textContent = payment.upiId;
                clone.querySelector('.timestamp').textContent = payment.timestamp.toLocaleString();
                upiContainer === null || upiContainer === void 0 ? void 0 : upiContainer.appendChild(clone);
            }
            else if ('bankName' in payment) {
                var clone = bankTemplate.content.cloneNode(true);
                clone.querySelector('.transaction-id').textContent = payment.transactionId;
                clone.querySelector('.amount').textContent = payment.amount.toFixed(2);
                clone.querySelector('.bank-name').textContent = payment.bankName;
                clone.querySelector('.account-number').textContent = payment.accountNumber.slice(-4);
                clone.querySelector('.timestamp').textContent = payment.timestamp.toLocaleString();
                bankContainer === null || bankContainer === void 0 ? void 0 : bankContainer.appendChild(clone);
            }
        });
    }
    (_a = document.getElementById('paymentForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
        event.preventDefault();
        var paymentMethod = document.getElementById('paymentMethod').value;
        var commonData = {
            transactionId: "txn".concat(Date.now()),
            amount: 0,
            timestamp: new Date(),
        };
        if (paymentMethod === 'Card') {
            var cardNumber = document.getElementById('cardNumber').value;
            var expiryDate = document.getElementById('expiryDate').value;
            var amount = parseFloat(document.getElementById('amountCard').value);
            var cardTransaction = __assign(__assign({}, commonData), { cardNumber: cardNumber, expiryDate: expiryDate, amount: amount });
            processPayment(cardTransaction);
        }
        else if (paymentMethod === 'UPI') {
            var upiId = document.getElementById('upiId').value;
            var amount = parseFloat(document.getElementById('amountUpi').value);
            var upiTransaction = __assign(__assign({}, commonData), { upiId: upiId, amount: amount });
            processPayment(upiTransaction);
        }
        else if (paymentMethod === 'NetBanking') {
            var bankName = document.getElementById('bankName').value;
            var accountNumber = document.getElementById('accountNumber').value;
            var amount = parseFloat(document.getElementById('amountBank').value);
            var netBankingTransaction = __assign(__assign({}, commonData), { bankName: bankName, accountNumber: accountNumber, amount: amount });
            processPayment(netBankingTransaction);
        }
        // Clear form fields
        document.getElementById('paymentForm').reset();
        document.querySelectorAll('.payment-fields, button[type="submit"]').forEach(function (el) {
            el.classList.add('hidden');
        });
    });
    (_b = document.getElementById('paymentMethod')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function (event) {
        var _a, _b, _c, _d;
        var method = event.target.value;
        document.querySelectorAll('.payment-fields, button[type="submit"]').forEach(function (el) {
            el.classList.add('hidden');
        });
        if (method === 'Card') {
            (_a = document.getElementById('cardFields')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        }
        else if (method === 'UPI') {
            (_b = document.getElementById('upiFields')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
        }
        else if (method === 'NetBanking') {
            (_c = document.getElementById('netBankingFields')) === null || _c === void 0 ? void 0 : _c.classList.remove('hidden');
        }
        (_d = document.querySelector('button[type="submit"]')) === null || _d === void 0 ? void 0 : _d.classList.remove('hidden');
    });
    document.querySelectorAll('.tab-button').forEach(function (button) {
        button.addEventListener('click', function (event) {
            var _a;
            var category = event.target.dataset.category;
            document.querySelectorAll('.tab-content').forEach(function (content) {
                content.classList.add('hidden');
            });
            (_a = document.getElementById("".concat(category, "Details"))) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        });
    });
});
