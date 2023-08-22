import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { BehaviorSubject, map } from "rxjs";

@Injectable()

export class DataHandlerService {

    baseUrl = "https://ea-19-task-5-default-rtdb.asia-southeast1.firebasedatabase.app/clients.json";
    leaveUrl = "https://ea-19-task-5-default-rtdb.asia-southeast1.firebasedatabase.app/leaveApplication.json"

    uId: any;

    leaveBehaviorSub : BehaviorSubject<any> = new BehaviorSubject("Done");
    isloggedIn : boolean = false;

    constructor(private http: HttpClient) { }

    checkAuthentication(){
        return new Promise(( resolve ) => {
            setTimeout(() => {
                let getLsId = localStorage.getItem('loggedIn')
                resolve( this.loggedIn || getLsId == 'true' )
            }, 2000);
        })
    }

    loggedIn(){
        this.isloggedIn = true;
        localStorage.setItem("loggedId", 'true')
    }

    loggedOut(){
        this.isloggedIn = false;
        localStorage.clear();
    }

    postClients(obj: any) {
        return this.http.post(this.baseUrl, obj)
    }

    getClients() {
        return this.http.get(this.baseUrl, {
            headers: new HttpHeaders({
                'name': 'Kulsum',
            }),
        }).pipe(map((rawData: any) => {
            let arr = [];
            for (let data in rawData) {
                arr.push({ ...rawData[data], id: data })
            }
            return arr;
        }))
    }

    getId(id: any) {
        console.log(id);
        this.uId = id
    }

    postLeave(obj: any) {
        return this.http.post(this.leaveUrl, obj)
    }

    getLeaves() {
        return this.http.get(this.leaveUrl, {
            headers: new HttpHeaders({
                'name': 'Kulsum'
            })
        }).pipe(map(( rawData : any ) => {
            let leaveArray = [];
            for(let data in rawData){
                leaveArray.push({...rawData[data],id:data})
            }
            this.leaveBehaviorSub.next(leaveArray);
            return leaveArray;
        }))
    }

    approved( obj:any, id:any ){
        let updatedUrl = `https://ea-19-task-5-default-rtdb.asia-southeast1.firebasedatabase.app/leaveApplication/${id}.json`;
        console.log(this.uId);
        return this.http.patch(updatedUrl, {status : obj})
    }
}