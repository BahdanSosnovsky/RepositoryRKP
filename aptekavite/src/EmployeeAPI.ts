// src/EmployeeAPI.ts
// ---------------------------------------------------------
// Заглушка данных, которую прислал преподаватель.
// Логика оставлена как есть (all/get/delete/add/update),
// добавлены только простые типы TypeScript, чтобы проект
// собирался без ошибок компиляции (в исходном виде это был
// обычный .js файл).
// ---------------------------------------------------------

interface Employee {
  id: number
  name: string
  job: string
}

const EmployeeAPI = {
  employees: [
    { id: 1, name: 'Ben Blocker', job: 'Teacher' },
    { id: 2, name: 'Dave Defender', job: 'Student' },
    { id: 3, name: 'Sam Sweeper', job: 'Teacher' },
    { id: 4, name: 'Matt Midfielder', job: 'Student' },
    { id: 5, name: 'William Winger', job: 'Student' },
    { id: 6, name: 'Fillipe Forward', job: 'Rector' },
  ] as Employee[],

  // Вернуть весь список
  all: function () {
    return this.employees
  },

  // Найти одного сотрудника по id
  get: function (id: number) {
    const isEmployee = (p: Employee) => p.id === id
    return this.employees.find(isEmployee)
  },

  // Удалить сотрудника по id
  delete: function (id: number) {
    const isNotDelEmployee = (p: Employee) => p.id !== id
    this.employees = this.employees.filter(isNotDelEmployee)
    return true
  },

  // Добавить нового сотрудника (id генерируется автоматически, если не передан)
  add: function (employee: Partial<Employee>) {
    let newEmployee = employee as Employee
    if (!newEmployee.id) {
      newEmployee = {
        ...newEmployee,
        id:
          this.employees.reduce((prev, current) => {
            return prev.id > current.id ? prev : current
          }, { id: 0 } as Employee).id + 1,
      }
    }
    this.employees = [...this.employees, newEmployee]
    return newEmployee
  },
}

export default EmployeeAPI
