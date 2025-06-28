


// type ElementOfArray<T> = T extends (infer R)[] ? R : never;

// export class Subject<T> {
//     public currentId: number;
//     public _value: T;
//     public readonly subscriptions: Record<number, () => void>;
//     public constructor(value: T) {
//         this.subscriptions = {};
//         this.currentId = 0;
//         this._value = value;
//     }
//     public get value(): T {
//         return this._value;
//     }
//     public set value(nextValue: T) {
//         const prevValue = this._value;

//         this._value = nextValue;

//         if (prevValue !== nextValue) {
//             this.callAllSubscriptions();
//         }
//     }
//     public readonly callAllSubscriptions = (): void => {
//         Object.values(this.subscriptions).forEach(callback => {
//             callback();
//         });
//     };
//     public readonly push = (newValue: ElementOfArray<T>): void => {
//         this.value = [...(this.value as any), newValue] as any;
//     };
//     public readonly subscribe = (callback: () => void): (() => void) => {
//         const id = this.currentId;

//         this.subscriptions[id] = callback;

//         this.currentId++;

//         callback();

//         return (): void => {
//             delete this.subscriptions[id];
//         };
//     };
//     public readonly use = (): T => {
//         return useSubject(this);
//     };
// }
