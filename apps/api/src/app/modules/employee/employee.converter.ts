import { Employee } from '@elektro-braun/shared/util-data';
import { EmployeeModel } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';

export class EmployeeConverter {
  static fromModel(model: EmployeeModel): Employee {
    return {
      id: model.id,
      age: model.age,
      holidaysFirstYear: model.holidayCreditFirstYear,
      holidaysPerYear: model.availableHolidayCredit,
      joiningDate: model.joiningDate ? model.joiningDate.toISOString() : new Date().toISOString(),
      lastRecordedDate: model?.lastRecordedDate ? model.lastRecordedDate : undefined,
      mail: model.mail,
      name: model.name,
      phone: model.phone,
      workingHours: model.workingHours
    }
  }

  static fromDtoToModel(dto: CreateEmployeeDto): EmployeeModel {
    const { workingHours } = dto;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = workingHours;
    return {
      name: dto.name,
      workingHours: { monday, tuesday, wednesday, thursday, friday, saturday, sunday },
      phone: dto.phone,
      mail: dto.mail,
      holidayCredit: dto.holidayCredit,
      holidayCreditFirstYear: dto.holidayCreditFirstYear,
      availableHolidayCredit: dto.availableHolidayCredit,
      joiningDate: dto.joiningDate ? new Date(dto.joiningDate) : new Date(),
      age: dto.age,
      lastRecordedDate: undefined
    }
  }
}
