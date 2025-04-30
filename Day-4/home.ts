interface IPerson {
    id: number;
    name: string;
    logAttendance(): void;
  }

  class Person implements IPerson {
    public id: number; 
    public name: string; 
    protected logs: string[] = []; 
  
    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }
  
    public logAttendance(): void {
      const timestamp = new Date().toLocaleString();
      this.logs.push(timestamp); 
    }
  
    protected getLogs(): string[] {
      return this.logs;
    }
  }
  
  class Employee extends Person {
    private department: string; 

    constructor(id: number, name: string, department: string) {
      super(id, name); 
      this.department = department;
    }
 
    public getInfo(): string {
      return `${this.name} (${this.department})`;
    }
  
    public getAttendanceLogs(): string[] {
      return this.getLogs();
    }
  }
  
  let empIdCounter = 1;
  
  const employees: Employee[] = [];
  
  const form = document.getElementById("attendanceForm") as HTMLFormElement;
  const empNameInput = document.getElementById("empName") as HTMLInputElement;
  const deptInput = document.getElementById("department") as HTMLInputElement;
  const logContainer = document.getElementById("logContainer") as HTMLDivElement;
  
  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
  
    const name = empNameInput.value.trim();
    const department = deptInput.value.trim();

    if (!name || !department) return;

    const emp = new Employee(empIdCounter++, name, department);
    emp.logAttendance(); 
    employees.push(emp);
  
    displayLogs();
    form.reset(); 
  });
  
  function displayLogs() {
    logContainer.innerHTML = ""; 
  
    employees.forEach((emp) => {
      const empDiv = document.createElement("div");
      empDiv.className = "employee-log";
  
      const title = document.createElement("h3");
      title.textContent = emp.getInfo(); 
      empDiv.appendChild(title);
  
      const list = document.createElement("ul");
  
      emp.getAttendanceLogs().forEach((log) => {
        const li = document.createElement("li");
        li.textContent = log;
        list.appendChild(li);
      });
  
      empDiv.appendChild(list);
      logContainer.appendChild(empDiv); 
    });
  }
  