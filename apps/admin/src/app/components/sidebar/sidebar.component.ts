import { Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MaterialUIModule } from '../../material-ui.module';
import { RouteMetadata, RouterModule } from '@angular/router';

type TreeNode = RouteMetadata & { children?: TreeNode[] };

@Component({
  standalone: true,
  imports: [RouterModule, MaterialUIModule],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
  public dataSource = new MatTreeNestedDataSource<TreeNode>();
  constructor() {
    this.dataSource.data = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'User',
        children: [{ label: 'List', url: '/users' }],
      },
    ];
  }

  hasChild(_: number, node: TreeNode) {
    return !!node.children && node.children.length > 0;
  }

  ngAfterContentInit() {
    this.treeControl.dataNodes = this.dataSource.data;
    this.treeControl.expandAll();
  }
}
