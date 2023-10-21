import {Test} from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'

describe ('App e2e', () => {
  let app: INestApplication 
  beforeAll(async () => {  //starting logic

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    // this is where you simulate main.ts:
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }));
    await app.init()
  })

  afterAll(() => app.close) //ending logic

  it.todo('should pass')
})