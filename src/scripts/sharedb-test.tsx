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
  constructor(params: any, private contentId: string, extras: any = {}) {
    if (H5PIntegration.contents) {
      const contentData = H5PIntegration.contents[`cid-${this.contentId}`];
      this.accessLevel = (contentData as any).accessLevel;
    }
    console.log("access level: ", this.accessLevel);
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
  private accessLevel: "privileged" | "user" | undefined = undefined;
  private data?: Doc;

  /**
   * Attach library to wrapper.
   * @param $wrapper Content's container.
   */
  attach = (wrapper: JQuery) => {
    wrapper?.get(0)?.classList.add("sharedb-test");
    wrapper?.get(0)?.appendChild(this.root);
    ReactDOM.render(
      <Main
        votesDown={0}
        votesUp={0}
        voteDown={this.voteDown}
        voteUp={this.voteUp}
        isTeacher={this.accessLevel === "privileged"}
        clear={this.clear}
      />,
      this.root
    );
  };

  refreshData = async (data: Doc): Promise<void> => {
    console.log("Refreshing data", data);
    this.data = data;
    ReactDOM.render(
      <Main
        votesDown={data.votesDown.length}
        votesUp={data.votesUp.length}
        voteDown={this.voteDown}
        voteUp={this.voteUp}
        isTeacher={this.accessLevel === "privileged"}
        clear={this.clear}
      />,
      this.root
    );
  };

  public voteUp = (): void => {
    console.log("voting up");
    this.connector.submitOp([
      { p: ["votesUp", 0], li: H5PIntegration.user.id.toString() },
    ]);
    console.log("voted up");
  };

  public voteDown = (): void => {
    console.log("voting down");
    this.connector.submitOp([
      { p: ["votesDown", 0], li: H5PIntegration.user.id.toString() },
    ]);
    console.log("voted down");
  };

  public clear = (): void => {
    if (this.data) {
      console.log("clearing");
      this.connector.submitOp([
        { p: ["votesDown"], od: this.data.votesDown, oi: [] },
        { p: ["votesUp"], od: this.data.votesUp, oi: [] },
      ]);
      console.log("cleared");
    }
  };
}
