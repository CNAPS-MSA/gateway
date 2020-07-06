export interface ITopListBooks {
  id?: string;
  title?: string;
  description?: string;
  author?: string;
  publisher?: string;
}

export class TopListBooks implements ITopListBooks {
  constructor(public id?: string, public title?: string, public description?: string, public author?: string, public publisher?: string) {}
}
