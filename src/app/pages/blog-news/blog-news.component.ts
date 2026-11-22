import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { paginateItems } from '../../shared/pagination/paginate';

@Component({
  selector: 'app-blog-news',
  imports: [RouterLink, PaginationComponent],
  templateUrl: './blog-news.component.html',
  styleUrl: './blog-news.component.scss'
})
export class BlogNewsComponent {
  pageSize = 3;
  currentPage = 1;

  articles = [
    {
      category: 'DIGITAL SKILLS',
      title: 'Build Confidence with Everyday Computer Skills',
      summary: 'A practical starting point for getting comfortable with files, email, documents and the tools used in school and at work.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85',
      alt: 'Learner practising digital skills on a laptop',
      readingTime: '4 min read'
    },
    {
      category: 'BUYING GUIDES',
      title: 'Choosing a Computer for Study or Work',
      summary: 'Consider how you will use a computer, the applications you need and the features that matter before selecting a device.',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85',
      alt: 'Laptop ready for study or work',
      readingTime: '5 min read'
    },
    {
      category: 'ONLINE SAFETY',
      title: 'Simple Habits for Safer Browsing',
      summary: 'Use unique passwords, check links before opening them and keep your devices and applications up to date.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=85',
      alt: 'Digital security concept displayed on a screen',
      readingTime: '3 min read'
    },
    {
      category: 'AI & PRODUCTIVITY',
      title: 'Getting Started with AI Tools',
      summary: 'Learn how clear instructions and careful review can help you use AI tools as a practical aid for everyday tasks.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85',
      alt: 'Abstract artificial intelligence illustration',
      readingTime: '4 min read'
    }
  ];

  get visibleArticles() {
    return paginateItems(this.articles, this.currentPage, this.pageSize);
  }
}
