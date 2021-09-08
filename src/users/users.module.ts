import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/databases/database.module';
import { ForgetPasswordService } from 'src/entities/forget-password';
import { UserController } from './users.controller';
import { UsersProvider } from './users.provider';
import { UsersService } from './users.service';

@Module({
  imports: [ DatabaseModule ],
  controllers: [ UserController ],
  providers: [ UsersService, ...UsersProvider, ForgetPasswordService ],
  exports: [ UsersService ]
})
export class UsersModule { }
