import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { createStudentInput } from "./create-student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(of => StudentType)
export class StudentResolver {

    constructor(
        private studentService: StudentService
    ) {

    }
    @Mutation(returns => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: createStudentInput
    ) {
        return this.studentService.createStudent(createStudentInput)
    }
    
    @Query(returns => [StudentType])
    getAllStudents() {
        return this.studentService.getAllStudents()
    }
    
    @Query(returns => StudentType)
    getStudentById(
        @Args('id') id: string
    ) {
        return this.studentService.getStudentById(id)
    }   
}