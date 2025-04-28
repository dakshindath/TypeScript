function addNumbers(a: number, b: number): number {
    return a + b;
  }
  
  const form = document.getElementById('form') as HTMLFormElement;
  const num1Input = document.getElementById('num1') as HTMLInputElement;
  const num2Input = document.getElementById('num2') as HTMLInputElement;
  const result = document.getElementById('result') as HTMLHeadingElement;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
  
    if (!isNaN(num1) && !isNaN(num2)) {
      const sum = addNumbers(num1, num2);
      result.textContent = `Result: ${sum}`;
      form.reset();
    } else {
      result.textContent = 'Please enter valid numbers.';
    }
  });
  