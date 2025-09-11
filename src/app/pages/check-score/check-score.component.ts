import { Component } from '@angular/core';
import { LoanRequest } from 'src/app/entities/loan-request.entity';
import { LoanRequestService } from 'src/app/services/loan-request.service';
import { ScoringService } from 'src/app/services/scoring.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-check-score',
  templateUrl: './check-score.component.html',
  styleUrls: ['./check-score.component.scss']
})
export class CheckScoreComponent {

  role: 'CLIENT' | 'BANQUIER' = 'BANQUIER';

  /* result fields */
  score = 0;
  riskLabel = '';
  riskColor = '';
  scoreCalculated = false;
  isLoading = false;

  /* current loan to score */
  private loan: LoanRequest;

  constructor(
    private scoringService: ScoringService,
    private sharedService: SharedService
  ) {
    /* grab the loan we want to score */
    this.loan = this.sharedService.getLoanRequest(); // or however you store it
  }

  calculateScore(): void {
    if (!this.loan) { return; }
    this.isLoading = true;

    this.scoringService.calculateCustomerScore(this.loan)
      .subscribe({
        next: res => {
          this.score = res.score;
          this.riskLabel = res.riskLabel;
          this.riskColor = res.riskColor;
          this.scoreCalculated = true;
          this.isLoading = false;
        },
        error: err => {
          console.error(err);
          this.isLoading = false;
        }
      });
  }
  nextStep(){
    
  }

}
