import { Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { QuizComponent } from "./quiz/quiz.component";
import { RegisterComponent } from "./register/register.component";
import { ResultComponent } from "./result/result.component";

export const appRoutes : Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'quiz', component: QuizComponent, canActivate:[AuthGuard]},
    {path: 'result', component:ResultComponent, canActivate:[AuthGuard]},
    {path: '', redirectTo: '\register', pathMatch: 'full'}
]