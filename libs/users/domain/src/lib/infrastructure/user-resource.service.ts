import { Injectable } from '@angular/core';
import { NetworkingService } from '@elektro-braun/shared/util-networking';
import { Observable } from 'rxjs';
import { User } from '../entities/user';
import { map } from 'rxjs/operators';
import { USER_PATH } from '../users-domain.api';
import { CreateUserPayload } from '../entities/create-user-payload';

@Injectable({ providedIn: 'root' })
export class UserResourceService {
  constructor(private http: NetworkingService) {}

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(USER_PATH).pipe(
      map(users => users.data)
    );
  }

  createUser(user: CreateUserPayload): Observable<User> {
    return this.http.post<User, CreateUserPayload>(USER_PATH, user).pipe(
      map(response => response.data)
    )
  }
}
