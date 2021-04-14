import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MONGOOSE_URI } from './config/constants';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './modules/employee/employee.module';
import { TimeReportModule } from './modules/time-report/time-report.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGOOSE_URI, { useUnifiedTopology: true, useNewUrlParser: true }),
    UserModule,
    AuthModule,
    EmployeeModule,
    TimeReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
