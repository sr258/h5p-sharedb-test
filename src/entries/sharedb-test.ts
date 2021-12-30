import "../styles/sharedb-test.css";
import ShareDBTest from "../scripts/sharedb-test";

declare var H5P: any;

// Load library
H5P = H5P || {};
H5P.ShareDBTest = class extends H5P.ContentType(true) {
  constructor(params: any, contentId: string, extras: any) {
    super();
    this.shareDBTest = new ShareDBTest(params, contentId, extras);
  }

  private shareDBTest: ShareDBTest;

  /**
   * Attach library to wrapper.
   * @param $wrapper Content's container.
   */
  attach = (wrapper: JQuery) => {
    this.shareDBTest.attach(wrapper);
  };
};
