export interface Article {
  id: string;
  title: string;
  category: string;
  iconName: string;
  summary: string;
  content: string; // HTML or Markdown
  url?: string;
}

export interface Review {
  id: number;
  name: string;
  avatarLetter: string;
  avatarBg: string;
  date: string;
  stars: number;
  text: string;
}

export interface PathCard {
  id: string;
  title: string;
  iconName: string;
  symptom: string;
  relief: string;
}
