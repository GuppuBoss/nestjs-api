import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/databases/database.module';
import { UsersProvider } from './users.provider';
import { UsersService } from './users.service';

@Module({
  imports: [ DatabaseModule, JwtModule.register({
    secret: `"${process.env.JWT_SECRET}"`,
    signOptions: { expiresIn: '60s' },
  }) ],
  providers: [ UsersService, ...UsersProvider ],
  exports: [ UsersService ]
})
export class UsersModule { }
