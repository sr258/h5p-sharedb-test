import "../styles/sharedb-test.css";
import ShareDBTest from "../scripts/ShareDBTest";

/**
 * Global H5P namespace object.
 */
declare let H5P: any;

// This file adds the H5P library to the H5P namespace. It's the main entry
// point of the content type.

// Create the H5P namespace if it doesn't exist. (Should never happen, but just
// to be sure.)
// eslint-disable-next-line prefer-const
H5P = H5P || {};

// Add a wrapper class to the global H5P namespace.
H5P.ShareDBTest = class extends H5P.ContentType(true) {
  constructor(params: any, contentId: string, extras: any) {
    super();
    this.shareDBTest = new ShareDBTest(params, contentId, extras);
  }

  private shareDBTest: ShareDBTest;

  /**
   * Attach library to DOM.
   * @param wrapper Content's container.
   */
  attach = (wrapper: JQuery) => {
    this.shareDBTest.attach(wrapper);
  };
};
