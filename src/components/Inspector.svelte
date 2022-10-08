<script lang="ts">
	import { onDestroy } from "svelte";
	import { gameObjectsStore, selectedGameObjectStore } from "../stores/stores";
	import type { EditorGameObject } from "../ts/EditorGameObject";
	import GameObjectIcon from "./GameObjectIcon.svelte";
	import WindowComponent from "./WindowComponent.svelte";

    let gameObjectName = '';
    let selectedGameObject: EditorGameObject | null = null;
    let unsubscribe = selectedGameObjectStore.subscribe(value => {
        selectedGameObject = value;
        gameObjectName = value ? value.name : '';
    });

    $: {
        selectedGameObjectStore.update(gameObject => {
            if(gameObject){
                gameObject.name = gameObjectName;
                gameObjectsStore.update(value => value);
            }
            return gameObject;
        });
    }

    onDestroy(unsubscribe);
</script>

<WindowComponent title="Inspector">
{#if selectedGameObject}
    <div class="bg-base-200 flex items-center p-2 gap-2">
        <div class="w-4"><GameObjectIcon type={selectedGameObject.gameObjectType}/></div>
        <input type="text" class="input w-full max-w-xs" bind:value={gameObjectName}/>
    </div>
{/if}
</WindowComponent>