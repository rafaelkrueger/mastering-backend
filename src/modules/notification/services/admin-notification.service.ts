import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';
import { UserService } from 'src/modules/user/services';
import { AdminMessages } from '../interfaces/admin-messages';

@Injectable()
export class AdminNotificationService {
  constructor(private readonly userService: UserService) {}

  @Cron('0 0 * * *')
  async keepCreatingContent() {
    const teachers = await this.userService.findTeachers()
    for (const teacher of teachers) {
        await this.sendEmail(teacher.email,
            'Continue em frente!',
            AdminMessages.TRY);
    }
  }

  private async sendEmail(
    userEmail: string,
    title: string,
    description: string,
  ) {
    const transporter = await nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: 'krueger01@outlook.com.br',
        pass: 'Vidanormal@01',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: 'krueger01@outlook.com.br',
      to: userEmail,
      subject: title,
      text: description,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
}
