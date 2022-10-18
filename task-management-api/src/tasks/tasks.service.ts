import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private tasksRepository: TaskRepository
    ) {}

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto, user)
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Task with ${id} not found`)
        }

        return found;
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user)
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException(`Task with ${id} not found`)
        }
    }

    async updateTask(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status;
        await this.tasksRepository.save(task)
        return task;
    }

    // private tasks: Task[] = [];

    // getAllTasks() {
    //     return this.tasks
    // }

    // getTaskById(id: string) {
    //     const found = this.tasks.find((task) => task.id === id)
    //     if(!found) {
    //         throw new NotFoundException(`Task with ID ${id} not found`);
    //     }
    //     return found
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }

    //     this.tasks.push(task);
    //     return task
    // }

    // deleteTask(id: string) {
    //     const found = this.getTaskById(id)
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id)
    // }

    // updateTask(id: string, status:TaskStatus){
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     // define a temp array to hold the result
    //     let tasks = this.getAllTasks()
    //     // Do something with status
    //     if(status) {
    //         tasks = tasks.filter((task) => task.status === status)
    //     }

    //     // Do something with Search
    //     if(search) {
    //         tasks = tasks.filter((task) => {
    //             if(task.title.includes(search) || task.description.includes(search)){
    //                 return true;
    //             }
    //             return false;
    //         })
    //     }
    //     // return final result
    //     return tasks
    // }
}
