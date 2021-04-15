import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MONGOOSE_URI } from './config/constants';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './modules/employee/employee.module';
import { TimeReportModule } from './modules/time-report/time-report.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { HolidayModule } from './modules/holiday/holiday.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRoot(MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true }),
    UserModule,
    AuthModule,
    EmployeeModule,
    TimeReportModule,
    HolidayModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
