export class Todo {
    id: number;
    text: string;
    done: boolean;
}

export class TodoGroup {
    id: number;
    todos: Todo[];
}

export class Item {
    id: number;
    name: string;
}
