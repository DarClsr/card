import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res,
  Sse,
  Query,
  MessageEvent
} from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Response } from 'express';
import { ReadStream } from 'fs';
import {interval,Observable} from "rxjs"
import { Stream, Readable, Writable } from 'stream';
import { AppService } from './app.service';
import { map } from 'rxjs/operators';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('open/word')
  async getText(@Query() query, @Res() res:Response) {
    const { word = '你好',parentMessageId="",conversationId } = query;
    console.log(query)
    if (!word) {
      throw new BadRequestException('文字不能为空');
    }
    // res.setHeader('Content-Type', 'text/plain');
    // res.setHeader('Transfer-Encoding', 'chunked');

    this.appService.getGptText({
      word,
      parentMessageId,
      conversationId,
      callback(text){
        res.write(`${text}`);
      }
    }).then((data)=>{
      res.end(JSON.stringify(data));
    })
    // stream.pipe(res);
    // const readstream = new Readable(); 
    // readstream.push("111")
    // await this.appService.getText(word,readstream)
    // readstream.push(null)
    // readstream.pipe(res)
  }

  @Get('/stream')
  stream(@Res() res){
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Transfer-Encoding', 'chunked');

    this.appService.getGptText({
      word:"你好",
      parentMessageId:"",
      conversationId:"",
      callback(text){
        res.write(`${text}`);
      }
    }).then((data)=>{
      res.end(JSON.stringify(data));
    })

  }
}
