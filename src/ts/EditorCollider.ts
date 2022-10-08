export class EditorCollider {
    type = ColliderType.None;
}

export enum ColliderType {
    None,
    Box,
    Circle,
    Capsule
}

export class EditorBoxCollider extends EditorCollider {
    type = ColliderType.Box;
    width = 1;
    height = 1;
}

export class EditorCircleCollider extends EditorCollider {
    type = ColliderType.Circle;
    radius = 1;
}

export class EditorCapsuleCollider extends EditorCollider {
    type = ColliderType.Capsule;
    height = 2;
    radius = 1;
}