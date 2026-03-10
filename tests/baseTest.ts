import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    const adDomains = [
      'googleads.g.doubleclick.net',
      'pagead2.googlesyndication.com',
      'tpl.googlesyndication.com'
    ];

    await page.route('**/*', (route) => {
      const url = route.request().url();
      if (adDomains.some(domain => url.includes(domain))) {
        route.abort();
      } else {
        route.continue();
      }
    });
    await page.addInitScript(() => {
      const style = document.createElement('style');
      style.innerHTML = `
        /* Solo ocultamos el contenedor de anuncios que identificaste */
        #ad_position_box, 
        div[id^="google_ads"],
        ins.adsbygoogle {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
          height: 0px !important;
          width: 0px !important;
        }
        /* NO bloqueamos la etiqueta iframe de forma general */
      `;
      document.head.appendChild(style);
    });

    await page.addLocatorHandler(
      page.frameLocator('iframe#ad_iframe').getByRole('button', { name: /close|dismiss/i }),
      async () => {
        try {
          await page.frameLocator('iframe#ad_iframe').getByRole('button', { name: /close|dismiss/i }).click();
        } catch (e) {
        }
      }
    );

    await use(page);
  },
});

export { expect } from '@playwright/test';