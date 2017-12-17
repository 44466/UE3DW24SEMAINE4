import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const games = [
      { id: 11, name: 'Hand of Fate' },
      { id: 12, name: 'Star Wars Battlefront II' },
      { id: 13, name: 'Outcast: Second Contact' },
      { id: 14, name: 'watch-dogs-2-jeux-2017' },
      { id: 15, name: 'Horizon Zero Dawn' },
      { id: 16, name: 'Resident Evil 7: Biohazard' },
      { id: 17, name: 'Destiny 2' },
      { id: 18, name: 'Uncharted: The Lost Legacy' },
      { id: 19, name: 'Injustice 2' },
      { id: 20, name: 'Call of Duty: WWII' }
    ];
    return {games};
  }
}
