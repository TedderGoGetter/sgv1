import {Test} from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import * as pactum from 'pactum'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from '../src/prisma/prisma.service'
import { AuthDto } from 'src/auth/dto'

describe ('App e2e', () => {
  let app: INestApplication 
  let prisma: PrismaService
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
    await app.listen(3333)  //This starts the server and it will listen to port 3333
    pactum.request.setBaseUrl('http://localhost:3333')

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
  })

  afterAll(() => app.close) //ending logic

  // it.todo('should pass') - Logic dor letting test pass by default.
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'ted@mail.com',
      password: '123',
    }

    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)        
      })

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)        
      })

      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400)        
      })

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
      })
    })

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)

      })

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)        
      })

      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400)        
      })

      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAccessToken', 'access_token')  
          // .inspect() 
      })
    })
  })

  describe('User', () => {
    describe('Get User', () => {
      it('should get current user', () => {
        return pactum
        .spec()
        .get('/users/me')
        .withHeaders ({
          Authorization: 'Bearer $S{userAccessToken}',  //the S is for Store
        })
        .expectStatus(200)
        .inspect()
      })
    })

    describe('Edit User', () => {})
  })

  describe('Inst', () => {
    describe('Create Inst', () => {})

    describe('Get Inst', () => {
    })
  })
})