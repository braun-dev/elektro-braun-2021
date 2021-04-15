import { EmployeeModel } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Employee } from '@elektro-braun/employees/domain';

export class EmployeeConverter {
  static fromModel(model: EmployeeModel): Employee {
    return {
      id: model.id,
      name: model.name,
      firstname: model?.firstname,
      lastname: model?.lastname,
      mail: model.mail,
      mail2: model?.mail2,
      phone: model.phone,
      phone2: model?.phone2,
      country: model?.country ?? 'Österreich',
      street: model?.street,
      houseNumber: model?.houseNumber,
      zipCode: model?.zipCode + '',
      city: model?.city,
      dateOfBirth: model?.dateOfBirth ? model.dateOfBirth.toISOString() : new Date().toISOString(),
      gender: model?.gender === 'm' || model?.gender === 'w' ? model?.gender : 'm',
      documents: [] as never[],
      job: model?.job ?? 'Elektriker',
      employmentDate: model.joiningDate ? model.joiningDate.toISOString() : new Date().toISOString(),
      holidaysFirstYear: model.holidayCreditFirstYear,
      holidaysPerYear: model.availableHolidayCredit,
      lastRecordedDate: model?.lastRecordedDate ? model.lastRecordedDate as unknown as any : undefined,
      workingHours: model.workingHours
    }
  }

  static fromDtoToModel(dto: CreateEmployeeDto): EmployeeModel {
    const { workingHours, companyInfo, personalInfo } = dto;
    const {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday = workingHours?.saturday ?? 0,
      sunday = workingHours?.saturday ?? 0
    } = workingHours;

    return {
      name: `${personalInfo.firstname} ${personalInfo.lastname}`,
      firstname: personalInfo?.firstname,
      lastname: personalInfo?.lastname,
      workingHours: { monday, tuesday, wednesday, thursday, friday, saturday, sunday },
      phone: personalInfo.phone,
      phone2: personalInfo.phone2,
      mail: personalInfo.mail,
      mail2: personalInfo.mail2,
      holidayCredit: companyInfo.holidayCredit,
      holidayCreditFirstYear: companyInfo.holidayCreditFirstYear,
      availableHolidayCredit: companyInfo?.availableHolidayCredit ?? companyInfo?.holidayCreditFirstYear ?? companyInfo?.holidayCredit,
      joiningDate: companyInfo.joiningDate ? new Date(companyInfo.joiningDate) : new Date(),
      dateOfBirth: typeof personalInfo?.dateOfBirth === 'string' ? new Date(personalInfo?.dateOfBirth) : personalInfo.dateOfBirth,
      gender: personalInfo.gender,
      country: personalInfo.country,
      city: personalInfo.city,
      street: personalInfo.street,
      houseNumber: personalInfo.houseNumber,
      zipCode: personalInfo.zipCode,
      lastRecordedDate: undefined,
      job: companyInfo.job
    }
  }
}
