function addNumbers(a, b) {
    return a + b;
}
var form = document.getElementById('form');
var num1Input = document.getElementById('num1');
var num2Input = document.getElementById('num2');
var result = document.getElementById('result');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var num1 = parseFloat(num1Input.value);
    var num2 = parseFloat(num2Input.value);
    if (!isNaN(num1) && !isNaN(num2)) {
        var sum = addNumbers(num1, num2);
        result.textContent = "Result: ".concat(sum);
        form.reset();
    }
    else {
        result.textContent = 'Please enter valid numbers.';
    }
});
