import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import {Game } from './game';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GameService {

  private gamesUrl = 'api/games';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getGames (): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl)
      .pipe(
        tap(games => this.log(`fetched games`)),
        catchError(this.handleError('getGames', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getGameNo404<Data>(id: number): Observable<Game> {
    const url = `${this.gamesUrl}/?id=${id}`;
    return this.http.get<Game[]>(url)
      .pipe(
        map(games => games[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} game id=${id}`);
        }),
        catchError(this.handleError<Game>(`getGame id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getGame(id: number): Observable<Game> {
    const url = `${this.gamesUrl}/${id}`;
    return this.http.get<Game>(url).pipe(
      tap(_ => this.log(`fetched game id=${id}`)),
      catchError(this.handleError<Game>(`getGame id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchGames(term: string): Observable<Game[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Game[]>(`api/games/?name=${term}`).pipe(
      tap(_ => this.log(`found games matching "${term}"`)),
      catchError(this.handleError<Game[]>('searchGames', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addGame (game: Game): Observable<Game> {
    return this.http.post<Game>(this.gamesUrl, game, httpOptions).pipe(
      tap((game: Game) => this.log(`added game w/ id=${game.id}`)),
      catchError(this.handleError<Game>('addGame'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteGame (game: Game | number): Observable<Game> {
    const id = typeof game === 'number' ? game : game.id;
    const url = `${this.gamesUrl}/${id}`;

    return this.http.delete<Game>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted game id=${id}`)),
      catchError(this.handleError<Game>('deleteGame'))
    );
  }

  /** PUT: update the hero on the server */
  updateGame (game: Game): Observable<any> {
    return this.http.put(this.gamesUrl, game, httpOptions).pipe(
      tap(_ => this.log(`updated game id=${game.id}`)),
      catchError(this.handleError<any>('updateGame'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('GameService: ' + message);
  }
}
