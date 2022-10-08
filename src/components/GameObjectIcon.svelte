<script lang="ts">
	import { GameObjectType } from "../ts/EditorGameObject";
    import FaCube from 'svelte-icons/fa/FaCube.svelte';
    import FaImage from 'svelte-icons/fa/FaImage.svelte';
    import FaFilm from 'svelte-icons/fa/FaFilm.svelte'
    import FaImages from 'svelte-icons/fa/FaImages.svelte';
    import FaChessBoard from 'svelte-icons/fa/FaChessBoard.svelte';
    import FaRegFutbol from 'svelte-icons/fa/FaRegFutbol.svelte'

    export let type: GameObjectType;
</script>

{#if type == GameObjectType.GameObject}
    <FaCube />
{:else if type == GameObjectType.Sprite}
    <FaImage />
{:else if type == GameObjectType.AnimatedSprite}
    <FaFilm />
{:else if type == GameObjectType.TilingSprite}
    <FaImages />
{:else if type == GameObjectType.Rigidbody}
    <FaRegFutbol />
{/if}
