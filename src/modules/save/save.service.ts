import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaveDto } from './dto/create-save.dto';
import { UpdateSaveDto } from './dto/update-save.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Save } from './entities/save.entity';
import { Post } from '../posts/entities/post.entity';

@Injectable()
export class SaveService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Save) private saveRepository: Repository<Save>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  //----------------------------Create Save-------------------------------------

  async SavePost(createSave: CreateSaveDto, userid: number) {
    const user = await this.userRepository.findOne({ where: { id: userid } });
    const post = await this.postRepository.findOne({
      where: { id: createSave.post_id },
    });

    // check if is not exsited
    if (!user) throw new NotFoundException('user not found');
    if (!post) throw new NotFoundException('Post not found');

    const savePost = new Save();
    savePost.post = post;
    savePost.user = user;

    //check post if user already save post
    await this.CheckSavePostExited(user, post);
    console.log('-------------------SavePost-------------------');
    console.log(user, post);

    await this.saveRepository.save(savePost);
    return {
      message: `post is saved`,
      statusCode: HttpStatus.OK,
    };
  }

  async CheckSavePostExited(userid: any, post_id: any) {
    console.log('-------------------Check Save Post-------------------');
    console.log(userid, post_id);

    const userSave = await this.saveRepository.findOne({
      where: { user: userid },
    });
    const postSave = await this.saveRepository.findOne({
      where: { post: post_id },
    });

    if (userSave && postSave)
      throw new BadRequestException('User already saved post');
  }

  //----------------------------Delete Save-------------------------------------
  async deletePost(saveDto: CreateSaveDto, userid: number, save_id: number) {
    const user = await this.userRepository.findOne({
      where: { id: userid },
      relations: { save: true },
    });
    const post = await this.postRepository.findOne({
      where: { id: saveDto.post_id },
      relations: { save: true },
    });

    // check if is not exsited
    if (!user) throw new NotFoundException('user not found');
    if (!post) throw new NotFoundException('Post not found');

    console.log('--------delete post---------');

    console.log(user, post, save_id);

    if (user.save == post.save) {
      await this.saveRepository.delete(save_id);
    } else throw new ForbiddenException('This Post your is Not Save.');
  }

  //--------------- Saved By User ----------------------------
  async getAllSave(userid:number) {
    const user = await this.userRepository.findOne({where:{id:userid}});
    return await this.saveRepository.findOne({where:{user:user}});
  }
}
