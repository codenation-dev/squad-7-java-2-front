
export interface DetailsLogs {
  content: DetailsItemLog[];
  totalElements: number;
}

export interface DetailsItemLog {
  archived: boolean;
  createdBy: string;
  createdDate: Date;
  detail: string;
  frequencia: number;
  id: number;
  ip: string;
  level: string;
  title: string;
}

export interface ComboSelect {
  value: string;
  viewValue: string;
}
