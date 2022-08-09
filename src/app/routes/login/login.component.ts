import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { AlertService, AuthService } from "../../services"

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent {
	form: FormGroup
	showPassword = false

	constructor(
		private router: Router,
		private authService: AuthService, 
		private alertService: AlertService,
		formBuilder: FormBuilder
	) {
		this.form = formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(12)]]
        })
	}

	onShowPassword = () => this.showPassword = !this.showPassword
	
	onSubmit = () => {
        if (this.form.invalid) {
			this.alertService.error("Invalid Inputs")
        }
		else {
			const credentials = this.form.value
			this.authService.login(credentials).subscribe({
				next: () => this.router.navigate(["/"]),
                error: (error) => this.alertService.error(error)
			})
		}
	}
}
