<script lang="ts">
	import { onMount } from "svelte";
    import {Engine} from 'migu-games';
	import WindowComponent from "../components/WindowComponent.svelte";
    import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
	import GameObjectSelector from "../components/GameObjectCreator.svelte";
	import { EditorAnimatedSprite, EditorGameObject, EditorRigidbody, EditorSprite, EditorTilingSprite, GameObjectType } from "../ts/EditorGameObject";
	import GameObject from "../components/GameObject.svelte";

    let sceneComponent: HTMLDivElement;
    let canvas: HTMLCanvasElement;

    let gameObjects: EditorGameObject[] = [];

    let displayGameObjectSelector = false;

    onMount(() => {
        const engine = new Engine({view: canvas, resizeTo: sceneComponent});
    });

    function showGameObjectSelector(){
        displayGameObjectSelector = true;
    }

    function addGameObject(event: CustomEvent<GameObjectType>){
        console.log(`Selected game object: ${event.detail}`);
        if(event.detail == GameObjectType.GameObject){
            gameObjects = [...gameObjects, new EditorGameObject()];
        }else if(event.detail == GameObjectType.Sprite){
            gameObjects = [...gameObjects, new EditorSprite()];
        }else if(event.detail == GameObjectType.AnimatedSprite){
            gameObjects = [...gameObjects, new EditorAnimatedSprite()];
        }else if(event.detail == GameObjectType.TilingSprite){
            gameObjects = [...gameObjects, new EditorTilingSprite()];
        }else if(event.detail == GameObjectType.Rigidbody){
            gameObjects = [...gameObjects, new EditorRigidbody()];
        }
    }
</script>

<main>
    <GameObjectSelector bind:display={displayGameObjectSelector} on:createGameObject={addGameObject}/>
    <WindowComponent title="Hierarchy"> 
        <button class="btn btn-sm no-animation w-full rounded-none py-1 gap-2" on:click={showGameObjectSelector}>
            <div class="w-4"><FaPlus/></div> Add GameObject
        </button>
        {#each gameObjects as gameObject}
            <GameObject gameObject={gameObject}/>
        {/each}
    </WindowComponent>
    <div class="scene component flex-grow" bind:this={sceneComponent}>
        <canvas bind:this={canvas}/>
    </div>
    <WindowComponent title="Inspector"/>
</main>


<style>
    main{
        height: 100vh;
        display: flex;
    }
    .component{
        height: 100%;
    }
</style>