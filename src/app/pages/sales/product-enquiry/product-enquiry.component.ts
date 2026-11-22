import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface ProductEnquiry {
  fullName: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}

@Component({
  selector: 'app-product-enquiry',
  imports: [ReactiveFormsModule],
  templateUrl: './product-enquiry.component.html',
  styleUrl: './product-enquiry.component.scss'
})
export class ProductEnquiryComponent {
  @Input() options: string[] = [];
  @ViewChild('enquirySection') private enquirySection?: ElementRef<HTMLElement>;

  private readonly formBuilder = inject(FormBuilder);
  private readonly formspreeEndpoint = 'https://formspree.io/f/xgaknedk';

  readonly enquiryForm = this.formBuilder.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    product: ['', Validators.required],
    message: ['']
  });

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  private submittedEnquiry: ProductEnquiry | null = null;

  get whatsappEnquiryUrl(): string | null {
    if (!this.submittedEnquiry) {
      return null;
    }

    const enquiry = this.submittedEnquiry;
    const message = [
      'Hello COMPUTECH, I have a product enquiry.',
      `Name: ${enquiry.fullName}`,
      `Email: ${enquiry.email}`,
      enquiry.phone ? `Phone: ${enquiry.phone}` : '',
      `Product or service: ${enquiry.product}`,
      enquiry.message ? `Message: ${enquiry.message}` : ''
    ].filter(Boolean).join('\n');

    return `https://wa.me/23230620306?text=${encodeURIComponent(message)}`;
  }

  prefillProduct(product: string): void {
    this.clearMessages();
    this.enquiryForm.controls.product.setValue(product);
  }

  scrollIntoView(): void {
    this.enquirySection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.submittedEnquiry = null;
  }

  async submitEnquiry(): Promise<void> {
    if (this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.clearMessages();

    const values = this.enquiryForm.getRawValue();
    const formData = new FormData();
    Object.entries(values).forEach(([name, value]) => formData.append(name, value));
    formData.append('_subject', `Product enquiry: ${values.product}`);

    try {
      const response = await fetch(this.formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });

      if (!response.ok) {
        this.errorMessage = `Your enquiry could not be submitted (error ${response.status}). Please try again or contact COMPUTECH.`;
        return;
      }

      this.submittedEnquiry = values;
      this.successMessage = 'Your enquiry was submitted to COMPUTECH through Formspree. You can also send its details on WhatsApp below.';
    } catch (error: unknown) {
      console.error('Product enquiry submission failed.', error);
      this.errorMessage = 'We could not reach the enquiry service. Please check your connection and try again.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
