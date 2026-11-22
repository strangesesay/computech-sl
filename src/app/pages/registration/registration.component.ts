import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly formspreeEndpoint = 'https://formspree.io/f/xgaknedk';
  private readonly googleFormEndpoint = 'https://docs.google.com/forms/d/e/1FAIpQLSdutkZ6xR6HUWXaHXGNW3LUTEULgY24FleoT2v28UrsB09h9w/formResponse';
  private readonly googleEntryIds = {
    fullName: 'entry.1314528960',
    email: 'entry.1852373807',
    phone: 'entry.1685425226',
    course: 'entry.795032060',
    preferredSchedule: 'entry.1302077798',
    message: 'entry.211324843'
  };
  private readonly googleCourseValues: Record<string, string> = {
    'Microsoft Office Suite': 'Microsoft Office Package',
    'Computer Fundamentals': 'Computer Fundamentals',
    'Internet & Digital Skills': 'Internet & Digital Skills',
    'AI & Prompt Engineering': 'AI & PROMPT ENGINEERING FOR EVERYDAY WOR AND CODING',
    'Google Workspace': 'Google Workspace',
    'Not sure yet': 'Not Sure'
  };

  registrationForm = this.formBuilder.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    course: ['', Validators.required],
    preferredSchedule: [''],
    message: ['']
  });

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  async submitRegistration(): Promise<void> {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formData = new FormData();
    const values = this.registrationForm.getRawValue();
    Object.entries(values).forEach(([name, value]) => formData.append(name, value));
    formData.append('_subject', `Course registration: ${values.course}`);

    try {
      const response = await fetch(this.formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });

      if (!response.ok) {
        this.errorMessage = `Registration could not be submitted (error ${response.status}). Please try again or contact COMPUTECH.`;
        return;
      }

      const googleCourse = this.googleCourseValues[values.course];
      if (!googleCourse) {
        this.successMessage = 'Your registration was sent to COMPUTECH. This course is not currently listed in the Google Form, so it was not copied there.';
        this.resetForm();
        return;
      }

      const googleFormData = new FormData();
      googleFormData.append(this.googleEntryIds.fullName, values.fullName);
      googleFormData.append(this.googleEntryIds.email, values.email);
      googleFormData.append(this.googleEntryIds.phone, values.phone);
      googleFormData.append(this.googleEntryIds.course, googleCourse);
      googleFormData.append(this.googleEntryIds.preferredSchedule, values.preferredSchedule);
      googleFormData.append(this.googleEntryIds.message, values.message);
      googleFormData.append('fvv', '1');
      googleFormData.append('pageHistory', '0');

      try {
        await fetch(this.googleFormEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          body: googleFormData
        });
        this.successMessage = 'Thank you. Your registration was sent to COMPUTECH and submitted to Google Forms. Google Forms does not provide a browser-verifiable response.';
        this.resetForm();
      } catch (error: unknown) {
        console.error('Google Forms submission failed.', error);
        this.successMessage = 'Your registration was received by COMPUTECH through Formspree.';
        this.errorMessage = 'We could not send a copy to Google Forms. Please contact COMPUTECH to confirm your registration.';
        this.resetForm();
      }
    } catch (error: unknown) {
      console.error('Registration submission failed.', error);
      this.errorMessage = 'We could not reach the registration service. Please check your connection and try again.';
    } finally {
      this.isSubmitting = false;
    }
  }

  private resetForm(): void {
    this.registrationForm.reset({
      fullName: '',
      email: '',
      phone: '',
      course: '',
      preferredSchedule: '',
      message: ''
    });
  }
}
