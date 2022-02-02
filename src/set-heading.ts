import * as o from "obsidian";
import { replaceCurrentLineViaStringReplace } from "./editing";

type Heading = "#" | "##" | "###" | "####" | "#####" | "######";

export const setHeading = (plugin: o.Plugin, newHeading: Heading) => () => {
	replaceCurrentLineViaStringReplace(
		plugin.app.workspace.getActiveViewOfType(o.MarkdownView)?.editor,
		/^(#* )?/,
		`${newHeading} `
	);
};

export const addSetHeadingCommands = (plugin: o.Plugin) => {
	const headings = ["#", "##", "###", "####", "#####", "######"] as const;

	for (let i = 0; i < headings.length; i++) {
		const headingNo = i + 1;
		plugin.addCommand({
			id: `grab-bag-set-heading-${headingNo}`,
			name: `Set heading ${headingNo}`,
			callback: setHeading(plugin, headings[i]),
			hotkeys: [
        {
          modifiers: ['Mod'],
          key: `${headingNo}`,
        },
      ],
		});
	}
};
