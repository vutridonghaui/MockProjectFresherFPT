import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ArticleService } from 'src/app/CoreModule/services/article/article.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage!: number;
  @Output() onPageChanged: EventEmitter<number> = new EventEmitter()
  pagesCount: number = this.articleListService.pagesCount;
  pageRange = 4;
  pageList:any = [];
  constructor(
    private articleListService: ArticleService
  ) { }

  ngOnInit() {
    for (let i=this.currentPage-this.pageRange; i<=this.currentPage+this.pageRange && i<=this.pagesCount; i++) {
      if (i>=1) this.pageList.push(i);
    }
  }

  moveToPage(i: number) {
    this.onPageChanged.emit(i);
  }
  nextPage() {
    this.moveToPage(this.currentPage+1);
  }

  previousPage() {
    this.moveToPage(this.currentPage-1)
  }
  // @Input() itemOfPage!: number;
  // @Input() pagination:number[] = [];
  // @Input() currentPage!: number;
  // @Input() totalCount!: number;
  // @Output() putOffset = new EventEmitter();
  // lastPage!: number;
  // firstPage = 0;

  // constructor(private articleService: ArticleService) { }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.createPagination();
  // }

  // ngOnInit() {
  //   this.lastPage = Math.ceil(this.totalCount / this.itemOfPage) - 1;
  //   this.createPagination();
  // }

  // changePage(index: number, offset: number) {
  //   this.putOffset.emit([index, offset]);
  // }

  // createPagination() {
  //   this.pagination = [];
  //   for (
  //     let i = this.currentPage - 2 >= 0 ? this.currentPage - 2 : 0;
  //     i <= (this.currentPage + 2 <= this.lastPage ? this.currentPage + 2 : this.lastPage);
  //     i++
  //   ) {
  //     this.pagination.push(i);
  //   }
  // }

}
