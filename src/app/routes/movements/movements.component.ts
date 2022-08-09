import { Component } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { AlertService, UsersService } from "../../services"
import { FundsModalComponent } from "../../components"
import { Movements } from "../../models"

@Component({
	selector: "app-movements",
	templateUrl: "./movements.component.html",
	styleUrls: ["./movements.component.css"]
})
export class MovementsComponent {
	tableColumns = ["id", "funds", "date"]
	movements: Movements[]

	constructor(
		private dialog: MatDialog, 
		private usersService: UsersService, 
		private alertService: AlertService
	) {
		this.movements = []
		this.getMovements()
	}

	private getMovements = () => this.usersService.getMovements().subscribe({
		next: (movements) => this.movements = movements,
		error: error => this.alertService.error(error)
	})

	onAddFundsClick = () => this.dialog.open(FundsModalComponent, {
		panelClass: ["dialog-responsive"],
		data: { 
			title: "Add Funds", 
			onSave: this.onAddFunds
		},
	})

	private onAddFunds = (funds: number) => this.usersService.addFunds(funds).subscribe({
		next: ({ message }) => {
			this.alertService.error(message)
			this.getMovements()
		},
		error: (error) => this.alertService.error(error)
	})

	onRemoveFundsClick = () => this.dialog.open(FundsModalComponent, {
		panelClass: ["dialog-responsive"],
		data: {
			title: "Remove Funds", 
			onSave: this.onRemoveFunds
		}
	})

	private onRemoveFunds = (funds: number) => this.usersService.removeFunds(funds).subscribe({
		next: ({ message }) => {
			this.alertService.error(message)
			this.getMovements()
		},
		error: (error) => this.alertService.error(error)
	})
}
