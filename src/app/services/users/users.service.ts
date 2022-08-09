import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { map } from "rxjs"
import { FundsResponse, GetMovementsResponse } from "../../models"

@Injectable({
	providedIn: "root"
})
export class UsersService {
	
	constructor(private httpClient: HttpClient) {}

	getMovements = () => {
		const request = this.httpClient.get<GetMovementsResponse>("/api/movements")
		return request.pipe(map(({ movements }) =>  movements))
	}

	addFunds = (funds: number) => this.httpClient.put<FundsResponse>("/api/funds", { funds })

	removeFunds = (funds: number) => this.httpClient.delete<FundsResponse>("/api/funds", { 
		body: { funds } 
	})
}
