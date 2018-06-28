import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { bootloader } from '@angularclass/hmr';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import '../sass/index.scss';
import { decorateModuleRef } from './hmr.environment';


// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build' || process.env.ENV === 'faserver') {
  enableProdMode();
}

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule, {
      defaultEncapsulation: ViewEncapsulation.None,
    })
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
}

bootloader(main);
