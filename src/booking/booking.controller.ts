import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto, createBookingSchema, updateBookingSchema } from './dto/create-booking.dot';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { PaginationDto } from 'src/common/dto/pagination-dto';



@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body( new ZodValidationPipe(createBookingSchema)) dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.bookingService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body( new ZodValidationPipe(updateBookingSchema)) dto: UpdateBookingDto) {
    return this.bookingService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
