import { Injectable } from '@angular/core';
import { Server } from 'mock-socket';

@Injectable()
export class ToggleStore {
  connection: WebSocket;
  server: Server;
  isQuestionPage: boolean = true;

  constructor() {
    this.server = new Server('ws://localhost:8080/');
    this.connection = new WebSocket('ws://localhost:8080/');

    this.connection.onerror = () => {
      this.isQuestionPage = !this.isQuestionPage;
    };
  }

  sendRequest() {
    this.server.simulate('error');
  }

}
