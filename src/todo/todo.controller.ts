// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { ApiResponse } from '@app/common/response/api-response';
// import { CommonSuccessCode } from '@app/common/exception/common-success-code';
// import { Public } from '@app/common/decorators/public.decorator';

// @Controller('todos')
// export class TodoController {

//     // constructor(private readOnly todoService: TodoService) {}

//     @Post()
//     async create(){
//         // await this.todoService.create();
//         return ApiResponse.onSuccess(
//       '약속을 생성했습니다.',
//       CommonSuccessCode.CREATED,
//     );
//     }

// }