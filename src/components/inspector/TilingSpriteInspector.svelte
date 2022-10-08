<script lang="ts">
	import { onDestroy } from "svelte";
	import { selectedGameObjectStore } from "../../stores/stores";
	import type { EditorTilingSprite } from "../../ts/EditorGameObject";
	import GameObjectInspector from "./GameObjectInspector.svelte";
	import SimpleRow from "./SimpleRow.svelte";

    let texture: string;
    let width: number;
    let height: number;
    let offsetX: number;
    let offsetY: number;

    let unsubscribe = selectedGameObjectStore.subscribe(gameObject => {
        if(gameObject){
            texture = (gameObject as EditorTilingSprite).texture;
            width = (gameObject as EditorTilingSprite).tilingSize?.width;
            height = (gameObject as EditorTilingSprite).tilingSize?.height;
            offsetX = (gameObject as EditorTilingSprite).offset?.x;
            offsetY = (gameObject as EditorTilingSprite).offset?.y;
        }
    });

    $: {
        selectedGameObjectStore.update(gameObject => {
            if(gameObject){
                (gameObject as EditorTilingSprite).texture = texture;
                (gameObject as EditorTilingSprite).tilingSize = {width: width, height: height};
                (gameObject as EditorTilingSprite).offset = {x: offsetX, y: offsetY};
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

Tiling size
<SimpleRow>
    width 
    <input type="number" class="input input-bordered input-sm w-full" bind:value={width}>
</SimpleRow>
<SimpleRow>
    height 
    <input type="number" class="input input-bordered input-sm w-full" bind:value={height}>
</SimpleRow>

Offset
<SimpleRow>
    x 
    <input type="number" class="input input-bordered input-sm w-full" bind:value={offsetX}>
    y 
    <input type="number" class="input input-bordered input-sm w-full" bind:value={offsetY}>
</SimpleRow>

<GameObjectInspector />