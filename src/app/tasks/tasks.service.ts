import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { TaskCreationDto, TaskPatchingDto } from './dto/task.dto';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  getTasks() {
    return this.prisma.task.findMany();
  }

  getTaskById(taskId: string) {
    return this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
  }

  postTask(body: TaskCreationDto) {
    const { name, completed } = body;
    const newTask = {
      id: randomUUID(),
      name,
      completed,
    };
    return this.prisma.task.create({
      data: newTask,
    });
  }

  patchTask(taskId: string, task: TaskPatchingDto) {
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: task,
    });
  }

  deleteTask(taskId: string) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      }
    })
  };
}