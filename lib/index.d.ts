import { Context, Schema } from 'koishi';
export declare const name = "apexlookup";
export interface Config {
    apiKey: string;
}
export declare const schema: Schema<Schemastery.ObjectS<{
    apiKey: Schema<string, string>;
}>, Schemastery.ObjectT<{
    apiKey: Schema<string, string>;
}>>;
export declare function apply(ctx: Context, config: Config): void;
