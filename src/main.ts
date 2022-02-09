import * as o from "obsidian";
import { initJournal } from "./journal";
import { addSetHeadingCommands } from "./set-heading";

export default class MyPlugin extends o.Plugin {
	async onload() {
		addSetHeadingCommands(this);
		initJournal(this);
	}
}
