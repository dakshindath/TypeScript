var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(id, name) {
        this.logs = [];
        this.id = id;
        this.name = name;
    }
    Person.prototype.logAttendance = function () {
        var timestamp = new Date().toLocaleString();
        this.logs.push(timestamp);
    };
    Person.prototype.getLogs = function () {
        return this.logs;
    };
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(id, name, department) {
        var _this = _super.call(this, id, name) || this;
        _this.department = department;
        return _this;
    }
    Employee.prototype.getInfo = function () {
        return "".concat(this.name, " (").concat(this.department, ")");
    };
    Employee.prototype.getAttendanceLogs = function () {
        return this.getLogs();
    };
    return Employee;
}(Person));
var empIdCounter = 1;
var employees = [];
var form = document.getElementById("attendanceForm");
var empNameInput = document.getElementById("empName");
var deptInput = document.getElementById("department");
var logContainer = document.getElementById("logContainer");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = empNameInput.value.trim();
    var department = deptInput.value.trim();
    if (!name || !department)
        return;
    var emp = new Employee(empIdCounter++, name, department);
    emp.logAttendance();
    employees.push(emp);
    displayLogs();
    form.reset();
});
function displayLogs() {
    logContainer.innerHTML = "";
    employees.forEach(function (emp) {
        var empDiv = document.createElement("div");
        empDiv.className = "employee-log";
        var title = document.createElement("h3");
        title.textContent = emp.getInfo();
        empDiv.appendChild(title);
        var list = document.createElement("ul");
        emp.getAttendanceLogs().forEach(function (log) {
            var li = document.createElement("li");
            li.textContent = log;
            list.appendChild(li);
        });
        empDiv.appendChild(list);
        logContainer.appendChild(empDiv);
    });
}
