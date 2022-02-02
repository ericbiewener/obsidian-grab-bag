import * as o from "obsidian";
import { addSetHeadingCommands } from "./set-heading";

export default class MyPlugin extends o.Plugin {
	async onload() {
		addSetHeadingCommands(this);
	}
}
