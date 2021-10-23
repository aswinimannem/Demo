import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  nodeId: any;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {



  @ViewChild('tree') tree: any;
  @Input() isOpen: boolean = false;
  @Input() dataSource: any;
  @Input() showToggle: boolean = true;
  @Output() onSelectNode = new EventEmitter();
  treeNodes: any;
  selectedNode:any;

  constructor() {

  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit(): void {
    this.treeNodes = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.treeNodes.data = this.dataSource;

  }
  ngAfterViewInit() {
    if (this.isOpen) {
      this.tree.treeControl.expandAll();
    }

  }

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      nodeId: node.nodeId || ''
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  nodeSelection(node:any) {
    if(this.selectedNode){
      this.selectedNode.selected = false;
    }
    this.selectedNode = node;
    node.selected = !node.selected;
    console.log(node);
    this.onSelectNode.emit({...node});
  }
  
}
