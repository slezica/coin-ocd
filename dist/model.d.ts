export interface Coin {
    readonly id: string;
    readonly name: string;
    readonly symbol: string;
    readonly rank: number;
    readonly priceUsd: number;
    readonly priceBtc: number;
    readonly volumeUsd24h: number;
    readonly marketCapUsd: number;
    readonly availableSupply: number;
    readonly totalSupply: number;
    readonly maxSupply: number;
    readonly percentChange1h: number;
    readonly percentChange24h: number;
    readonly percentChange7d: number;
    readonly updatedAt: string;
}
export declare class Dataset {
    readonly coins: Coin[];
    readonly downloadedAt: string;
    constructor(props: Partial<Dataset>);
    isRecent(): boolean;
    getCoin(symbol: string): Coin | null;
}
