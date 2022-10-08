import { writable, type Writable } from "svelte/store";
import type { EditorGameObject } from "../ts/EditorGameObject";

export const selectedGameObjectStore: Writable<EditorGameObject | null> = writable(null);