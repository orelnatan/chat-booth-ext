import { Provider } from "@angular/core";
import { IMAGE_CONFIG } from "@angular/common";

export const imageProvider: Provider = {
  provide: IMAGE_CONFIG,
  useValue: {
    disableImageSizeWarning: true, 
    disableImageLazyLoadWarning: true
  }
}