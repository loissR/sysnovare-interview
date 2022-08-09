import { Injectable } from "@angular/core"
import { Router, CanActivate } from "@angular/router"
import { AuthService } from "../services"

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    private isAuthenticated = false

    constructor(private router: Router, private authService: AuthService) {
        this.authService.auth.subscribe(auth => this.isAuthenticated = Boolean(auth))
    }

    canActivate() {
        if (!this.isAuthenticated) {
            return true
        }
        this.router.navigate(["/"])
        return false
    }
}