import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = Number(process.env.PORT || 3001)
  app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  await app.listen(port)
  console.log(`Backend running on port ${port}`)
}

bootstrap()
