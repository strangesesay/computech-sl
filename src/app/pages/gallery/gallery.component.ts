import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { paginateItems } from '../../shared/pagination/paginate';
import { CategoryFilterComponent } from '../../shared/category-filter/category-filter.component';
import { filterByCategory } from '../../shared/category-filter/filter-by-category';

type GalleryImage = {
  type: 'image';
  image: string;
  alt: string;
  title: string;
  category: string;
};

type InternalVideo = {
  type: 'internal-video';
  src: string;
  poster?: string;
  alt: string;
  title: string;
  category: string;
};

type YouTubeVideo = {
  type: 'youtube';
  videoId: string;
  alt: string;
  title: string;
  category: string;
};

type TikTokVideo = {
  type: 'tiktok';
  videoId: string;
  alt: string;
  title: string;
  category: string;
};

type GalleryVideo = YouTubeVideo | TikTokVideo;
type GalleryItem = GalleryImage | InternalVideo | GalleryVideo;

@Component({
  selector: 'app-gallery',
  imports: [RouterLink, PaginationComponent, CategoryFilterComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly embedUrls = new Map<string, SafeResourceUrl>();
  pageSize = 5;
  currentPage = 1;
  selectedCategory = 'All';

  galleryItems: GalleryItem[] = [
    {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85',
      alt: 'Learners working together with computers',
      title: 'Learning digital skills',
      category: 'TRAINING'
    },
    {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85',
      alt: 'Team collaborating around a table',
      title: 'Working together',
      category: 'COMMUNITY'
    },
    {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85',
      alt: 'Computer workspace with desktop equipment',
      title: 'Technology in action',
      category: 'TECHNOLOGY'
    },
    {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1516321310764-8d8e6e5f4145?auto=format&fit=crop&w=1000&q=85',
      alt: 'Student using a laptop for learning',
      title: 'Learning by doing',
      category: 'TRAINING'
    },
    {
      type: 'image',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85',
      alt: 'Bright collaborative workspace',
      title: 'A place to collaborate',
      category: 'COMMUNITY'
    },
    {
      type: 'youtube',
      videoId: 'https://youtu.be/KBHyDd2cJBs',
      alt: 'Colleagues collaborating with laptops',
      title: 'Ideas and innovation',
      category: 'TECHNOLOGY'
    }
  ];

  get visibleGalleryItems(): GalleryItem[] {
    return paginateItems(this.filteredGalleryItems, this.currentPage, this.pageSize);
  }

  get categories(): string[] {
    return ['All', ...new Set(this.galleryItems.map(item => item.category))];
  }

  get filteredGalleryItems(): GalleryItem[] {
    return filterByCategory(this.galleryItems, this.selectedCategory);
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  getEmbedUrl(item: GalleryVideo): SafeResourceUrl {
    if (item.type === 'youtube') {
      if (!/^[\w-]{11}$/.test(item.videoId)) {
        throw new Error(`Invalid YouTube video ID: ${item.videoId}`);
      }

      return this.getTrustedEmbedUrl(
        `youtube:${item.videoId}`,
        `https://www.youtube-nocookie.com/embed/${item.videoId}?controls=1&rel=0`
      );
    }

    if (!/^\d+$/.test(item.videoId)) {
      throw new Error(`Invalid TikTok video ID: ${item.videoId}`);
    }

    return this.getTrustedEmbedUrl(
      `tiktok:${item.videoId}`,
      `https://www.tiktok.com/player/v1/${item.videoId}?controls=1`
    );
  }

  private getTrustedEmbedUrl(key: string, url: string): SafeResourceUrl {
    const cachedUrl = this.embedUrls.get(key);
    if (cachedUrl) {
      return cachedUrl;
    }

    const trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.embedUrls.set(key, trustedUrl);
    return trustedUrl;
  }
}
