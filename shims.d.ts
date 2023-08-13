import { IntercomInitParams } from '@/types/Structure';
import { ICodeEditor } from 'monaco-editor';

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '#app' {
  const defineNuxtPlugin: defineNuxtPlugin;
}

declare global {
  interface Window {
    monaco: ICodeEditor;
    MonacoEnvironment: monaco.Environment;
    intercomInitParams: IntercomInitParams;
  }
}
