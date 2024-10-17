import { Controller, Get, Render, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FormDataDto } from './formDataDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('foglalas')
  @Render('reserveForm')
  reserveForm() {
    return {formData: {}, errors: []};
  }

  @Post('foglalas')
  @Render('reserveForm')
  async validateData(@Body() data: FormDataDto, @Res() res) {
    const response = await this.appService.validate(data);
    if (response.result) {
      res.redirect('completedReserve')
    }
    return {formData: data, errors: response.errors };
  }

  @Get('completedReserve')
  @Render('completedReserve')
  completedReserve() {
    return {};
  }
}
