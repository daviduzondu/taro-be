import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { omit } from '../utils/omit';

@Injectable()
export class ExcludeInterceptor implements NestInterceptor {
  constructor(
    private readonly excludeList: string[] = [],
    private readonly overrideDefaultList: boolean = false,
  ) {}

  private excludeField(obj: object) {
    return omit(
      obj,
      this.excludeList.concat(
        this.overrideDefaultList ? [] : ['password', 'createdAt', 'updatedAt'],
      ),
    );
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((jsonResponse) =>
        Object.assign(jsonResponse, {
          ...jsonResponse,
          data: Array.isArray(jsonResponse.data)
            ? jsonResponse.data.map((entry: object) => this.excludeField(entry))
            : this.excludeField(jsonResponse.data),
        }),
      ),
    );
  }
}
