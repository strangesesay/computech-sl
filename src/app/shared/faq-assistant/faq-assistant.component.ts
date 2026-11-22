import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type MessageSender = 'assistant' | 'user';

interface ChatMessage {
  sender: MessageSender;
  text: string;
}

interface FaqEntry {
  keywords: string[];
  answer: string;
}

@Component({
  selector: 'app-faq-assistant',
  imports: [FormsModule],
  templateUrl: './faq-assistant.component.html',
  styleUrl: './faq-assistant.component.scss'
})
export class FaqAssistantComponent {
  isOpen = false;
  question = '';
  messages: ChatMessage[] = [
    {
      sender: 'assistant',
      text: 'Hi! I can help with questions about COMPUTECH courses, registration, products and services.'
    }
  ];

  readonly suggestedQuestions = [
    'What courses do you offer?',
    'How do I register?',
    'What IT services are available?'
  ];

  private readonly faqEntries: FaqEntry[] = [
    {
      keywords: ['course', 'training', 'learn', 'class', 'microsoft office', 'computer fundamentals', 'digital skills', 'prompt engineering', 'google workspace', 'typing', 'course fee', 'course cost', 'course price', 'tuition', 'how much'],
      answer: 'COMPUTECH offers Microsoft Office Suite, Computer Fundamentals, Internet & Digital Skills, AI & Prompt Engineering, Typing & Computer Productivity, and Google Workspace. Visit the Courses page to explore them. Course fees are not listed on the website; contact COMPUTECH for pricing.'
    },
    {
      keywords: ['register', 'registration', 'enrol', 'enroll', 'sign up', 'apply'],
      answer: 'Open the Registration page and submit your name, email, phone number and course choice. Your registration is sent to Formspree and the Google Form. Typing & Computer Productivity is not currently a choice in the Google Form, so that selection is sent to Formspree only.'
    },
    {
      keywords: ['schedule', 'timetable', 'class time', 'when', 'duration', 'availability'],
      answer: 'Course schedules and durations are not listed on the website. You can include your preferred schedule in the registration form or contact COMPUTECH on WhatsApp at +232 30 620 306.'
    },
    {
      keywords: ['price', 'pricing', 'cost', 'buy', 'purchase', 'product', 'laptop', 'desktop', 'computer sales'],
      answer: 'The Sales page lists computers, accessories, printers and office equipment, networking equipment, storage and components, and audio/video devices. Contact COMPUTECH for current availability and pricing.'
    },
    {
      keywords: ['print', 'printing', 'photocopy', 'black and white', 'colour printing'],
      answer: 'Printing services include document printing, colour printing, and black-and-white printing. Contact COMPUTECH for pricing and order details.'
    },
    {
      keywords: ['service', 'repair', 'troubleshoot', 'computer setup', 'network', 'software installation', 'maintenance', 'it support', 'consultation'],
      answer: 'IT services include computer setup and troubleshooting, network setup, software installation, computer maintenance, business IT support, and technology consultation. See the Services page for details.'
    },
    {
      keywords: ['contact', 'email', 'phone', 'whatsapp', 'call', 'message'],
      answer: 'You can email COMPUTECH at computechsl7@gmail.com or message on WhatsApp at +232 30 620 306.'
    },
    {
      keywords: ['where', 'location', 'address', 'based', 'office'],
      answer: 'The website lists COMPUTECH in Sierra Leone but does not publish a street address. Contact the team by email at computechsl7@gmail.com or WhatsApp at +232 30 620 306 for location details.'
    },
    {
      keywords: ['gallery', 'photo', 'video', 'tiktok', 'youtube'],
      answer: 'The Gallery page features COMPUTECH images and video content. Some videos can be played directly or embedded from YouTube and TikTok.'
    },
    {
      keywords: ['blog', 'news', 'article', 'update'],
      answer: 'Visit the Blog & News page for COMPUTECH articles and updates.'
    },
    {
      keywords: ['about', 'computech', 'company', 'team'],
      answer: 'COMPUTECH provides computer training, technology products, printing services, and IT solutions. Visit the About page to learn more about the organization and team.'
    }
  ];

  toggleAssistant(): void {
    this.isOpen = !this.isOpen;
  }

  askSuggestedQuestion(suggestedQuestion: string): void {
    this.question = suggestedQuestion;
    this.sendMessage();
  }

  sendMessage(): void {
    const text = this.question.trim();
    if (!text) {
      return;
    }

    this.messages.push({ sender: 'user', text });
    this.messages.push({ sender: 'assistant', text: this.findAnswer(text) });
    this.question = '';
  }

  private findAnswer(question: string): string {
    const normalizedQuestion = this.normalize(question);
    let bestMatch: FaqEntry | undefined;
    let bestScore = 0;

    for (const entry of this.faqEntries) {
      const score = entry.keywords.reduce((total, keyword) => {
        const normalizedKeyword = this.normalize(keyword);
        return normalizedQuestion.includes(normalizedKeyword)
          ? total + normalizedKeyword.split(' ').length
          : total;
      }, 0);

      if (score > bestScore) {
        bestMatch = entry;
        bestScore = score;
      }
    }

    return bestMatch?.answer
      ?? 'I could not find that detail on the website. Please email computechsl7@gmail.com or message COMPUTECH on WhatsApp at +232 30 620 306.';
  }

  private normalize(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }
}
