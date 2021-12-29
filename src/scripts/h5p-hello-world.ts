import type * as JQuery from "jquery";

export default class HelloWorld extends H5P.EventDispatcher {
  /**
   * @param params Parameters passed by the editor.
   * @param contentId Content's id.
   * @param [extras] Saved state, metadata, etc.
   */
  constructor(params: any, contentId: string, extras: any = {}) {
    super();
    this.root = document.createElement("div");
    this.root.innerText = params.textField.replace("%username", "World");

    /**
     * Attach library to wrapper.
     * @param $wrapper Content's container.
     */
    this.attach = function (wrapper: JQuery) {
      wrapper?.get(0)?.classList.add("h5p-hello-world");
      wrapper?.get(0)?.appendChild(this.root);
    };
  }

  private root: HTMLElement;
}
