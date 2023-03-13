import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCategoryDto) {
    const categoriExists = await this.prisma.category.findUnique({
      where: { name: data.name },
    });

    if (categoriExists) {
      throw new HttpException('Category already exists', 202);
    }

    return this.prisma.category.create({
      data,
    });
  }

  async findAll() {
    const category = await this.prisma.category.findMany();

    if (category.length === 0) {
      throw new HttpException(' categories not found', 202);
    }
    return category;
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
