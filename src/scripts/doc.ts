import ShareDBDocument from "./Document";

export default class Doc extends ShareDBDocument {
  constructor() {
    super();
  }
  seed(): void {
    this.votesDown = [];
    this.votesUp = [];
  }
  public votesUp: string[] = [];
  public votesDown: string[] = [];
}
