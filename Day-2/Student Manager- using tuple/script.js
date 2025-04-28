var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Pass"] = "Pass";
    StudentStatus["Fail"] = "Fail";
})(StudentStatus || (StudentStatus = {}));
var students = [];
function addStudent(name, age, status) {
    students.push([name, age, status]);
    renderStudents();
}
function renderStudents() {
    var list = document.getElementById("list");
    list.innerHTML = students
        .map(function (_a) {
        var name = _a[0], age = _a[1], status = _a[2];
        var statusClass = status.toLowerCase();
        return "\n          <li class=\"".concat(statusClass, "\">\n            ").concat(name, " (Age: ").concat(age, ") - Status: <span class=\"status\">").concat(status, "</span>\n          </li>\n        ");
    })
        .join('');
}
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value.trim();
    var age = Number(document.getElementById("age").value);
    var statusValue = document.getElementById("status").value;
    var status = StudentStatus[statusValue];
    if (name && age > 0) {
        addStudent(name, age, status);
        e.target.reset();
    }
});
