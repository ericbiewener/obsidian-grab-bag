import dotenv from "dotenv";
import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import fs from "fs-extra";
import os from "os"
import path from "path";
import assert from "assert"

dotenv.config()
assert(process.env.VAULTS, "Missing VAULTS env var")


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
	await Promise.all(process.env.VAULTS.split(',').map(vaultPath => 
		fs.copy(
			path.join(OUT_DIR),
			`${vaultPath}/.obsidian/plugins/grab-bag`
		),
	);
	console.info("✅ Copied plugin to vaults.");
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
