import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { HomeController, ErrorController } from './home.controller';

@Module({
    modules: [],
    controllers: [ HomeController, ErrorController ],
    components: []
})

export class HomeModule {}
