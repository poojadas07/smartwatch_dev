import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }
  
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error.status == 401 || error.status == 403 || error.status == 404){
      throwError(error);
    }
    else if(!error.ok) {
      errMsg = 'Can\'t connect to server.';
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Promise.reject(errMsg);
  }

  fetchAllUsers(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'admin/findAllUsers?';

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchAllOperators(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findAllOperators?';

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchOperatorById(operatorId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findOperatorById?operatorId='+operatorId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addOperators(operatorName: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'country/createOperator?operatorName='+operatorName;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  fetchOperatorByName(operatorName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findOperatorByName?operatorName='+operatorName;

    // console.log(urlString)
    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateOperator(operatorId: String , operatorName: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'country/updateOperator?operatorId='+operatorId+'&operatorName='+operatorName;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  deleteOperator(operatorId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/deleteOperator?operatorId='+operatorId;

    console.log(urlString)
    return this.http.get(urlString)
    .pipe(
      catchError(this.handleError)
    );
  }

  fetchAllContries(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findAllCountries?';

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchContryById(countryId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findCountryById?countryId='+countryId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addCountries(countryName: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'country/createCountry?countryName='+countryName;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  fetchContryByName(countryName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findCountryByName?countryName='+countryName;

    // console.log(urlString)
    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateCountry(countryId: String , countryName: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'country/updateCountry?countryId='+countryId+'&countryName='+countryName;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  deleteCountry(countryId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/deleteCountry?countryId='+countryId;

    console.log(urlString)
    return this.http.get(urlString)
    .pipe(
      catchError(this.handleError)
    );
  }

  fetchAllRegions(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findAllRegions';

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchRegionById(regionId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findRegionById?regionId='+regionId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchRegionByCountryName(countryId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findRegionByCountry?countryId='+countryId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addRegions(countryId: string , regionName: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'country/createRegion?countryId='+countryId+'&regionName='+regionName;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  fetchRegionByName(regionName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findRegionByName?regionName='+regionName;

    // console.log(urlString)
    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateRegion(regionId: String ,countryId: String , regionName: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'country/updateRegion?regionId='+regionId+'&countryId='+countryId+'&regionName='+regionName;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  deleteRegion(regionId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/deleteRegion?regionId='+regionId;

    console.log(urlString)
    return this.http.get(urlString)
    .pipe(
      catchError(this.handleError)
    );
  }

  fetchAllLocations(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findAllLocations?';

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchLocationById(locationId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findLocationById?locationId='+locationId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addLocation(regionId: String , locationName: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'country/createLocation?regionId='+regionId+'&locationName='+locationName;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  fetchLocationByName(locationName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findLocationByName?locationName='+locationName;

    // console.log(urlString)
    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchLocationByRegionName(regionId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/findLocationByRegion?regionId='+regionId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateLocation(locationId: String , regionId: String , locationName: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'country/updateLocation?locationId='+locationId+'&regionId='+regionId+'&locationName='+locationName;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  deleteLocation(locationId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'country/deleteLocation?locationId='+locationId;

    console.log(urlString)
    return this.http.get(urlString)
    .pipe(
      catchError(this.handleError)
    );
  }

  fetchAllClients(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'dept/findAllClients?';

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchClientById(clientId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'dept/findClientById?clientId='+clientId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addClient(name: String , phoneNo: String , address: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'dept/createClient?name='+name+'&phoneNo='+phoneNo+'&address='+address;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  fetchClientByName(clientName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'dept/findClientByName?clientName='+clientName;

    // console.log(urlString)
    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateClient(clientId: String , name: String , phoneNo: String , address: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'dept/updateClient?clientId='+clientId+'&clientName='+name+'&clientPhone='+phoneNo+'&clientAddress='+address;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  deleteClient(clientId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'dept/deleteClient?clientId='+clientId;

    console.log(urlString)
    return this.http.get(urlString)
    .pipe(
      catchError(this.handleError)
    );
  }

  fetchAllDepartments(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'dept/findAllDepartments?';

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchDepartmentById(departmentId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'dept/findDepartmentById?departmentId='+departmentId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchDepartmentByClientLocation(clientId: String , locationId: String ): Observable<any> {
    let urlString = environment.serverBaseUrl + 'dept/findDepartmentByClientLocation?clientId='+clientId+'&locationId='+locationId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addDepartment(clientId: String , locationId: String , departmentName: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'dept/createDepartment?clientId='+clientId+'&locationId='+locationId+'&departmentName='+departmentName;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  fetchDepartmentByName(departmentName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'dept/findDepartmentByName?departmentName='+departmentName;

    // console.log(urlString)
    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateDepartment(departmentId: String , departmentName: String ): Observable<any>{
    let urlString = environment.serverBaseUrl + 'dept/updateDepartment?departmentId='+departmentId+'&departmentName='+departmentName;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  deleteDepartment(departmentId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'dept/deleteDepartment?departmentId='+departmentId;

    console.log(urlString)
    return this.http.get(urlString)
    .pipe(
      catchError(this.handleError)
    );
  }
    

  fetchAllScreens(): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/findAllScreens';

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchScreenById(screenId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/findScreenById?screenId='+screenId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  fetchScreenByDepartmentName(departmentId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/findScreenByDepartment?departmentId='+departmentId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  addScreens(screenName: string , departmentId	: String ,  rowNo : Number , colNo : Number): Observable<any>{
    let urlString = environment.serverBaseUrl + 'screen/createScreen?screenName='+screenName+'&departmentId	='+departmentId+'&rowNo='+rowNo+'&colNo='+colNo;
    ;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  fetchScreenByName(screenName: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/findScreenByName?screenName='+screenName;

    // console.log(urlString)
    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  updateScreen(screenId: String ,screenName: String , departmentId: String): Observable<any>{
    let urlString = environment.serverBaseUrl + 'screen/updateScreen?screenId='+screenId+'&screenName='+screenName+'&departmentId='+departmentId;

    return this.http.post(urlString, {})
    .pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  deleteScreen(screenId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/deleteScreen?screenId='+screenId;

    console.log(urlString)
    return this.http.get(urlString)
    .pipe(
      catchError(this.handleError)
    );
  }

  fetchPanelByScreen(screenId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/findPanelsByScreen?screenId='+screenId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }
  
  fetchPanelById(panelId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/findPanelById?panelId='+panelId;

    return this.http.get(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  pairPanelWithSensor(panelId: String , sensorId: String): Observable<any> {
    let urlString = environment.serverBaseUrl + 'screen/pairSenorIdWithPanel?panelId='+panelId+'&sensorId='+sensorId;

    return this.http.post(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

}
