import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from '@nx-tpdb/shared';
import { UpdateProfileDto } from '@nx-tpdb/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>
  ) {
  }
  async create(dto: CreateProfileDto): Promise<Profile> {
    const pts = new Profile()
    pts.firstname = dto.firstname;
    pts.lastname = dto.lastname;
    pts.dateofBirth = dto.dateofBirth;
    pts.email = dto.email;

    const created = this.profileRepo.create(pts)
    return await this.profileRepo.save(created);


  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: string) {
    return this.profileRepo.findOne({where: {id}, })
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }
}
