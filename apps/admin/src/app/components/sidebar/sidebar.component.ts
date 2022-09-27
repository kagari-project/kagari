import { Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MaterialUIModule } from '../../material-ui.module';

type TreeNode = {
  name: string;
  children?: TreeNode[];
};

@Component({
  standalone: true,
  imports: [MaterialUIModule],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent {
  public treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
  public dataSource = new MatTreeNestedDataSource<TreeNode>();
  constructor() {
    this.dataSource.data = [
      {
        name: 'foobar',
      },
      {
        name: 'lorem',
        children: [
          {
            name: 'lorem-1',
          },
          {
            name: 'lorem-2',
          },
        ],
      },
    ];
  }
  hasChild(_: number, node: TreeNode) {
    return !!node.children && node.children.length > 0;
  }
}
