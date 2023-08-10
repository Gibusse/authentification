import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Authentification';

  public onActivate() {
    return true;
  }

  public onDeactivate() {
    return false;
  }
}
