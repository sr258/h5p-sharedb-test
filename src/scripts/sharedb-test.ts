import Doc from "./doc";
import ShareDBConnector from "./sharedb-connector";

export default class ShareDBTest extends H5P.ContentType(true) {
  /**
   * @param params Parameters passed by the editor.
   * @param contentId Content's id.
   * @param extras Saved state, metadata, etc.
   */
  constructor(params: any, contentId: string, extras: any = {}) {
    super();
    this.root = document.createElement("div");
    const serverConfig: { serverUrl: string } =
      H5P.getLibraryConfig("H5P.ShareDBTest");
    this.connector = new ShareDBConnector<Doc>(
      serverConfig.serverUrl,
      contentId,
      this.refreshData,
      Doc
    );
  }

  private root: HTMLElement;
  private connector: ShareDBConnector<Doc>;

  /**
   * Attach library to wrapper.
   * @param $wrapper Content's container.
   */
  attach = (wrapper: JQuery) => {
    wrapper?.get(0)?.classList.add("sharedb-test");
    wrapper?.get(0)?.appendChild(this.root);
  };

  refreshData = async (data: Doc): Promise<void> => {
    console.log("Refreshing data", data);
    this.root.innerText = data.text;
  };
}
