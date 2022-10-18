import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService
    ) {}
    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string,
    ) {
        // return this.lessonService.getLesson(id)
        return this.lessonService.getLesson(id);
    }
    
    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getAllLessons()
    }



    @Mutation(returns => LessonType)
    createLesson(
        @Args('name') name: string,
        @Args('startDate') startDate: string,
        @Args('endDate') endDate: string
    ) {
       return this.lessonService.createLesson(name, startDate, endDate);
    }

    @Mutation(reuturs => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput
    ) {
        const { lessonId, studentIds } = assignStudentsToLessonInput
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds)
    }    
}