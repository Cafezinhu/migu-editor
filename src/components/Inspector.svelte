<script lang="ts">
    import { onDestroy } from "svelte";
	import { gameObjectsStore, selectedGameObjectStore } from "../stores/stores";
	import { GameObjectType, type EditorGameObject } from "../ts/EditorGameObject";
	import GameObjectIcon from "./GameObjectIcon.svelte";
	import GameObjectInspector from "./inspector/GameObjectInspector.svelte";
	import RigidBodyInspector from "./inspector/RigidBodyInspector.svelte";
	import SpriteInspector from "./inspector/SpriteInspector.svelte";
	import TilingSpriteInspector from "./inspector/TilingSpriteInspector.svelte";
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
        <input type="text" class="input w-full h-8" bind:value={gameObjectName}/>
    </div>
    <div class="p-2">
        {#if selectedGameObject.gameObjectType == GameObjectType.GameObject}
            <GameObjectInspector />
        {:else if selectedGameObject.gameObjectType == GameObjectType.Sprite}
            <SpriteInspector />
        {:else if selectedGameObject.gameObjectType == GameObjectType.TilingSprite}
            <TilingSpriteInspector />
        {:else if selectedGameObject.gameObjectType == GameObjectType.Rigidbody}
            <RigidBodyInspector />
        {/if}
    </div>
{/if}
</WindowComponent>