import * as dateFns from "date-fns";
import * as o from "obsidian";

const getNewEntryText = () =>
	`### 📆  ${dateFns.format(new Date(), "LLL d, yyyy @ h:mm a")}\n\n\n\n\n`;

const createJournalEntry = async ({ app }: o.Plugin) => {
	const file = app.vault.getFiles().find((f) => f.name === "Journal.md");
	await app.workspace.activeLeaf.openFile(file);

	const editor = app.workspace.getActiveViewOfType(o.MarkdownView)?.editor;
	editor.replaceRange(getNewEntryText(), { line: 0, ch: 0 });
	editor.setCursor({ line: 2, ch: 0 });
};

export const initJournal = (plugin: o.Plugin) => {
	plugin.addCommand({
		id: `journal-create-entry`,
		name: `Create new journal entry`,
		callback: () => createJournalEntry(plugin),
		hotkeys: [
			{
				modifiers: ["Mod", "Shift"],
				key: "j",
			},
		],
	});
};
