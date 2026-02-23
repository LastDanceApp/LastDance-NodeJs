export class PromiseList {
  promises: PromiseInfo[];

  constructor(promises: PromiseInfo[]) {
    this.promises = promises;
  }
}

export class PromiseInfo {
  id: number;
  title: string;
  description: string;
  status: string;
  last_days: number;
  limit_days: number;
  looking_count: number;

  constructor(
    id: number,
    title: string,
    description: string,
    status: string,
    last_days: number,
    limit_days: number,
    looking_count: number,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.last_days = last_days;
    this.limit_days = limit_days;
    this.looking_count = looking_count;
  }
}
