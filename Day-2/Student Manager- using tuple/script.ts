enum StudentStatus {
    Pass = "Pass",
    Fail = "Fail",
}

type StudentTuple = [string, number, StudentStatus];

const students: StudentTuple[] = [];

function addStudent(name: string, age: number, status: StudentStatus): void {
    students.push([name, age, status]);
    renderStudents();
}

function renderStudents(): void {
    const list = document.getElementById("list") as HTMLUListElement;
    list.innerHTML = students
        .map(([name, age, status]) => {
            const statusClass = status.toLowerCase();
            return `
          <li class="${statusClass}">
            ${name} (Age: ${age}) - Status: <span class="status">${status}</span>
          </li>
        `;
        })
        .join('');
}

(document.getElementById("form") as HTMLFormElement).addEventListener("submit",(e) => {
        e.preventDefault();

    const name = (
        document.getElementById("name") as HTMLInputElement).value.trim();
    const age = Number(
        (document.getElementById("age") as HTMLInputElement).value
    );
    const statusValue = (document.getElementById("status") as HTMLSelectElement).value as keyof typeof StudentStatus;
    const status = StudentStatus[statusValue];

        if (name && age > 0) {
            addStudent(name, age, status);
            (e.target as HTMLFormElement).reset();
        }
    }
);
