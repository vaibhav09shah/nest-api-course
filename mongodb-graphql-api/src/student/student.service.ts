import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid'

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ) {}

    async createStudent(createStudentInput: createStudentInput): Promise<Student> {
        const { firstName, lastName } = createStudentInput
         const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        })

        return this.studentRepository.save(student)
    }
    
    async getAllStudents(): Promise<Student[]> {
        return this.studentRepository.find()
    }

    async getStudentById(id: string): Promise<Student> {
        return this.studentRepository.findOne({ id })
    }
}
