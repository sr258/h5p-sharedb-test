import ReconnectingWebSocket from "reconnecting-websocket";
import { Connection, Doc } from "sharedb/lib/client";

export default class ShareDBConnector<T> {
  constructor(
    websocketEndpoint: string,
    contentId: string,
    private refreshCallback: (data: T) => Promise<void>
  ) {
    // Open WebSocket connection to ShareDB server
    this.socket = new ReconnectingWebSocket("ws://" + websocketEndpoint);
    this.connection = new Connection(this.socket as any);

    // Create local Doc instance mapped to 'h5p' collection document with contentId
    this.doc = this.connection.get("h5p", contentId);

    // Get initial value of document and subscribe to changes
    this.doc.subscribe(this.refresh);

    // When document changes (by this client or any other, or the server),
    // update the number on the page
    this.doc.on("op", this.refresh);
  }
  private socket: ReconnectingWebSocket;
  private connection: Connection;
  private doc: Doc<T>;

  refresh = async () => {
    await this.refreshCallback(this.doc.data);
  };

  submitOp = (data: any) => {
    this.doc.submitOp(data);
  };
}
