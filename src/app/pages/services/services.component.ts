import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { paginateItems } from '../../shared/pagination/paginate';

@Component({
  selector: 'app-services',
  imports: [RouterLink, PaginationComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  pageSize = 3;
  currentPage = 1;

  services = [
    {
      icon: 'bi-tools',
      title: 'Computer Setup and Troubleshooting',
      description: 'Help with getting computers ready to use and resolving common device issues.'
    },
    {
      icon: 'bi-router',
      title: 'Network Setup',
      description: 'Guidance with setting up connectivity for homes, classrooms and workplaces.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Software Installation',
      description: 'Assistance with installing and setting up software for your needs.'
    },
    {
      icon: 'bi-pc-display',
      title: 'Computer Maintenance',
      description: 'Support to help keep your computer equipment in good working order.'
    },
    {
      icon: 'bi-building',
      title: 'Business IT Support',
      description: 'Practical technology support for small businesses and organizations.'
    },
    {
      icon: 'bi-chat-dots',
      title: 'Technology Consultation',
      description: 'Talk through your goals and explore suitable technology options.'
    }
  ];

  get visibleServices() {
    return paginateItems(this.services, this.currentPage, this.pageSize);
  }
}
