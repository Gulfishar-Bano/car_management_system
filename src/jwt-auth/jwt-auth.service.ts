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

async getDashboardStats() {
  const [totalUsers, totalBookings, totalFares] = await Promise.all([
    this.UserRepository.count(),
    this.BookingRepo.count(), 
    this.FareRepo.count(),
  ]);

  const latestMarkup = await this.MarkupRepo.find({
    order: { createdAt: 'DESC' }, // Assuming Markup table has this
    take: 1
  });

  // --- 1. Analytics for the Chart (Top Routes) ---
  // We group by PickUpLocation and DropLocation as seen in your DB
  const routeStats = await this.BookingRepo
    .createQueryBuilder("booking")
    .select("CONCAT(booking.PickUpLocation, ' → ', booking.DropLocation)", "name")
    .addSelect("COUNT(booking.id)", "bookings")
    .groupBy("booking.PickUpLocation, booking.DropLocation")
    .orderBy("bookings", "DESC")
    .limit(5)
    .getRawMany();

  // --- 2. Recent Activity Feed (Using your 'Date' column) ---
  const recentActivities = await this.BookingRepo.find({
    order: { Date: 'DESC' }, // Using 'Date' from your specific schema
    take: 5
  });

  return {
    users: totalUsers,
    bookings: totalBookings,
    fares: totalFares,
    currentMarkup: latestMarkup[0]?.value || 0,
    systemStatus: 'Online',
    routes: routeStats, // Now dynamically calculated from your DB
    activities: recentActivities.map(booking => ({
      id: booking.id,
      text: `New booking for ${booking.PickUpLocation} by ${booking.Name}`, // Using 'Name'
      time: this.formatTimeAgo(booking.Date), // Helper for the timestamp
      type: 'booking'
    }))
  };
}

formatTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now.getTime()- past.getTime();
  const diffInMins = Math.floor(diffInMs / (1000 * 60));

  if (diffInMins < 1) return "Just now";
  if (diffInMins < 60) return `${diffInMins} mins ago`;
  
  const diffInHours = Math.floor(diffInMins / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  
  return past.toLocaleDateString(); // Fallback to date
}

   
}