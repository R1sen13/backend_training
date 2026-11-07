import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { TaskCreationDto, TaskPatchingDto } from './dto/task.dto';
import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskListResponseDto, TaskResponseDto } from './dto/task-response.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async getTasks() {
    const tasks = await this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new TaskListResponseDto(tasks);
  }

  async getTaskById(taskId: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }

    return new TaskResponseDto(task);
  }

  async postTask(body: TaskCreationDto) {
    const { name, completed } = body;
    const newTask = {
      id: randomUUID(),
      name,
      completed,
    };
    const task = await this.prisma.task.create({
      data: newTask,
    });

    return new TaskResponseDto(task);
  }

  async patchTask(taskId: string, task: TaskPatchingDto) {
    const editedTask = await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: task,
    });

    return new TaskResponseDto(editedTask);
  }

  deleteTask(taskId: string) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
