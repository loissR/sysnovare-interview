import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AuthService } from '../services'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private isAuthenticated: Boolean = false

    constructor(private authService: AuthService) {
        authService.auth.subscribe(item => this.isAuthenticated = Boolean(item))
    }

    intercept = (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            if (this.isAuthenticated && [401, 403].includes(error.status)) {
                this.authService.logout()
            }
            const errorMessage = error.error?.message || error.statusText
            console.log(errorMessage)
            return throwError(() => errorMessage)
        }))
    }
}