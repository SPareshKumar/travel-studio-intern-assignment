import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './create-request-dto';
import { requestResponse } from './request';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RequestsService {
    constructor(private prisma: PrismaService){}
    
    async create(payload: CreateRequestDto) : Promise<requestResponse>{
        return await this.prisma.request.create({
            data: payload,
        })
    }

    async findAllPending(): Promise<requestResponse[]> {
        return await this.prisma.request.findMany({
            where: {
                status: 'pending'
            },
            orderBy: {
                createdAt: 'asc' 
            }
        });
    }
}