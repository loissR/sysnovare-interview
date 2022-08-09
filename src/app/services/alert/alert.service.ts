import { Injectable } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable({
	providedIn: "root"
})
export class AlertService {

	constructor(private snackBar: MatSnackBar) {}

	error = (message: string) => {
		this.snackBar.open(message, "Close", {
			duration: 2500
		})
	}

}
