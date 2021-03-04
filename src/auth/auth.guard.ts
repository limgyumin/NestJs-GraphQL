import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { verifyToken } from 'src/lib/token';

@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }
    ctx.user = this.validateToken(ctx.headers.authorization);
    return true;
  }

  public validateToken(auth: string): string {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('유효하지 않은 토큰', HttpStatus.UNAUTHORIZED);
    }

    const token = auth.split(' ')[1];

    try {
      return verifyToken(token) as string;
    } catch (error) {
      switch (error.message) {
        case 'INVALID_TOKEN':
        case 'TOKEN_IS_EMPTY':
        case 'NO_USER':
          throw new HttpException(
            '유효하지 않은 토큰.',
            HttpStatus.UNAUTHORIZED,
          );

        case 'EXPIRED_TOKEN':
          throw new HttpException('만료된 토큰.', HttpStatus.GONE);

        default:
          throw new HttpException(
            '서버 오류.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
