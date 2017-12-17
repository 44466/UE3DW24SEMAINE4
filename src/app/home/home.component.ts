import { Component, OnInit } from '@angular/core';
import {Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService:GameService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames()
      .subscribe(games => this.games = games.slice(1, 5));
  }
}
