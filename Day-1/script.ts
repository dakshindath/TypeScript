function calculateTip(): void {
    const billinput = document.getElementById('billamount') as HTMLInputElement;
    const tipinput = document.getElementById('percent') as HTMLInputElement;
    const resultDiv = document.getElementById('result') as HTMLElement;
  
    const billamount: number = parseFloat(billinput.value);
    const percent: number = parseFloat(tipinput.value);
  
    if (isNaN(billamount) || isNaN(percent) || billamount < 0 || percent < 0) {
      resultDiv.innerHTML = 'Please enter valid positive numbers!';
      return;
    }
  
    const tipamount: number = (billamount * percent) / 100;
    const totalamount: number = billamount + tipamount;
  
    resultDiv.innerHTML = `
      Tip Amount: ₹${tipamount.toFixed(2)} <br>
      Total Amount: ₹${totalamount.toFixed(2)}
    `;
  }
  