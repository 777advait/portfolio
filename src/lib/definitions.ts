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

export interface ArchiveImages {
  title: string;
  image: any;
}

export interface Affiliations {
  company: string;
  position: string;
  startDate: Date;
  endDate?: string;
  currentlyWorking?: boolean;
  link?: string;
}
