import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Booking } from 'src/booking/entities/booking.entity';
import { Fare } from 'src/fare/fare.entity';
import { Markup } from 'src/markup/markup.entity';

@Injectable()
export class JwtAuthService {
    constructor(
        @InjectRepository(User)
        private readonly UserRepository:Repository<User>,
            @InjectRepository(Booking) 
        private readonly BookingRepo:Repository<Booking>,
        @InjectRepository(Fare)
        private readonly FareRepo:Repository<Fare>,

        @InjectRepository(Markup)
        private readonly MarkupRepo:Repository<Markup>,

        private readonly jwtService:JwtService){}

  
async signup(Dto: CreateUserDto) {
  const existing = await this.UserRepository.findOneBy({ email: Dto.email });
  if (existing) throw new BadRequestException("Email already exists");

  const hashed = await bcrypt.hash(Dto.password, 10);

  const user = this.UserRepository.create({
    name: Dto.Name,
    email: Dto.email,
    password: hashed,
    role: Dto.role || UserRole.USER,   // <-- Now admin is allowed
  });

  return this.UserRepository.save(user);
}


async login(dto: loginDto) {
  const user = await this.UserRepository.findOneBy({ email: dto.email });

  if (!user) {
    throw new UnauthorizedException("Invalid credentials");
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(dto.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException("Invalid credentials");
  }

  const payload = {
    name: user.name,
    username: user.email,
    sub: user.id,
    role: user.role
  };

  const token = this.jwtService.sign(payload);

  return {
    Message: "Login successful",
    token,
  };
}


async logout() {
  return { message: "Logout successful" };
}


async users() {
  
  return await this.UserRepository.find({
    select: ['id','email', 'role', 'name','status'], 
   
  });
}


async toggleStatus(id: number) {
  const user = await this.UserRepository.findOneBy({ id });

  // This "If" block fixes the 'possibly null' errors
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  user.status = user.status === 'Active' ? 'Blocked' : 'Active';
  return this.UserRepository.save(user); 
}

async updateRole(id: number, newRole: any) {
  return this.UserRepository.update(id, { role: newRole });
}
// Inside your JwtAuthService
async getDashboardStats() {
  const [totalUsers, totalBookings, totalFares] = await Promise.all([
    this.UserRepository.count(),
    this.BookingRepo.count(), 
    this.FareRepo.count(),
  ]);

  const latestMarkup = await this.MarkupRepo.find({
    order: { createdAt: 'DESC' },
    take: 1
  });

  const routeStats = await this.BookingRepo
    .createQueryBuilder("booking")
    .select("CONCAT(booking.PickUpLocation, ' → ', booking.DropLocation)", "name")
    .addSelect("COUNT(booking.id)", "bookings")
    .groupBy("booking.PickUpLocation, booking.DropLocation")
    .orderBy("bookings", "DESC")
    .limit(4)
    .getRawMany();

  const recentBookings = await this.BookingRepo.find({
    order: { Date: 'DESC' }, // Sorted by your 'Date' column
    take: 3
  });

  return {
    systemStatus: 'Online',
    stats: [
      { label: 'Total Users', value: totalUsers, icon: '👥', color: '#4f46e5' },
      { label: 'Total Bookings', value: totalBookings, icon: '📅', color: '#10b981' },
      { label: 'Active Markup', value: `${latestMarkup[0]?.value || 0}%`, icon: '💰', color: '#f59e0b' }
    ],
    routes: routeStats,
    activities: recentBookings.map(b => ({
      id: b.id,
      type: 'booking',
      text: `New booking: ${b.PickUpLocation} → ${b.DropLocation} by ${b.Name}`,
      time: this.formatTimeAgo(b.Date.toISOString())
    }))
  };
}

formatTimeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  // Using .getTime() to fix the TypeScript arithmetic error
  const diffInMs = now.getTime() - past.getTime();
  const diffInMins = Math.floor(diffInMs / (1000 * 60));

  if (diffInMins < 1) return "Just now";
  if (diffInMins < 60) return `${diffInMins} mins ago`;
  return past.toLocaleDateString();
}


   
}