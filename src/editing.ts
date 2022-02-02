import * as o from "obsidian";

export const replaceCurrentLine = (
	editor: o.Editor | undefined,
	cb: (lineStr: string) => string
) => {
	console.info("editor", editor);
	if (!editor) return;
	const cursor = editor.getCursor();
	const oldLineStr = editor.getLine(cursor.line);
	const newLineStr = cb(oldLineStr);
	console.info(newLineStr);

	editor.replaceRange(
		newLineStr,
		{ line: cursor.line, ch: 0 },
		{ line: cursor.line, ch: oldLineStr.length }
	);
	editor.setCursor({
		line: cursor.line,
		ch: cursor.ch + newLineStr.length - oldLineStr.length,
	});
};

export const replaceCurrentLineViaStringReplace = (
	editor: o.Editor | undefined,
	old: RegExp | string,
	newStr: string
) => {
	replaceCurrentLine(editor, (line) => line.replace(old, newStr));
};
