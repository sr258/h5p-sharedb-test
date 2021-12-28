import "../styles/h5p-hello-world.css";
import HelloWorld from "../scripts/h5p-hello-world";

declare var H5P: any;

// Load library
H5P = H5P || {};
H5P.HelloWorld = HelloWorld;
