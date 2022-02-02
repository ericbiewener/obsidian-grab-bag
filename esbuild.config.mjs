import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import fs from "fs-extra";
import path from "path";

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const isProd = process.env.NODE_ENV === "production";

const OUT_DIR = "dist";
const MANIFEST = "manifest.json";

const postBuild = async () => {
	await fs.copyFile(path.join(MANIFEST), path.join(OUT_DIR, MANIFEST));
};

esbuild
	.build({
		banner: {
			js: banner,
		},
		entryPoints: ["src/main.ts"],
		bundle: true,
		external: [
			"obsidian",
			"electron",
			"@codemirror/autocomplete",
			"@codemirror/closebrackets",
			"@codemirror/collab",
			"@codemirror/commands",
			"@codemirror/comment",
			"@codemirror/fold",
			"@codemirror/gutter",
			"@codemirror/highlight",
			"@codemirror/history",
			"@codemirror/language",
			"@codemirror/lint",
			"@codemirror/matchbrackets",
			"@codemirror/panel",
			"@codemirror/rangeset",
			"@codemirror/rectangular-selection",
			"@codemirror/search",
			"@codemirror/state",
			"@codemirror/stream-parser",
			"@codemirror/text",
			"@codemirror/tooltip",
			"@codemirror/view",
			...builtins,
		],
		format: "cjs",
		watch: isProd ? false : { onRebuild: postBuild },
		target: "es2016",
		logLevel: "info",
		sourcemap: isProd ? false : "inline",
		treeShaking: true,
		outdir: OUT_DIR,
	})
	.then(postBuild)
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});