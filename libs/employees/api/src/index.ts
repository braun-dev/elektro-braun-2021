
// Public interface - consumable from other domains
export * from './lib/employees-api.module';
export { EmployeesApiService } from './lib/employees-api.service';
export { actions as EmployeeActions, Employee } from '@elektro-braun/employees/domain';
