<script lang="ts">
	import { onDestroy } from "svelte";
	import { selectedGameObjectStore } from "../../stores/stores";
	import { ColliderType, EditorBoxCollider, EditorCapsuleCollider, EditorCircleCollider, EditorCollider,  } from "../../ts/EditorCollider";
	import type { EditorRigidbody } from "../../ts/EditorGameObject";
	import GameObjectInspector from "./GameObjectInspector.svelte";
	import SimpleRow from "./SimpleRow.svelte";

    let type: 'fixed' | 'dynamic';
    let colliderName = 'No collider';
    let colliderType: ColliderType;
    let mass: number;
    let collider: EditorCollider = new EditorCollider();

    let height: number;
    let width: number;
    let radius: number;

    let unsubscribe = selectedGameObjectStore.subscribe(gameObject => {
        if(gameObject){
            collider = (gameObject as EditorRigidbody).collider;
            
            mass = (gameObject as EditorRigidbody).mass;

            type = (gameObject as EditorRigidbody).type;

            if(!collider) return;

            colliderType = collider.type;
            if(colliderType == ColliderType.Box){
                const col = (gameObject as EditorRigidbody).collider as EditorBoxCollider;
                height = col.height;
                width = col.width;
            }else if(colliderType == ColliderType.Circle){
                const col = (gameObject as EditorRigidbody).collider as EditorCircleCollider;
                radius = col.radius;
            }else if(colliderType == ColliderType.Capsule){
                const col = (gameObject as EditorRigidbody).collider as EditorCapsuleCollider;
                height = col.height;
                radius = col.radius;
            }
        }
    });

    $: {
        if(colliderType == ColliderType.None){
            colliderName = 'No collider';
        }else if(colliderType == ColliderType.Box){
            colliderName = 'Box';
        }else if(colliderType == ColliderType.Circle){
            colliderName = 'Circle';
        }else if(colliderType == ColliderType.Capsule){
            colliderName = 'Capsule';
        }

        selectedGameObjectStore.update(gameObject => {
            if(gameObject){
                collider.type = colliderType;
                if(colliderType == ColliderType.Box){
                    (collider as EditorBoxCollider).height = height;
                    (collider as EditorBoxCollider).width = width;
                }else if(colliderType == ColliderType.Circle){
                    (collider as EditorCircleCollider).radius = radius;
                }else if(colliderType == ColliderType.Capsule){
                    (collider as EditorCapsuleCollider).radius = radius;
                    (collider as EditorCapsuleCollider).height = height;
                }
            }
            return gameObject;
        });
    }

    onDestroy(unsubscribe);

    function changeColliderType(colType: ColliderType){
        colliderType = colType;
    }

</script>

<SimpleRow>
    Mass
    <input type="number" class="input input-bordered input-sm w-full" bind:value={mass}>
</SimpleRow>

<SimpleRow>
    Type
    <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn m-1">{type}</label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
            <li on:click={() => type = 'dynamic'}><a>Dynamic</a></li>
            <li on:click={() => type = 'fixed'}><a>Fixed</a></li>
        </ul>
    </div>
</SimpleRow>

<SimpleRow>
    Collider
    <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn m-1">{colliderName}</label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
            <li on:click={() => changeColliderType(ColliderType.None)}><a>No collider</a></li>
            <li on:click={() => changeColliderType(ColliderType.Box)}><a>Box</a></li>
            <li on:click={() => changeColliderType(ColliderType.Circle)}><a>Circle</a></li>
            <li on:click={() => changeColliderType(ColliderType.Capsule)}><a>Capsule</a></li>
        </ul>
    </div>
</SimpleRow>

{#if colliderType == ColliderType.Box}
    <SimpleRow>
        height
        <input type="number" class="input input-bordered input-sm w-full" bind:value={height}>
    </SimpleRow>
    <SimpleRow>
        width
        <input type="number" class="input input-bordered input-sm w-full" bind:value={width}>
    </SimpleRow>
{:else if colliderType == ColliderType.Circle}
    <SimpleRow>
        radius
        <input type="number" class="input input-bordered input-sm w-full" bind:value={radius}>
    </SimpleRow>
{:else if colliderType == ColliderType.Capsule}
    <SimpleRow>
        height
        <input type="number" class="input input-bordered input-sm w-full" bind:value={height}>
    </SimpleRow>
    <SimpleRow>
        radius
        <input type="number" class="input input-bordered input-sm w-full" bind:value={radius}>
    </SimpleRow>
{/if}

<GameObjectInspector allowScale={false} allowAnchor={false}/>