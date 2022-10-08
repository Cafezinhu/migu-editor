export class EditorCollider {}

export class EditorBoxCollider extends EditorCollider {
    width = 1;
    heigth = 1;
}

export class EditorCircleCollider extends EditorCollider {
    radius = 1;
}

export class EditorCapsuleCollider extends EditorCollider {
    heigth = 2;
    radius = 1;
}