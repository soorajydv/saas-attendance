export interface FilterOptions {
  page: number;
  limit: number;
  sort: 'asc' | 'desc';

  status?: 'S' | 'V' | 'C' | 'R';
}
