function calculateTip() {
    const billinput = document.getElementById('billamount');
    const tipinput = document.getElementById('percent');
    const resultDiv = document.getElementById('result');
    const billamount = parseFloat(billinput.value);
    const percent = parseFloat(tipinput.value);
    if (isNaN(billamount) || isNaN(percent) || billamount < 0 || percent < 0) {
        resultDiv.innerHTML = 'Please enter valid positive numbers!';
        return;
    }
    const tipamount = (billamount * percent) / 100;
    const totalamount = billamount + tipamount;
    resultDiv.innerHTML = `
      Tip Amount: ₹${tipamount.toFixed(2)} <br>
      Total Amount: ₹${totalamount.toFixed(2)}
    `;
}
