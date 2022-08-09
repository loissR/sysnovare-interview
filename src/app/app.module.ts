import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations" 
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { ReactiveFormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatTableModule } from "@angular/material/table"
import { MatDialogModule } from "@angular/material/dialog"
import { MatMenuModule } from "@angular/material/menu"
import { MatSnackBarModule } from "@angular/material/snack-bar"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { LoginComponent, MovementsComponent } from "./routes"
import { NavbarComponent, FundsModalComponent } from "./components"
import { JwtInterceptor, ErrorInterceptor } from "./utils"

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
  		LoginComponent,
    	MovementsComponent,
     	FundsModalComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatCardModule,
		MatFormFieldModule, 
		MatInputModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatIconModule,
		MatTableModule,
		MatDialogModule,
		ReactiveFormsModule,
		HttpClientModule,
		MatMenuModule,
		MatSnackBarModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
