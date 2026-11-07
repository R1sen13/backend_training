import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class TaskResponseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  completed: boolean;

  constructor(task: {
    id: string;
    name: string;
    completed: boolean;
    createdAt: Date;
  }) {
    this.id = task.id;
    this.name = task.name;
    this.completed = task.completed;
  }
}

export class TaskListResponseDto {
  @ApiProperty()
  @IsArray()
  data: TaskResponseDto[] = [];

  constructor(
    tasks: {
      id: string;
      name: string;
      completed: boolean;
      createdAt: Date;
    }[],
  ) {
    for (const task of tasks) {
      this.data.push(new TaskResponseDto(task));
    }
  }
}
