export interface Writings {
  title: string;
  tldr: string;
  content: any;
  slug: { current: string };
  _createdAt: string;
}

export interface Projects {
  title: string;
  href: string;
  description: string;
  role: string;
}
