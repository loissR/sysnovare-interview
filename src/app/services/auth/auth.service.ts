import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { HttpClient } from "@angular/common/http"
import { ReplaySubject, map } from "rxjs"
import { Auth, UserCredentials, LoginResponse } from "../../models"

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private authSubject
    public auth

	constructor(private httpClient: HttpClient, private router: Router) {
		this.authSubject = new ReplaySubject<Auth | null>()
        this.auth = this.authSubject.asObservable()
	}

	login = (credentials: UserCredentials) => {
		const { email, password } = credentials
		const authorization = window.btoa(`${email}:${password}`)
		const request = this.httpClient.post<LoginResponse>("/api/login", null, {
			headers: {
				"Authorization": `Basic ${authorization}`
			}
		})
		return request.pipe(map((user) => {
			this.authSubject.next({ userEmail: email, jwt: user.token })
            return user
		}))
	}
	
	logout = () => {
		this.authSubject.next(null)
		this.router.navigate(["/login"])
	}
}
