<script lang="ts">
    export let title: string;
</script>

<div class="h-full bg-base-100 w-52">
    <p class="text-xs bg-base-300 p-1">{title}</p>
    <slot />
</div>