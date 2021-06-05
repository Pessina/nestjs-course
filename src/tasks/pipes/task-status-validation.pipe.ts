import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    allowedStatus: string[] = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN,
    ];

    transform(value: string) {
        value = value.toUpperCase();

        if (!this.isValidStatus(value)) {
            throw new BadRequestException(`${value} is not a valid status`);
        }

        return value;
    }

    isValidStatus(status: string): boolean {
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1;
    }
}
