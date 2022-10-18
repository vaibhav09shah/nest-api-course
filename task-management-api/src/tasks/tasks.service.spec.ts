import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
    getTasks: jest.fn()
})

const mockUser = {
    username: 'Vaibhav',
    id: 'hdsg3-hjg324-jds-324f',
    password: 'password123',
    tasks: []
}

describe('Task Service Test', () => {
    let tasksService: TasksService;
    let tasksRepository: TaskRepository;

    beforeEach(async () => {
        // Initialize Nest JS Module with Tasks Service & Tasks Repository
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTasksRepository }
            ],
        }).compile()

        tasksService =  module.get(TasksService)
        tasksRepository = module.get(TaskRepository)
    });

    describe('get Tasks', () => {
        it('calls tasksRepository.getTasks and returs the result ', () => {
            expect(tasksRepository.getTasks).not.toHaveBeenCalled();
            tasksService.getTasks(null, mockUser);
            expect(tasksRepository.getTasks).toHaveBeenCalled();
        })
    })
})