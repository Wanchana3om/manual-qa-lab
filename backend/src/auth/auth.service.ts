import { Injectable, UnauthorizedException } from '@nestjs/common'
import { mockUsers } from '../common/mock-db'

@Injectable()
export class AuthService {
  login(username: string, password: string) {
    const user = mockUsers.find(item => item.username === username && item.password === password)

    if (!user) {
      throw new UnauthorizedException('Invalid username or password')
    }

    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      token: `mock-token-${user.id}`
    }
  }
}
