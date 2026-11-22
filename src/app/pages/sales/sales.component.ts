import { Component, ViewChild } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { paginateItems } from '../../shared/pagination/paginate';
import { CategoryFilterComponent } from '../../shared/category-filter/category-filter.component';
import { filterByCategory } from '../../shared/category-filter/filter-by-category';
import { ProductEnquiryComponent } from './product-enquiry/product-enquiry.component';

@Component({
  selector: 'app-sales',
  imports: [PaginationComponent, CategoryFilterComponent, ProductEnquiryComponent],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {
  @ViewChild(ProductEnquiryComponent) private productEnquiry?: ProductEnquiryComponent;

  pageSize = 3;
  currentPage = 1;
  selectedCategory = 'All';

  products = [
    {
      icon: 'bi-laptop',
      category: 'COMPUTERS',
      title: 'Laptops and Desktops',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Laptop computer for home, study or work',
      description: 'Explore computers for learning, everyday work and business use.'
    },
    {
      icon: 'bi-pc-display',
      category: 'ACCESSORIES',
      title: 'Computer Accessories',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Computer setup with monitor and accessories',
      description: 'Find the peripherals and accessories that complement your setup.'
    },
    {
      icon: 'bi-printer',
      category: 'OFFICE EQUIPMENT',
      title: 'Printers and Office Equipment',
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Printer and office equipment',
      description: 'Technology to support printing and everyday office tasks.'
    },
    {
      icon: 'bi-router',
      category: 'CONNECTIVITY',
      title: 'Networking Equipment',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Network and server equipment',
      description: 'Explore equipment for wired and wireless connectivity.'
    },
    {
      icon: 'bi-device-ssd',
      category: 'STORAGE',
      title: 'Storage and Components',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Computer storage component',
      description: 'Storage solutions and components for your computer needs.'
    },
    {
      icon: 'bi-headset',
      category: 'PERIPHERALS',
      title: 'Audio and Video Devices',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Audio equipment and headphones',
      description: 'Headsets, webcams and other devices for communication and collaboration.'
    }
  ];

  printingServices = [
    {
      icon: 'bi-file-earmark-text',
      title: 'Document Printing',
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Printer ready to produce documents',
      description: 'Printing for documents and materials used at school, work and home.'
    },
    {
      icon: 'bi-palette',
      title: 'Colour Printing',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Colourful workspace for printed materials',
      description: 'Colour printing for documents and materials where clear visuals matter.'
    },
    {
      icon: 'bi-printer',
      title: 'Black-and-White Printing',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85',
      imageAlt: 'Paper document prepared for printing',
      description: 'A practical option for everyday text documents and copies.'
    }
  ];

  get visibleProducts() {
    return paginateItems(this.filteredProducts, this.currentPage, this.pageSize);
  }

  get categories(): string[] {
    return ['All', ...new Set(this.products.map(product => product.category))];
  }

  get filteredProducts() {
    return filterByCategory(this.products, this.selectedCategory);
  }

  get enquiryOptions(): string[] {
    return [
      ...this.products.map(product => product.title),
      ...this.printingServices.map(service => service.title)
    ];
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  selectProduct(product?: string): void {
    if (product) {
      this.productEnquiry?.prefillProduct(product);
    }
    this.productEnquiry?.scrollIntoView();
  }
}
