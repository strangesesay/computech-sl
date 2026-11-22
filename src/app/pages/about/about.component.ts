import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Mohamed J. Gbla',
      position: 'CEO and Founder',
      details: 'Leads the company with a vision for innovative technology solutions.',
      specialty: 'IT solutions and digital strategy',
      email: 'mohamedjg75@gmail.com',
      linkedin: '',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=600&q=85'
    },
    {
      name: 'John M. Sesay',
      position: 'Computer Training Instructor',
      details: 'Helps learners build confidence with computer and productivity tools.',
      specialty: 'Computer fundamentals, office applications web development, AI Prompt Engineering, and Google Workspace',
      email: 'johnmsesay1999@gmail.com',
      linkedin: '',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=600&q=85'
    },
    // {
    //   name: 'Fatmata Conteh',
    //   position: 'IT Support Technician',
    //   details: 'Assists customers with computer setup, maintenance and troubleshooting.',
    //   specialty: 'Computer support and network setup',
    //   email: 'fatmata.conteh@example.com',
    //   linkedin: 'https://www.linkedin.com/in/computech-demo-fatmata-conteh/',
    //   photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=600&q=85'
    // },
    // {
    //   name: 'Ibrahim Koroma',
    //   position: 'Sales and Customer Relations',
    //   details: 'Works with customers to explore products suited to their technology needs.',
    //   specialty: 'Computer products and customer service',
    //   email: 'ibrahim.koroma@example.com',
    //   linkedin: 'https://www.linkedin.com/in/computech-demo-ibrahim-koroma/',
    //   photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&h=600&q=85'
    // }
  ];
}
