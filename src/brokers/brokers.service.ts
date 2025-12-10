import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';

@Injectable()
export class BrokersService {
  constructor(private prisma: PrismaService) {}

  // NEW: Helper function to generate and ensure unique broker code
  private async generateUniqueBrokerCode(brokerName: string): Promise<string> {
    const MAX_ATTEMPTS = 5;
    // Use the first 3 non-space letters of the name as a base prefix
    const baseName = brokerName.replace(/[^a-zA-Z]/g, '').toUpperCase().substring(0, 3);

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        // Generate a random 4-character suffix
        const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
        
        const candidateCode = `${baseName}-${suffix}`;

        // Check if the code already exists
        const exists = await this.prisma.broker.findUnique({
            where: { brokerCode: candidateCode },
            select: { id: true },
        });

        if (!exists) {
            return candidateCode; // Found a unique code
        }
    }

    // If unable to generate a unique code after max attempts, throw a custom error
    throw new BadRequestException('Failed to generate a unique broker code. Please try again.');
  }


  // UPDATED: Create customer with auto-generated brokerCode
  async create(dto: CreateBrokerDto) {
    // 1. Generate the unique broker code based on the broker's name
    const brokerCode = await this.generateUniqueBrokerCode(dto.name);

    // 2. Merge the generated code into the data payload
    const dataWithCode = {
        ...dto,
        brokerCode: brokerCode, // Inject the generated code
    };
    
    // NOTE: CreateBrokerDto must have 'brokerCode' marked as optional (@IsOptional())
    return this.prisma.broker.create({ data: dataWithCode });
  }
  
async findAll(companyId: number) {
    // 1. Log the query parameters again for absolute certainty
    console.log('Executing Prisma findMany with companyId:', companyId);

    // 2. Execute the query and capture the result
    const brokers = await this.prisma.broker.findMany({
      where: {
        companyId: companyId,
      },
    });

    // 3. Log the result itself (the actual array returned by Prisma)
    console.log('Prisma Query Result (Brokers):', brokers);
    
    // 4. Also log the count, as the array might be empty
    console.log('Brokers Found Count:', brokers.length);

    // 5. Return the result as intended
    return brokers;
  }

  findOne(id: number) {
    return this.prisma.broker.findUnique({ where: { id } });
  }

  // UPDATED: Ensure brokerCode is not updated if accidentally sent
  async update(id: number, data: UpdateBrokerDto) {
    const exists = await this.prisma.broker.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Broker not found');

    // CRUCIAL: Prevent updating the unique brokerCode field
    const dataToUpdate = { ...data };
    if ('brokerCode' in dataToUpdate) {
        // Remove the code field if it was passed by the client
        delete dataToUpdate.brokerCode; 
    }

    return this.prisma.broker.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.broker.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Broker not found');

    return this.prisma.broker.delete({ where: { id } });
  }
}