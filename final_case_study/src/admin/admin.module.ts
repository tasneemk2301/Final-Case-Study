import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';


@Module({
    imports: [],
    controllers: [],
    exports: [AdminService],
    providers: [AdminService]
})
export class AdminModule {}