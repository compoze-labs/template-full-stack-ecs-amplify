import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

export interface Thing {
  thingProperty: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/thing')
  thing(): Thing {
    return {
      thingProperty: 'thingValue'
    }
  }
}
