import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { LoginComponent, MovementsComponent } from "./routes"
import { NoAuthGuard, AuthGuard } from "./utils"

const routes: Routes = [
	{ path: "", component: MovementsComponent, canActivate: [NoAuthGuard] },
	{ path: "login", component: LoginComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: "" }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}