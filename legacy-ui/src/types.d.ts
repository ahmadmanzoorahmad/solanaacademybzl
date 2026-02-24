// Global type declarations for the Solana Academy app

declare module 'html2canvas' {
  export interface Html2CanvasOptions {
    backgroundColor?: string;
    scale?: number;
    logging?: boolean;
    [key: string]: any;
  }

  export default function html2canvas(
    element: HTMLElement,
    options?: Html2CanvasOptions
  ): Promise<HTMLCanvasElement>;
}
