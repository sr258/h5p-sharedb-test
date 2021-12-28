import type * as JQuery from "jquery";

declare var H5P: any;
declare var H5PIntegration: any;

export default class HelloWorld extends (H5P.EventDispatcher as {
  new (): any;
}) {
  /**
   * @constructor
   *
   * @param params Parameters passed by the editor.
   * @param contentId Content's id.
   * @param [extras] Saved state, metadata, etc.
   */
  constructor(params: any, contentId: string, extras: any = {}) {
    super();
    let username =
      (H5PIntegration && H5PIntegration.user && H5PIntegration.user.name) ||
      "world";
    this.element = document.createElement("div");
    this.element.innerText = params.textField.replace("%username", username);

    /**
     * Attach library to wrapper.
     *
     * @param $wrapper Content's container.
     */
    this.attach = function ($wrapper: JQuery) {
      $wrapper?.get(0)?.classList.add("h5p-hello-world");
      $wrapper?.get(0)?.appendChild(this.element);
    };
  }
}
