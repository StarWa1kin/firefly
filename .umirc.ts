import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", redirect: "/dashboard" },
    { path: "/config", component: "config" },
    { path: "/dashboard", component: "dashboard" },
    { path: "/investigation", component: "investigation" },
    { path: "/subnet", component: "subnet" },
    { path: "/device-detail", component: "deviceDetail" },
  ],
  npmClient: "pnpm",
  extraPostCSSPlugins: [require("tailwindcss")],
  mock:
    process.env.NODE_ENV !== "production"
      ? {
          include: ["./src/mock/index.ts"],
        }
      : false,

  // history
  base: "/firefly/",
  publicPath: "/firefly/",
  //hash
  // publicPath: "./",
});
