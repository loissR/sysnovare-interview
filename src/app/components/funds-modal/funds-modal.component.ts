import { Component, Inject } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { AlertService } from "../../services"
import { FundsModalProps } from "../../models"

@Component({
	selector: "app-funds-modal",
	templateUrl: "./funds-modal.component.html",
	styleUrls: ["./funds-modal.component.css"]
})
export class FundsModalComponent {
	form: FormGroup
	title: String
	constructor(
		@Inject(MAT_DIALOG_DATA) private props: FundsModalProps,
		private dialogRef: MatDialogRef<FundsModalComponent>,
		private alertService: AlertService,
		formBuilder: FormBuilder
	) {
		this.title = props.title
		this.form = formBuilder.group({
			funds: ['', [Validators.required, Validators.min(0)]]
		})
	}
	onClose = () => {
		this.dialogRef.close()
	}
	onSubmit = () => {
		if (this.form.invalid) {
			this.alertService.error("Invalid Inputs")
		}
		else {
			this.props.onSave(this.form.value.funds)
			this.onClose()
		}
	}
}
