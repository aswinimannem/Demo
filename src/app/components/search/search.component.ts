import { Component, OnInit } from '@angular/core';
import { MatAccordion } from "@angular/material/expansion";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  panelOpenState = true;
  selectedTreeNode:any = null;
  selectedFilters:any;
  searchKey:any = '';
  dataSource = [
    {
      name: 'General',
      id:'general',
      children: [
        {name: 'Company Name', nodeId:'companyName'},
        {name: 'Status', nodeId: 'status'},
        {name: 'Type', nodeId:'type'},
      ]
    }, {
      name: 'Dates',
      children: [
        {
          name: 'Incorporation date'
        }, {
          name: 'Confirmation Date due by'
        },
        {name: 'Accounts due by'},
      ]
    },
    {
      name: 'Industry',
      children: [
        {name: 'SIC code'}
      ]
    },
    {
      name: 'Location',
      children: [
        {name: 'Address'}
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  panelClick(ev:any) {
    ev.stopPropagation();
  }

  // public selectNode(node:any): void {
  //   if(this.selectedTreeNode){
  //     this.selectedTreeNode.selected = false;
  //   }
  //   this.selectedTreeNode = node;
  //   node.selected = !node.selected;
  //   console.group('Selected Tree Node');
  //   console.log('Label:', node.label);
  //   console.log('Children:', node.children.length);
  //   console.groupEnd();
  // }

  nodeSelection(ev:any){
    this.selectedTreeNode = ev;
    console.log(this.selectedTreeNode,'++++');
  }

  addFilter(filterType:any){
    let searchObj = {
      searchKey:this.searchKey,
      filterType:filterType
    }
    if(this.selectedFilters && this.selectedFilters[this.selectedTreeNode.name]) {
      this.selectedFilters[this.selectedTreeNode.name].push(searchObj);
    } else{
      this.selectedFilters = {[this.selectedTreeNode.name]:[searchObj]}
    }
    console.log(this.selectedFilters,'+++')
  }

}
