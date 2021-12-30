export default class ShareDBTest extends H5P.ContentType(true) {
  /**
   * @param params Parameters passed by the editor.
   * @param contentId Content's id.
   * @param [extras] Saved state, metadata, etc.
   */
  constructor(params: any, contentId: string, extras: any = {}) {
    super();
    this.root = document.createElement("div");
    this.root.innerText = params.textField.replace("%username", "World!");
  }
  /**
   * Attach library to wrapper.
   * @param $wrapper Content's container.
   */
  attach = (wrapper: JQuery) => {
    wrapper?.get(0)?.classList.add("sharedb-test");
    wrapper?.get(0)?.appendChild(this.root);
  };

  private root: HTMLElement;
}
