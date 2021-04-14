import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '@elektro-braun/shared/util-data';
import { EmployeeModel } from './schemas/employee.schema';
import { EmployeeConverter } from './employee.converter';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async loadAll(): Promise<Employee[]> {
    const employees: EmployeeModel[] = await this.employeeService.readAll();
    console.log('employees', employees);
    return employees.map(employee => EmployeeConverter.fromModel(employee));
  }

  @Post()
  async create(@Body() employeeDto: CreateEmployeeDto): Promise<Employee> {
    const employeeModel = EmployeeConverter.fromDtoToModel(employeeDto);
    const createdEmployeeModel: EmployeeModel = await this.employeeService.insert(employeeModel);
    return EmployeeConverter.fromModel(createdEmployeeModel);
  }
}
