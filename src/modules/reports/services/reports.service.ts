import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReportDto } from '../dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // async CreateReport(createReportDto: CreateReportDto) {
  //   const existedPost = this.postBoolean(
  //     createReportDto.post_id,
  //     createReportDto.reporter_id,
  //   );
  //   try {
  //     if (existedPost) {
  //       const report = new Report();
  //       report.report_status = createReportDto.report_status;
  //       report.user = await this.userRepository.findOne({
  //         where: { id: createReportDto.reporter_id },
  //       });
  //       report.post = await this.postRepository.findOne({
  //         where: { id: createReportDto.post_id },
  //       });
  //       await this.reportRepository.save(report);
  //     }

  //     if (!existedPost) throw Error;
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.INTERNAL_SERVER_ERROR,
  //         message: 'something wnet worng.',
  //       },
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
  // async postBoolean(reporter_id: any, post_id: any): Promise<Boolean> {
  //   const isUser = await this.userRepository.findOne({
  //     where: { id: reporter_id },
  //   });
  //   if (!isUser) return false;
  //   if (isUser) {
  //     const isPost = await this.postRepository.findOne({
  //       where: { id: post_id },
  //     });
  //     if (isPost) return true;
  //     if (!isPost) return false;
  //   }
  //   return true;
  // }

  //report
  async reportPost(createReportDto: CreateReportDto ,reporter_id:number) {

    const report = new Report();
    //find post
    const post = await this.postRepository.findOne({
      where: { id: createReportDto.post_id },
    });
    if (!post) throw new NotFoundException('Post not found');

    //
    report.user = await this.userRepository.findOne({
      where: { id: reporter_id },
    });
    
    report.report_status = createReportDto.report_status;

    await this.reportRepository.save(report);
    return {
      message: 'you reported the post ',
      statusCode: HttpStatus.OK,
    };
  }
  //

  async getReport(){
    return await this.reportRepository.find();
  }

  //countPost when loop count in database
  //post_id to find and delete in datebase
  //report status count  when got delete post , reportStatusCount is the type of report almost

  //  async deleteByReport(reportStatusCount:string, countPost:number, postId: number ){
  //   if(countPost === 30){
  //     await this.postRepository.delete(postId);
  //     return{
  //       message:'Your post is reported and reach to delele',
  //       reportStatus:reportStatusCount
  //     }
  //   }
  //   else if(countPost === 20 ){
  //     return{
  //       message: 'Something went wrong with post, Please check your post'
  //     }
  //   }
  //  }
}
