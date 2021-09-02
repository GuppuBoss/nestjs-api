import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/databases/database.module';
import { UsersProvider } from './users.provider';
import { UsersService } from './users.service';

@Module({
  imports: [ DatabaseModule ],
  providers: [ UsersService, ...UsersProvider ],
  exports: [ UsersService ]
})
export class UsersModule { }
