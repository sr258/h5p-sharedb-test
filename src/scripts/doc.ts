import ShareDBDocument from "./Document";

export default class Doc extends ShareDBDocument {
  constructor() {
    super();
  }
  seed(): void {
    this.text = "start";
  }
  public text: string = "";
}
