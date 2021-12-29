/**
 * This is an author inside content metadata.
 */
export interface IContentAuthor {
  name?: string;
  role?: string;
}

/**
 * This is a change inside content metadata.
 */
export interface IContentChange {
  author?: string;
  date?: string;
  log?: string;
}

/**
 * The non-technical copyright and license metadata of a content object. H5P
 * calls this "metadata" in the GUI (and in their code), but to avoid confusing
 * from our use of metadata, we call it license data.
 */
export interface ILicenseData {
  defaultLanguage: string;
  a11yTitle?: string;
  license: string;
  licenseVersion?: string;
  yearFrom?: string;
  yearTo?: string;
  source?: string;
  title: string;
  authors?: IContentAuthor[];
  licenseExtras?: string;
  changes?: IContentChange[];
  authorComments?: string;
  contentType?: string;
}

/**
 * The integration object is used to pass information to the H5P JavaScript
 * client running in the browser about certain settings and values of the
 * server.
 */
export interface IIntegration {
  ajax: {
    /**
     * The Ajax endpoint called when the user state has changed
     * Example: /h5p-ajax/content-user-data/:contentId/:dataType/:subContentId?token=XYZ
     * You can use these placeholders:
     * :contentId (can be null for editor)
     * :dataType (values: state or any string)
     * :subContentId (seems to obsolete, always 0)
     * The H5P client will replace them with the actual values.
     */
    contentUserData: string;
    /**
     * An Ajax endpoint called when the user has finished the content.
     * Example: /h5p-ajax/set-finished.json?token=XYZ
     * Only called when postUserStatistics is set to true.
     */
    setFinished: string;
  };
  ajaxPath: string;
  /**
   * The base URL, e.g. https://example.org
   */
  baseUrl?: string;
  /**
   * The key must be of the form "cid-XXX", where XXX is the id of the content
   */
  contents?: {
    [key: string]: {
      /**
       * Can be used to override the URL used for getting content files.
       * It must be a URL to which the actual filenames can be appended.
       * Do not end it with a slash!
       * If it is a relative URL it will be appended to the hostname that
       * is in use (this is done in the H5P client).
       * If it is an absolute URL it will be used directly.
       */
      contentUrl?: string;
      contentUserData?: {
        /**
         * The state as a serialized JSON object.
         */
        state: string;
      }[];
      displayOptions: {
        copy: boolean;
        copyright: boolean;
        embed: boolean;
        export: boolean;
        frame: boolean;
        icon: boolean;
      };
      /**
       * The full embed code (<iframe>...</iframe> with absolute URLs).
       * Example: <iframe src=\"https://example.org/h5p/embed/XXX\" width=\":w\" height=\":h\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\"></iframe>"
       */
      embedCode?: string;
      /**
       * The download URL (absolute URL).
       */
      exportUrl?: string;
      fullScreen: "0" | "1";
      jsonContent: string;
      /**
       * The ubername with whitespace as separator.
       */
      library: string;
      mainId?: string;
      metadata?: ILicenseData;
      /**
       * The parameters.
       */
      params?: any;
      /**
       * A script html tag which can be included alongside the embed code
       * to make the iframe size to the available width. Use absolute URLs.
       * Example: <script src=\"https://example.org/h5p/library/js/h5p-resizer.js\" charset=\"UTF-8\"></script>
       */
      resizeCode?: string;
      /**
       * A complete list of scripts required to display the content.
       * Includes core scripts and content type specific scripts.
       */
      scripts?: string[];
      /**
       * A complete list of styles required to display the content.
       * Includes core scripts and content type specific styles.
       */
      styles?: string[];
      /**
       * The absolute URL to the current content. Used when generating
       * xAPI ids. (Becomes the attribute statement.object.id of the xAPI
       * statement. If it is a content with subcontents, the subContentId
       * will be appended like this: URL?subContentId=XXX)
       */
      url?: string;
    };
  };
  /**
   * The files in this list are references when creating iframes.
   */
  core?: {
    /**
     * A list of JavaScript files that make up the H5P core
     */
    scripts?: string[];
    /**
     * A list of CSS styles that make up the H5P core.
     */
    styles?: string[];
  };
  /**
   * Can be null.
   */
  crossorigin?: any;
  /**
   * Can be null.
   */
  crossoriginCacheBuster?: any;
  /**
   * We pass certain configuration values to the client with the editor
   * integration object. Note that the way to pass these values to the client
   * is NOT standardized and in the PHP implementation it is not the same in
   * the Drupal, Moodle and WordPress clients. For our NodeJS version
   * we've decided to put the values into the integration object. The page
   * created by the editor renderer has to extract these values and put
   * them into the corresponding properties of the H5PEditor object!
   * See /src/renderers/default.ts how this can be done!
   */
  editor?: ILumiEditorIntegration;
  fullscreenDisabled?: 0 | 1;
  hubIsEnabled: boolean;
  /**
   * The localization strings. The namespace can for example be 'H5P'.
   */
  l10n: {
    [namespace: string]: any;
  };
  /**
   * Can be null. The server can customize library behavior by setting the
   * library config for certain machine names, as the H5P client allows it to
   * be called by executing H5P.getLibraryConfig(machineName). This means that
   * libraries can retrieve configuration values from the server that way.
   */
  libraryConfig?: {
    [machineName: string]: any;
  };
  /**
   * The URL at which the core **JavaScript** files are stored.
   */
  libraryUrl?: string;
  /**
   * The cache buster appended to JavaScript and CSS files.
   * Example: ?q8idru
   */
  pluginCacheBuster?: string;
  /**
   * If set the URL specified in ajax.setFinished is called when the user is
   * finished with a content object.
   */
  postUserStatistics: boolean;
  reportingIsEnabled?: boolean;
  /*
   * How often the user state of content is saved (in seconds). Set to false
   * to disable saving user state. Note that the user state is only saved if
   * the user object is passed into the render method of the player. You also
   * must set ajax.contentUserData for state saving to work.
   */
  saveFreq: number | boolean;
  /**
   * Used when generating xAPI statements.
   */
  siteUrl?: string;
  /**
   * The URL at which files can be accessed. Combined with the baseUrl by the
   * client.
   * Example. /h5p
   */
  url: string;
  /**
   * Used to override the auto-generated library URL (libraries means "content
   * types" here). If this is unset, the H5P client will assume '/libraries'.
   * Note that the URL is NOT appended to the url or baseUrl property!
   */
  urlLibraries?: string;
  user: {
    /**
     * Usage unknown.
     */
    canToggleViewOthersH5PContents?: 0 | 1;
    id?: any;
    mail: string;
    name: string;
  };
  Hub?: {
    contentSearchUrl: string;
  };
}

/**
 * The editor integration object is used to pass information to the page that
 * is created by the renderer. Note that this object is NOT standard H5P
 * behavior but specific to our NodeJS implementation.
 * The editor view created by the renderer has to copy these values into the
 * H5PEditor object! This is the responsibility of the implementation and NOT
 * done by the H5P client automatically!
 */
export interface ILumiEditorIntegration extends IEditorIntegration {
  baseUrl?: string;
  contentId?: string;
  contentRelUrl?: string;
  editorRelUrl?: string;
  relativeUrl?: string;
}

/**
 * This is the H5P standard editor integration interface.
 */
export interface IEditorIntegration {
  ajaxPath: string;
  apiVersion: { majorVersion: number; minorVersion: number };
  assets: {
    css: string[];
    js: string[];
  };
  basePath?: string;
  copyrightSemantics?: any;
  enableContentHub?: boolean;
  /**
   * This is a reference ot a generic binary file icon used in some content
   * types.
   */
  fileIcon?: {
    height: number;
    path: string;
    width: number;
  };
  /**
   * The path at which **temporary** files can be retrieved from.
   */
  filesPath: string;
  hub?: {
    contentSearchUrl: string;
  };
  language?: string;
  libraryUrl: string;
  metadataSemantics?: any;
  nodeVersionId: string;
  wysiwygButtons?: string[];
}

/**
 * This describes the Path of JavaScript and CSS files in a library.json file.
 * This single property interface exists because the library.json file expects
 * this format.
 */
export interface IPath {
  path: string;
}

export interface IH5PInstance {
  contentId: string;
  contentData: {
    metadata: any;
    standalone: boolean;
  };
  params: any;
  trigger: (event: string, eventData?: any, extras?: any) => void;
}

export interface IH5PDialog {
  new (name: string, title: string, content: string, $element: any): IH5PDialog;
  open(scrollbar: boolean): void;
  close(): void;
}

export interface IH5PEventDispatcher {
  new ();
  on(eventName: string, callback: (event: any) => void, that?: any): void;
  off(eventName: string, callback: (event: any) => void, that?: any): void;
  once(eventName: string, callback: (event: any) => void, that?: any): void;
  trigger(
    event: string | IH5PEvent,
    eventData: any,
    extras?: { bubbles: boolean; external: boolean }
  ): void;
}

export interface IH5PEvent {
  new (
    type: string,
    data: any,
    extras?: { bubbles: boolean; external: boolean }
  );
  type: string;
  data: any;
  preventBubbling();
  getBubbles();
  scheduleForExternal();
}

export interface IH5P {
  [key: string]: any;
  instances: IH5PInstance[];
  getCopyrights: (
    instance: IH5PInstance,
    parameters: any,
    contentId: string,
    metadata: any
  ) => string;
  triggerXAPI(verb: string, extra: any): void;
  Dialog: IH5PDialog;
  externalDispatcher: IH5PEventDispatcher;
  init(root: any): void;
  preventInit: boolean;
  jQuery: any;
  EventDispatcher: IH5PEventDispatcher;
}

declare global {
  interface Window {
    /**
     * The global H5P "class" of the H5P client core.
     */
    H5P: IH5P;
    /**
     * Used by the H5P core to communicate settings between the server and
     * the H5P core client.
     */
    H5PIntegration: IIntegration;
  }

  var H5P: IH5P;
  var H5PIntegration: IIntegration;
}
