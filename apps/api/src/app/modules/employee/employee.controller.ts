import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeModel } from './schemas/employee.schema';
import { EmployeeConverter } from './employee.converter';
import { CreateEmployeeDto } from './dto/create-employee.dto';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ApiResponse } from '@elektro-braun/shared/util-networking';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Employee } from '@elektro-braun/employees/domain';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async loadAll(): Promise<ApiResponse<Employee[]>> {
    const employees: EmployeeModel[] = await this.employeeService.readAll();
    console.log('employees', employees);
    return {
      data: employees.map(employee => EmployeeConverter.fromModel(employee)),
      status: 'success',
      statusCode: 200
    };
  }

  @Post()
  async create(@Body() employeeDto: CreateEmployeeDto): Promise<ApiResponse<Employee>> {
    const employeeModel = EmployeeConverter.fromDtoToModel(employeeDto);
    const createdEmployeeModel: EmployeeModel = await this.employeeService.insert(employeeModel);
    return {
      data: EmployeeConverter.fromModel(createdEmployeeModel),
      status: 'success',
      statusCode: 200
    }
  }
}
