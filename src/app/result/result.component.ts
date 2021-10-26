import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(public quizService: QuizService, private route: Router) { }

  ngOnInit(): void {
    this.quizService.getAnswers().subscribe(
      (data: any) => {
        this.quizService.correctAnswersCount = 0;
        this.quizService.qns.forEach((e,i) => {
          if(e.answer == data[i]){
            this.quizService.correctAnswersCount++;
            e.correct = data[i];
          }
        })
      }
    )
  }

  OnSubmit() {
    this.quizService.submitScore().subscribe(() => {
      this.restart();
    })
  }

  restart() {
    this.route.navigate(['/quiz']);
  }
}
