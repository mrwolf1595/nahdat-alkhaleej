// types/about.ts
export interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    image: string;
  }
  
  export interface Milestone {
    year: string;
    title: string;
    description: string;
    icon?: string;
  }
  
  export interface ValueCard {
    title: string;
    description: string;
    icon: React.ReactNode;
  }