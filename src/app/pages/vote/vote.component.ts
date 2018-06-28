import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { AnswersStore } from '../../store/answers.store';

@Component({
  selector: 'vote',
  templateUrl: './vote.component.pug',
  styleUrls: ['./vote.scss'],
})
export class VoteComponent {

  constructor(private answerStorage: AnswersStore,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('../img/thumbs-up.svg'));
    iconRegistry.addSvgIcon(
      'thumbs-down',
      sanitizer.bypassSecurityTrustResourceUrl('../img/thumbs-down.svg'));
  }

  vote(answer, value) {
    if (!answer.vote) {
      this.answerStorage.vote(answer, value);
    }
  }

  get answers() {
    return this.answerStorage.answers;
  }
}
