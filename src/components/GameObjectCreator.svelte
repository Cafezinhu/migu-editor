<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { GameObjectType } from "../ts/EditorGameObject";

    export let display: boolean;

    const dispatch = createEventDispatcher();

    function hide(){
        display = false;
    }

    function createGameObject(gameObject: GameObjectType){
        hide();
        dispatch('createGameObject', gameObject);
    }
</script>

<div class={`modal ${display ? 'modal-open' : ''}`}>
    <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-4" on:click={hide}>✕</label>
        <h3 class="text-lg font-bold mb-2 -mt-2">Add GameObject</h3>
        <ul class="menu bg-base-200">
            <li on:click={() => createGameObject(GameObjectType.GameObject)}><a>GameObject</a></li>
            <li on:click={() => createGameObject(GameObjectType.Sprite)}><a>Sprite</a></li>
            <li on:click={() => createGameObject(GameObjectType.AnimatedSprite)}><a>Animated Sprite</a></li>
            <li on:click={() => createGameObject(GameObjectType.TilingSprite)}><a>Tiling Sprite</a></li>
            <li on:click={() => createGameObject(GameObjectType.Rigidbody)}><a>Rigidbody</a></li>
        </ul>
    </div>
</div>