
export interface DetailsLogs {
  content: DetailsItemLog[];
  totalElements: number;
}

export interface DetailsItemLog {
  archived: boolean;
  detail: string;
  environment: string;
  level: string;
  title: string;
  timeEvent: string;
  id: number;
}
