import { Injectable } from "@angular/core"
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http"
import { Observable } from "rxjs"
import { AuthService } from "../services"

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private jsonWebToken?: string

    constructor(authService: AuthService) {
        authService.auth.subscribe(item => this.jsonWebToken = item?.jwt)
    }

    intercept = (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
        if (this.jsonWebToken) {
            request = request.clone({
                headers: request.headers.append("Authorization", this.jsonWebToken)
            })
        }
        return next.handle(request)
    }
}