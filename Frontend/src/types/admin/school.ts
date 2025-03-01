export interface IAddress {
    city?: string
    street?: string
    district?: string
    state: string
    country: string
    zipCode?: string
  }
  
  export interface IStudent {
    id: string
    fullName: string
    email: string
    dateOfBirth: string
    phoneNumber: string
    gender: "MALE" | "FEMALE" | "OTHER"
    grade: string
    section: string
    address: IAddress
    guardianName: string
    guardianPhone: string
  }
  
  export interface ITeacher {
    id: string
    fullName: string
    email: string
    dateOfBirth: string
    phoneNumber: string
    gender: "MALE" | "FEMALE" | "OTHER"
    subjects: string[]
    qualification: string
    address: IAddress
    joiningDate: string
  }
  
  export interface IClass {
    id: string
    grade: string
    section: string
    teacherId: string
    subjects: string[]
    schedule: {
      day: string
      startTime: string
      endTime: string
    }[]
    capacity: number
    enrolled: number
  }
  
  export interface IBus {
    id: string
    busNumber: string
    driverName: string
    driverPhone: string
    route: string
    capacity: number
    stops: {
      location: string
      time: string
    }[]
  }
  
  