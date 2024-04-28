import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { HttpClient } from '@angular/common/http'; // Required for HTTP requests
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field'; // Provides <mat-form-field>
import { MatInputModule } from '@angular/material/input'; // Provides <input matInput>
import { MatSliderModule } from '@angular/material/slider'; // Provides <mat-slider>
import { MatButtonModule } from '@angular/material/button'; // Provides <button mat-raised-button>

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,             // Required for [(ngModel)]
    MatFormFieldModule,     // Provides <mat-form-field>
    MatInputModule,         // Provides <input matInput>
    MatSliderModule,        // Provides <mat-slider>
    MatButtonModule,
	HttpClientModule	// Provides <button mat-raised-button>
    //HttpClient              // Enables HTTP services
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Feedback App';
  feedback = {
    question1: '',
    question2: '',
    question3: '',
    rating1: 1,  // default rating initialization
    rating2: 1,
    rating3: 1
  };

  constructor(private http: HttpClient) {}

  submitFeedback(): void {
  this.http.post('http://localhost:3000/feedback', this.feedback).subscribe({
    next: (response) => {
      console.log('Feedback submitted successfully!', response);
      alert('Feedback submitted successfully!');
      // Reset the feedback form
      this.feedback = {
        question1: '',
        question2: '',
        question3: '',
        rating1: 1,  // Reset to default ratings
        rating2: 1,
        rating3: 1
      };
    },
    error: (error) => {
      console.error('Error submitting feedback!', error);
      alert('Error submitting feedback. Check the console for more information.');
    }
  });
}
}
