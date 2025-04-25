import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


describe('UserController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: User = {
    id: 'uuid',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedpassword',
    phone_number: '08123456789',
    profile_picture: '',
    gender: 'male',
    birthdate: new Date('1990-01-01'),
    address: 'Some address',
    role: 'CUSTOMER',
    is_verified: false,
    verification_token: '',
    last_login: null,
    login_attempts: 0,
    blocked_until: null,
    device_type: 'ios',
    device_id: 'device-id',
    last_ip: '127.0.0.1',
    last_location: 'Jakarta',
    socket_id: '',
    fcm_token: '',
  };

  const mockUserService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue({ ...mockUser, name: 'Updated' }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      phone_number: '08123456789',
      profile_picture: '',
      gender: 'male',
      birthdate: new Date('1990-01-01'),
      address: 'Some address',
      role: 'CUSTOMER',
      device_type: 'ios',
      device_id: 'device-id',
      last_ip: '127.0.0.1',
      last_location: 'Jakarta',
      socket_id: '',
      fcm_token: '',
    };

    const result = await controller.create(dto);
    expect(result).toEqual(mockUser);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockUser]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one user', async () => {
    const result = await controller.findOne('uuid');
    expect(result).toEqual(mockUser);
    expect(service.findOne).toHaveBeenCalledWith('uuid');
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = { name: 'Updated' };
    const result = await controller.update('uuid', dto);
    expect(result).toEqual({ ...mockUser, name: 'Updated' });
    expect(service.update).toHaveBeenCalledWith('uuid', dto);
  });

  it('should delete a user', async () => {
    const result = await controller.remove('uuid');
    expect(result).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith('uuid');
  });
});
