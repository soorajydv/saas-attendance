"use client"

import { useState } from "react"
import { Layout } from "../../components/ui/layout"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Plus } from "lucide-react"

const students = [
  {
    id: 1,
    name: "John Doe",
    grade: "10",
    section: "A",
    rollNo: "1001",
    attendance: "95%",
  },
  // Add more student data here
]

export default function StudentsPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="grade">Grade</Label>
                <Input id="grade" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="section">Section</Label>
                <Input id="section" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rollNo">Roll Number</Label>
                <Input id="rollNo" />
              </div>
              <Button onClick={() => setIsOpen(false)}>Add Student</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.attendance}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

