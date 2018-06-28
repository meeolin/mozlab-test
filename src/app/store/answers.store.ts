import { Injectable } from '@angular/core';

@Injectable()
export class AnswersStore {
  answers: Array<any> = [];

  save(text): boolean {
    const isExist = this.answers.some((answer) => answer.text === text.trim());
    if (!isExist) {
      this.answers.push({text: text.trim(), vote: 0});
      this.saveToStorage();
    }
    return !isExist;
  }

  vote(answer, value) {
    answer.vote = value;
    this.saveToStorage();
  }

  readFromStorage() {
    if (localStorage.getItem('answers')) {
      this.answers = JSON.parse(localStorage.getItem('answers'));
    }
  }

  clearStorage() {
    this.answers = [];
  }

  private saveToStorage() {
    localStorage.setItem('answers', JSON.stringify(this.answers));
  }
}
