import { Component, OnInit } from '@angular/core';
import { CharacterModel } from '../../model/dashboardModel';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private appService: AppService, private authenticationService: AuthenticationService) { }
  public showLoader = true;
  public characterList: Array<CharacterModel> = [];
  public filterData: any = {};
  filters: any;
  isAuthorised = true;

  ngOnInit() {
    this.getFilterList();
    this.getCharacterList();
  }

  public getCharacterList() {
    const endpoint = '/api/getCharacterList';
    const user = this.authenticationService.userValue;
    const body = {
      user : {
        role : user.role
      }
    };
    this.appService.post(endpoint, body).subscribe((response: any) => {
      if (response != null && response.status === 'Success') {
        response.data.docs.forEach(element => {
          this.createCharacterList(element);
          this.addDataToFilter(element);
        });
        this.showLoader = false;
      }
    }, (err) => {
      this.isAuthorised = false;
      this.showLoader = false;
    });
  }

  public getFilterList() {
    this.filterData.name = [];
    this.filterData.hair = [];
    this.filterData.gender = [];
    this.filterData.race = [];
  }

  public createCharacterList(element) {
    const character = new CharacterModel();
    character._id = element._id;
    character.height = element.height;
    character.race = element.race;
    character.gender = element.gender;
    character.birth = element.birth;
    character.spouse = element.spouse;
    character.death = element.death;
    character.realm = element.realm;
    character.hair = element.hair;
    character.name = element.name;
    character.wikiUrl = element.wikiUrl;
    this.characterList.push(character);
  }

  public addDataToFilter(element) {
    if (element.name !== '' && this.filterData.name.indexOf(element.name) < 0) {
      this.filterData.name.push(element.name);
    }
    if (element.hair !== '' && this.filterData.hair.indexOf(element.hair) < 0) {
      this.filterData.hair.push(element.hair);
    }
    if (element.gender !== '' && this.filterData.gender.indexOf(element.gender) < 0) {
      this.filterData.gender.push(element.gender);
    }
    if (element.race !== '' && this.filterData.race.indexOf(element.race) < 0) {
      this.filterData.race.push(element.race);
    }
  }
}
