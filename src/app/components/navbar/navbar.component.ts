import { Component } from "@angular/core"
import { AuthService } from "../../services"

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
	user?: String
	
	constructor(private authService: AuthService) {
		authService.auth.subscribe(auth => this.user = auth?.userEmail)
	}

	onLogoutClick = () => {
		this.authService.logout()
	}
}
