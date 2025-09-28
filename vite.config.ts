import { vitePlugin as remix } from "@remix-run/dev";
import { DefineRoutesFunction, flatRoutes } from "remix-flat-routes";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
    interface Future {
        v3_singleFetch: true;
    }
}

export default defineConfig({
    plugins: [
        remix({
            ssr: false,
            routes: async (defineRoutes: DefineRoutesFunction) => {
                return flatRoutes("routes", defineRoutes);
            },
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
                v3_singleFetch: true,
                v3_lazyRouteDiscovery: true,
            },
        }),
        tsconfigPaths(),
    ],
    build: {
        chunkSizeWarningLimit: 200 * 1024,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id
                            .toString()
                            .split("node_modules/")[1]
                            .split("/")[0]
                            .toString();
                    }
                },
                assetFileNames: (assetInfo) => {
                    const fileName = assetInfo.name || "";
                    const extType = fileName.split(".").pop();

                    if (
                        extType &&
                        /png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)
                    ) {
                        return `static/img/[name]-[hash][extname]`;
                    } else if (extType && /woff|woff2/.test(extType)) {
                        return `static/css/[name]-[hash][extname]`;
                    } else {
                        return `static/other/[name]-[hash][extname]`;
                    }
                },
                chunkFileNames: "static/js/[name]-[hash].js",
                entryFileNames: "static/js/[name]-[hash].js",
            },
        },
    },
    server: {
        port: 3000,
    },
});
