import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(public quizService: QuizService, private route: Router) { }

  ngOnInit(): void {

    this.quizService.seconds = 0;
    this.quizService.qnProgress = 0;

    this.quizService.getQuestions().subscribe(
      (data: any) => {
        this.quizService.qns = data;
        this.startTimer();
      }
    );
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
    }, 1000);
  }

  Answer(qID:any, choice:any) {
    this.quizService.qns[this.quizService.qnProgress].answer = choice;
    this.quizService.qnProgress++;

    if(this.quizService.qnProgress == 10) {
      clearInterval(this.quizService.timer);
      this.route.navigate(['/result']);
    }
  }
}
