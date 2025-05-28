import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateRequestDto } from './create-request-dto';
import { RequestsService } from './requests.service';

@Controller('api')
export class RequestsController {
    constructor(private requestService: RequestsService) {}
    
    @Post('request') 
    async create(
        @Body() createRequestDto: CreateRequestDto,
    ){
        return await this.requestService.create(createRequestDto);
    }

    @Get('request')
    async findAllPending() {
        return await this.requestService.findAllPending();
    }
}