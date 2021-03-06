import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // Properties
  readonly rootUrl = 'https://localhost:44393/';
  qns!: any[];
  seconds!: number;
  timer!:any;
  qnProgress!: number;
  correctAnswersCount: number = 0;

  // Helper methods
  constructor(private http: HttpClient) { }

  displayTimeElasped() {
    return (Math.floor(this.seconds/3600).toLocaleString(undefined,{minimumIntegerDigits: 2})) + ':' + (Math.floor(this.seconds/60).toLocaleString(undefined,{minimumIntegerDigits: 2}))+ ':' + (Math.floor(this.seconds % 60).toLocaleString(undefined,{minimumIntegerDigits: 2}));
  }

  getParticipantName() {
    var participant: any = JSON.stringify(localStorage.getItem('participant'));
    return participant.Name;
  }

  // Http Methods
  insertParticipant(name: string, email: string) {
    var body = {
      Name: name,
      Email: email
    }
    return this.http.post(this.rootUrl + '/api/InsertParticipant', body);
  }

  getQuestions() {
    return this.http.get(this.rootUrl + '/api/Questions');
  }

  getAnswers() {
    var body = this.qns.map(x => x.QnId);
    return this.http.post(this.rootUrl + '/api/answers', body);
  }

  submitScore() {
    var body: any = JSON.stringify(localStorage.getItem('participant'));
    body.Score = this.correctAnswersCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + "/api/UpdateOutput", body);
  }

}
