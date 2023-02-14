type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc["length"]]>;
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

interface IDataInput {
    msg?: string;
    dim?: number;
    rct?: 1 | 0;
    pad?: IntRange<0, 11>;
    pal?: [string, string];
    vrb?: 1 | 0;
}

declare function DATAMatrix(Q: IDataInput): SVGElement;

export { DATAMatrix };
