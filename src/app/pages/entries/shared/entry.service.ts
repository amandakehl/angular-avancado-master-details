import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { CategoryService } from '../../categories/shared/category.service';

import { Entry } from './entry.model';

@Injectable({
    providedIn: 'root'
})
export class EntryService {

    private apiPath: string = 'https://p38yx781aa.execute-api.us-east-1.amazonaws.com/Stage/lancamentos';
    private userId: string = 'user_id=amanda_kehl';

    constructor(
        private http: HttpClient,
        private CategoryService: CategoryService) { }

    getAll(): Observable<Entry[]> {
        const url = `${this.apiPath}?${this.userId}`

        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntries)
        )
    }

    getById(id: string): Observable<Entry> {
        const url = `${this.apiPath}/${id}/?${this.userId}`

        return this.http.get(url).pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntry)
        )
    }

    create(entry: Entry): Observable<Entry> {
        entry.id = entry.name;

        return this.CategoryService.getById(entry.id).pipe(
            flatMap(category => {
                entry.category = category;

                return this.http.post(this.apiPath, entry).pipe(
                    catchError(this.handleError),
                    map(this.jsonDataToEntry)
                )
            })
        )
    }

    update(entry: Entry): Observable<Entry> {
        const url = `${this.apiPath}?${entry.id}/${entry.user_id}`;

        return this.CategoryService.getById(entry.id).pipe(
            flatMap(category => {
                entry.category = category;

                return this.http.post(url, entry).pipe(
                    catchError(this.handleError),
                    map(() => entry)
                )
            })
        )
    }

    delete(id: any): Observable<any> {
        const url = `${this.apiPath}?${this.userId}&id=${id}`;

        return this.http.delete(url).pipe(
            catchError(this.handleError),
            map(() => null)
        )
    }

    private jsonDataToEntries(jsonData: any[]): Entry[] {
        const entries: Entry[] = [];

        jsonData.forEach(element => {
            const entry = Object.assign(new Entry(), element);
            entries.push(entry);
        });
        return entries;
    }

    private jsonDataToEntry(jsonData: any): Entry {
        return Object.assign(new Entry(), jsonData);
    }

    private handleError(error: any): Observable<any> {
        console.log('Erro na requisição -> ', error)
        return throwError(error);
    }
}