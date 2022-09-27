import '@angular/router';

declare module '@angular/router' {
  type RouteMetadata = { label: string; url?: string | string[] };
}
