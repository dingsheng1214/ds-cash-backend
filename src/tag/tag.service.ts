import { Tag } from './entities/tag.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  @InjectRepository(Tag)
  private readonly tagRepository: Repository<Tag>;

  async create(user: User, createTagDto: CreateTagDto) {
    const tag = new Tag();
    tag.name = createTagDto.name;
    tag.type = createTagDto.type;
    tag.user_id = user.id;
    const res = await this.tagRepository.save(tag);
    return res;
  }

  async findAll(user: User) {
    const qb = this.tagRepository.createQueryBuilder('tag');
    const tags = await qb
      .where('tag.user_id = :user_id', { user_id: user.id })
      .orWhere('tag.user_id = :user_id', { user_id: '' })
      .getMany();
    return tags;
  }

  async findOne(id: string) {
    return this.tagRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const tag = await this.tagRepository.findOneBy({ id });
    if (!tag || !tag.user_id) return;
    tag.name = updateTagDto.name;
    this.tagRepository.update({ id }, tag);
  }

  async remove(id: string) {
    const tag = await this.tagRepository.findOneBy({ id });
    if (!tag || !tag.user_id) return;
    this.tagRepository.delete({ id });
  }
}
