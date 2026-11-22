import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { paginateItems } from '../../shared/pagination/paginate';
import { CategoryFilterComponent } from '../../shared/category-filter/category-filter.component';
import { filterByCategory } from '../../shared/category-filter/filter-by-category';

@Component({
  selector: 'app-courses',
  imports: [RouterLink, PaginationComponent, CategoryFilterComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  pageSize = 3;
  currentPage = 1;
  selectedCategory = 'All';

  courses = [
    {
      icon: 'bi-microsoft',
      category: 'OFFICE PRODUCTIVITY',
      title: 'Microsoft Office Suite',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Laptop and workspace for office productivity training',
      description: 'Develop essential office skills using Microsoft Word, Excel and PowerPoint.',
      topics: [
        'Microsoft Word',
        'Microsoft Excel',
        'Microsoft PowerPoint',
        'Practical office projects'
      ]
    },
    {
      icon: 'bi-pc-display',
      category: 'COMPUTER BASICS',
      title: 'Computer Fundamentals',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Desktop computer setup for learning computer fundamentals',
      description: 'Build a strong foundation in computer operations and technology.',
      topics: [
        'Computer components',
        'Hardware and software',
        'Operating systems',
        'File management'
      ]
    },
    {
      icon: 'bi-globe',
      category: 'DIGITAL LITERACY',
      title: 'Internet & Digital Skills',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Learner using online tools on a laptop',
      description: 'Learn to navigate the internet and use essential online services confidently.',
      topics: [
        'Internet navigation',
        'Email communication',
        'Online safety',
        'Digital research'
      ]
    },
    {
      icon: 'bi-robot',
      category: 'ARTIFICIAL INTELLIGENCE',
      title: 'AI & Prompt Engineering',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Artificial intelligence concept',
      description: 'Understand AI tools and learn how to communicate effectively with AI systems.',
      topics: [
        'Introduction to AI',
        'AI productivity tools',
        'Effective prompting',
        'Responsible AI use'
      ]
    },
    {
      icon: 'bi-keyboard',
      category: 'PRODUCTIVITY',
      title: 'Typing & Computer Productivity',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Keyboard being used for typing practice',
      description: 'Improve your typing, accuracy and efficiency when working with computers.',
      topics: [
        'Keyboard familiarity',
        'Typing practice',
        'Speed and accuracy',
        'Productivity techniques'
      ]
    },
    {
      icon: 'bi-cloud',
      category: 'CLOUD PRODUCTIVITY',
      title: 'Google Workspace',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Collaborative workspace for cloud productivity tools',
      description: "Learn Google's cloud-based tools for communication, productivity and collaboration.",
      topics: [
        'Google Docs',
        'Google Sheets',
        'Google Slides',
        'Google Forms and Drive'
      ]
    }
  ];

  get visibleCourses() {
    return paginateItems(this.filteredCourses, this.currentPage, this.pageSize);
  }

  get categories(): string[] {
    return ['All', ...new Set(this.courses.map(course => course.category))];
  }

  get filteredCourses() {
    return filterByCategory(this.courses, this.selectedCategory);
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
  }
}
