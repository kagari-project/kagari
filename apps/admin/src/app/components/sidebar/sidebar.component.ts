import { Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { RouteMetadata, Router, RouterModule } from '@angular/router';

type TreeNode = RouteMetadata & { children?: TreeNode[] };

@Component({
  standalone: true,
  imports: [RouterModule, MaterialUIModule],
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public treeControl = new NestedTreeControl<TreeNode>(
    (node) => node.children || [],
  );
  public dataSource = new MatTreeNestedDataSource<TreeNode>();
  constructor(private router: Router) {
    this.dataSource.data = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'User',
        children: [{ label: 'List', url: '/users' }],
      },
      {
        label: 'Role',
        children: [{ label: 'List', url: '/roles' }],
      },
      {
        label: 'Permission',
        children: [{ label: 'List', url: '/permissions' }],
      },
    ];
  }

  hasChild(_: number, node: TreeNode) {
    return !!node.children && node.children.length > 0;
  }

  ngAfterContentInit() {
    this.treeControl.dataNodes = this.dataSource.data;
    this.treeControl.dataNodes.map((node) => this.walkNode(node));
  }

  walkNode(node: TreeNode, parent?: TreeNode): void {
    if (!this.hasChild(0, node)) {
      if (this.router.url === node.url && parent) {
        this.treeControl.expand(parent);
      }
      return;
    }

    const children = this.treeControl.getChildren(node) as Array<TreeNode>;
    children.map((subNode) => {
      this.walkNode(subNode, node);
    });
  }
}
