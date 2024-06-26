import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcryptjs'
import { UpdateUserInput } from './dto/update-user.input';
import { error } from 'console';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}
    async findAll():Promise<User[]>{
        return this.userRepository.find()
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where:{username} });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where:{email} });
    }
    
    async create(createUserInput: CreateUserInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
        const user = this.userRepository.create({ ...createUserInput, password: hashedPassword });
        return this.userRepository.save(user);
    }
    async update(updateUserInput:UpdateUserInput):Promise<User>{
        try {
            const userToUpdate=await this.userRepository.findOne({where:{id:updateUserInput.id}});
            if(!userToUpdate){
                throw new error(`User with ID ${updateUserInput.id} not found`)
            }
            userToUpdate.username=updateUserInput.username;
            userToUpdate.email=updateUserInput.email;
            const updateUser=await this.userRepository.save(userToUpdate);
            return updateUser;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }
}


    