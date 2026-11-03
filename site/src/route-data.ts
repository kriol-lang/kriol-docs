import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// kriol.dev opens the docs in the same tab, so the logo leads back there; the
// docs home stays in the sidebar, as «Início».
export const KRIOL_HOME = 'https://kriol.dev/';

export const onRequest = defineRouteMiddleware((context) => {
	context.locals.starlightRoute.siteTitleHref = KRIOL_HOME;
});
