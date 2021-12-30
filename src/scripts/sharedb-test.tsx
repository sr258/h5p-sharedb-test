import Doc from "./doc";
import ShareDBConnector from "./sharedb-connector";

import React from "react";
import * as ReactDOM from "react-dom";
import Main from "./components/Main";

export default class ShareDBTest {
  /**
   * @param params Parameters passed by the editor.
   * @param contentId Content's id.
   * @param extras Saved state, metadata, etc.
   */
  constructor(params: any, contentId: string, extras: any = {}) {
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
    ReactDOM.render(
      <Main text={"start"} onChange={this.changeData} />,
      this.root
    );
  };

  refreshData = async (data: Doc): Promise<void> => {
    console.log("Refreshing data", data);
    ReactDOM.render(
      <Main text={data.text} onChange={this.changeData} />,
      this.root
    );
  };

  public changeData = (oldText: string, newText: string): void => {
    this.connector.submitOp([{ p: ["text"], od: oldText, oi: newText }]);
  };
}
