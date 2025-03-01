// ActiveUsers class to manage employee and students
export class ActiveUsers {
  private employee: Record<string, string> = {};
  private students: Record<string, string> = {};
  private admins: Record<string, string> = {};

  // Method to add or update a employee
  joinEmployee(userId: string, socketId: string): void {
    this.employee[userId] = socketId;
  }
  
  getEmployeeSocketId(userId: string) {
    return this.employee[userId];
  }

  // Method to remove a employee
  removeEmployee(userId: string): void {
    delete this.employee[userId];
  }

  // Method to add or update a passenger
  joinStudent(userId: string, socketId: string): void {
    this.students[userId] = socketId;
  }
  getstudentsocketId(userId: string) {
    return this.students[userId];
  }
  // Method to remove a passenger
  removeStudent(userId: string): void {
    delete this.students[userId];
  }

  // Method to add or update a admin
  joinAdmin(userId: string, socketId: string): void {
    this.admins[userId] = socketId;
  }
  
  getAdminSocketId(userId: string) {
    return this.admins[userId];
  }

  // Method to remove a admin
  removeAdmin(userId: string): void {
    delete this.admins[userId];
  }

  // Method to get all active employee
  getAllemployee() {
    return this.employee;
  }

  // Method to get all active students
  getAllstudents() {
    return this.students;
  }

    // Method to get all active students
    getAllAdmins() {
      return this.admins;
    }
}
