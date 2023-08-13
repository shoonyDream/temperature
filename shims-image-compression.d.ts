declare module 'browser-image-compression' {
  interface ImageCompressionOptions {
    maxSizeMB?: number; // (default: Number.POSITIVE_INFINITY)
    maxWidthOrHeight?: number; // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
    useWebWorker?: boolean; // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
    maxIteration?: number; // optional, max number of iteration to compress the image (default: 10)
  }

  const imageCompression: {
    (file: File, options?: ImageCompressionOptions): Promise<File>;
    getDataUrlFromFile: (file: File) => Promise<string>;
    getFilefromDataUrl: (url: string) => Promise<File>;
  };

  export default imageCompression;
}
