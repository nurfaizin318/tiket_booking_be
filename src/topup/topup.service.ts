import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTopupDto, UpdateTopupDto, createTopupSchema, updateTopupSchema } from './dto/topup.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { WalletTransactionService } from 'src/wallet-transaction/wallet-transaction.service';


@Injectable()
export class TopupService {
  constructor(private prisma: PrismaService, private walletTransaction: WalletTransactionService) {}

  async create(data: CreateTopupDto) {

    const topup = await  this.prisma.topup.create({
      data: data,
    });

    if (!topup) throw new NotFoundException("topup not found")

    return {
      data: {},
      message: "success topup"
    }
    
  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [topups, total ] = await Promise.all([
      this.prisma.topup.findMany({
        skip,
        take: Number(limit),
        include: {
          user: true,
        },
      }),
      this.prisma.topup.count()
    ])

    return {
      data: {
        topups,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      message: "success find all user"
    }
  }

  async findOne(id: string) {
    return this.prisma.topup.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async update(id: string, data: UpdateTopupDto) {
    const parsed = updateTopupSchema.safeParse(data);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }

    return this.prisma.topup.update({
      where: { id },
      data: parsed.data,
    });
  }

  async remove(id: string) {
    return this.prisma.topup.delete({
      where: { id },
    });
  }

}
