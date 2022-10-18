import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
 
@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
    ) {}

    async getLesson(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id });
    }

    async getAllLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find()
    }

    createLesson(name, startDate, endDate): Promise<Lesson> {
        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students: []
        })

        return this.lessonRepository.save(lesson)
    }

    async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
        const lesson = await this.lessonRepository.findOne({ id: lessonId })
        lesson.students = [...lesson.students, ...studentIds];
        return this.lessonRepository.save(lesson)
    }
}
