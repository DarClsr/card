import { DbModule } from 'db/db.module';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    HttpModule.register({}),
    ScheduleModule.forRoot(),
    DbModule,
    JwtModule.registerAsync({
      useFactory: () => {
        console.log(process.env.JWT_SECRET)
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '7d' },
        };
      },
    }),
    BullModule.forRootAsync({
      useFactory() {
        return {
          redis: process.env.REDIS_URI || 'redis://localhost:6379',
        } as any;
      },
    }),
    BullModule.registerQueue({
      name: 'sync_data',
    }),
  ],
  providers: [],
  exports: [DbModule, ScheduleModule, JwtModule, ConfigModule, BullModule],
})
export class CommonModule {}
