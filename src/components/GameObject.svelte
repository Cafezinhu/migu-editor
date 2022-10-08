<script lang="ts">
	import type { EditorGameObject, GameObjectType } from "../ts/EditorGameObject";
    import FaCube from 'svelte-icons/fa/FaCube.svelte'
	import GameObjectIcon from "./GameObjectIcon.svelte";
	import { selectedGameObjectStore } from "../stores/stores";
	import { onDestroy } from "svelte";

    export let gameObject: EditorGameObject;
    let selectedGameObject: EditorGameObject | null;

    const unsubscribe = selectedGameObjectStore.subscribe(value => {
        selectedGameObject = value;
    });

    function select(){
        selectedGameObjectStore.set(gameObject);
    }

    onDestroy(unsubscribe);
</script>

<button 
    class={`${gameObject == selectedGameObject ? 'bg-accent hover:bg-accent-focus text-white' : 'base-100 hover:bg-base-300'} cursor-pointer flex pl-2 py-1 w-full items-center gap-2`}
    on:click={select}>
    <div class="w-4">
        <GameObjectIcon type={gameObject.gameObjectType} />
    </div>
    {gameObject.name}
</button>