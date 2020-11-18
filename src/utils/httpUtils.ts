import { HttpHeaders } from '@angular/common/http';
import * as auth from './authenticationUtils';

export function getHttpHeaders() : HttpHeaders {
    var accessToken = auth.getAccessToken();
    return new HttpHeaders().set('Authorization', 'Bearer ' + accessToken );
}

