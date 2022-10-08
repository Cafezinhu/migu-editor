<script lang="ts">
	import { onDestroy } from "svelte";
	import { selectedGameObjectStore } from "../../stores/stores";
	import SimpleRow from "./SimpleRow.svelte";

    export let allowScale = true;
    export let allowAnchor = true;

    let tag: string;

    let x: number;
    let y: number;

    let angle: number;

    let scaleX: number;
    let scaleY: number;

    let zIndex: number;

    let anchorX: number;
    let anchorY: number;

    let unsubscribe = selectedGameObjectStore.subscribe(gameObject => {
        if(gameObject){
            tag = gameObject.tag;
            x = gameObject.position.x;
            y = gameObject.position.y;
            angle = gameObject.angle;
            scaleX = gameObject.scale.x;
            scaleY = gameObject.scale.y;
            zIndex = gameObject.zIndex;
            anchorX = gameObject.anchor.x;
            anchorY = gameObject.anchor.y;
        }
    });

    $: {
        selectedGameObjectStore.update(gameObject => {
            if(gameObject){
                gameObject.tag = tag;
                gameObject.position = {x, y};
                gameObject.angle = angle;
                gameObject.scale = {x: scaleX, y: scaleY};
                gameObject.zIndex = zIndex;
                gameObject.anchor = {x: anchorX, y: anchorY};
            }
            return gameObject;
        });
    }

    onDestroy(unsubscribe);

</script>

<SimpleRow>
    Tag
    <input type="text" class="input input-bordered input-sm w-full" bind:value={tag}>
</SimpleRow>

<SimpleRow>
    <p class="w-full">Z Index</p>
    <input type="text" class="input input-bordered input-sm w-full" bind:value={zIndex}>
</SimpleRow>

Position
<SimpleRow>
    x
    <input type="number" class="input input-bordered input-sm w-full" bind:value={x}>
    y
    <input type="number" class="input input-bordered input-sm w-full" bind:value={y}>
</SimpleRow>

<SimpleRow>
    Angle
    <input type="number" class="input input-bordered input-sm w-full" bind:value={angle}>
</SimpleRow>

{#if allowScale}
Scale
<SimpleRow>
    x
    <input type="number" class="input input-bordered input-sm w-full" bind:value={scaleX}>
    y
    <input type="number" class="input input-bordered input-sm w-full" bind:value={scaleY}>
</SimpleRow>
{/if}

{#if allowAnchor}
Anchor
<SimpleRow>
    x
    <input type="number" class="input input-bordered input-sm w-full" bind:value={anchorX}>
    y
    <input type="number" class="input input-bordered input-sm w-full" bind:value={anchorY}>
</SimpleRow>
{/if}