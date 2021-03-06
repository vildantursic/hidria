import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-my-projects',
  templateUrl: './search-my-projects.component.html',
  styleUrls: ['./search-my-projects.component.scss']
})
export class SearchMyProjectsComponent implements OnInit {

  @Input() searchTerm;
  sortBy: String = '';
  @Output() nameChange: EventEmitter<String> = new EventEmitter<String>();
  @Output() sortChange: EventEmitter<String> = new EventEmitter<String>();
  constructor() {
  }

  ngOnInit() {
  }
}
