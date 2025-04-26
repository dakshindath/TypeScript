function calculateTip() {
    var billinput = document.getElementById('billamount');
    var tipinput = document.getElementById('percent');
    var resultDiv = document.getElementById('result');
    var billamount = parseFloat(billinput.value);
    var percent = parseFloat(tipinput.value);
    if (isNaN(billamount) || isNaN(percent) || billamount < 0 || percent < 0) {
        resultDiv.innerHTML = 'Please enter valid positive numbers!';
        return;
    }
    var tipamount = (billamount * percent) / 100;
    var totalamount = billamount + tipamount;
    resultDiv.innerHTML = "\n      Tip Amount: \u20B9".concat(tipamount.toFixed(2), " <br>\n      Total Amount: \u20B9").concat(totalamount.toFixed(2), "\n    ");
}
