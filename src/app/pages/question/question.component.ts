import { Component } from '@angular/core';
import { AnswersStore } from '../../store/answers.store';

@Component({
  selector: 'question',
  templateUrl: './question.component.pug',
  styleUrls: ['./question.scss'],
})
export class QuestionComponent {
  answerForSave: string = '';
  error: string = '';

  constructor(private answerStorage: AnswersStore) {}

  saveAnswer() {
    if (this.answerStorage.save(this.answerForSave)) {
      this.answerForSave = '';
      this.error = '';
    } else {
      this.error = 'Такой ответ уже существует';
    }
  }

  handleAnswerChange() {
    this.error = '';
  }

  get answers() {
    return this.answerStorage.answers;
  }
}
