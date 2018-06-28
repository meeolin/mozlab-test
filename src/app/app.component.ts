import { Component, HostListener } from '@angular/core';
import { ToggleStore } from './store/toggle.store';
import { AnswersStore } from './store/answers.store';

@Component({
  selector: 'app',
  templateUrl: './app.pug',
})
export class AppComponent {

  constructor(private toggleStorage: ToggleStore,
              private answerStorage: AnswersStore) {
    this.answerStorage.readFromStorage();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyUp(event) {
    if (event.keyCode === 32 && event.target.type !== 'textarea' && this.answers.length) {
      this.toggleStorage.sendRequest();
    }
  }

  clear() {
    this.answerStorage.clearStorage();
  }

  get isQuestionPage(): boolean {
    return this.toggleStorage.isQuestionPage;
  }

  get answers() {
    return this.answerStorage.answers;
  }
}
