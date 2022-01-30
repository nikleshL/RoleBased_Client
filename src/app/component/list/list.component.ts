import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CharacterModel } from '../../model/dashboardModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private ref: ChangeDetectorRef) { }

  @Input() characterList: Array<CharacterModel>;
  @Input() groupFilters: any;
  public filteredCharacters: Array<CharacterModel> = [];

  ngOnInit() {
    this.filteredCharacters = this.characterList;
  }

  ngOnChanges(): void {
    if (this.groupFilters) {
      this.filterList(this.groupFilters, this.characterList);
    }
  }

  filterList(filters: any, characters: any) {
    this.filteredCharacters = this.characterList;
    const keys = Object.keys(filters);
    const filteredCharacter = this.characterList.filter((character) => {
      let result = keys.map(key => {
        if (character[key]) {
          return character[key].toLowerCase() === filters[key].toLowerCase();
        } else {
          return false;
        }
      });
      result = result.filter(it => it !== undefined);
      return result.reduce((acc, cur: any) => { return acc & cur }, 1);
    });
    this.filteredCharacters = filteredCharacter;
  }

}
