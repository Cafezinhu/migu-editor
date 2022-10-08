import { Anchor } from "migu-games";
import type { EditorCollider } from "./EditorCollider";

export enum GameObjectType {
    GameObject,
    Sprite,
    AnimatedSprite,
    TilingSprite,
    Rigidbody
}

export class EditorGameObject {
    name = 'GameObject';
    gameObjectType = GameObjectType.GameObject;
    parent: EditorGameObject | null = null;
    children: EditorGameObject[] = [];
    tag = '';
    position = {x: 0, y: 0};
    angle = 0;
    scale = {x: 1, y: 1};
    visible = true;
    zIndex = 0;
    anchor = {x: 0.5, y: 0.5};
}

export class EditorSprite extends EditorGameObject {
    name = 'Sprite';
    gameObjectType = GameObjectType.Sprite;
    texture = '';
    tint = '#ffffff';
}

export class EditorAnimatedSprite extends EditorGameObject {
    name = 'Animated Sprite';
    gameObjectType = GameObjectType.AnimatedSprite;
    textures: string[] = [];
    autoPlay = true;
    loop = true;
    animationSpeed = 1;
}

export class EditorTilingSprite extends EditorGameObject {
    name = 'Tiling Sprite';
    gameObjectType = GameObjectType.TilingSprite;
    texture = '';
    tilingSize = {
        width: 1,
        height: 1
    };
    offset = {x: 0, y: 0};
}

export class EditorRigidbody extends EditorGameObject {
    name = 'Rigidbody';
    gameObjectType = GameObjectType.Rigidbody;
    type: 'fixed' | 'dynamic' = 'dynamic';
    mass = 1;
    collider?: EditorCollider;
}