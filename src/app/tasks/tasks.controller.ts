import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TaskCreationDto, TaskPatchingDto } from './dto/task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') taskId: string) {
    return this.taskService.getTaskById(taskId);
  }

  @Post()
  postTask(@Body() body: TaskCreationDto) {
    return this.taskService.postTask(body);
  }

  @Patch(':id')
  patchTask(@Param('id') taskId: string, @Body() task: TaskPatchingDto) {
    return this.taskService.patchTask(taskId, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: string) {
    return this.taskService.deleteTask(taskId);
  }
}
