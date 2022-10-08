<script lang="ts">
	import { onDestroy } from "svelte";
	import { selectedGameObjectStore } from "../../stores/stores";
	import type { EditorSprite } from "../../ts/EditorGameObject";
	import GameObjectInspector from "./GameObjectInspector.svelte";
	import SimpleRow from "./SimpleRow.svelte";

    let texture: string;
    let tint: string;

    let unsubscribe = selectedGameObjectStore.subscribe(gameObject => {
        if(gameObject){
            texture = (gameObject as EditorSprite).texture;
            tint = (gameObject as EditorSprite).tint;
        }
    });

    $: {
        selectedGameObjectStore.update(gameObject => {
            if(gameObject){
                (gameObject as EditorSprite).texture = texture;
                (gameObject as EditorSprite).tint = tint;
            }
            return gameObject;
        });
    }

    onDestroy(unsubscribe);

</script>

<SimpleRow>
    Texture
    <input type="text" class="input input-bordered input-sm w-full" bind:value={texture}>
</SimpleRow>

<SimpleRow>
    Tint
    <input type="color" class="input input-bordered input-sm w-full" bind:value={tint}>
</SimpleRow>

<GameObjectInspector />