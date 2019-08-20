import Bound from "../../decorator/Bound";
import { DataType, DataTypeValue } from "../DataType";
import { ExpressionBuilder } from "./Expression";

export interface UpdateColumns<SCHEMA extends { [key: string]: any }> {
	column<COLUMN extends keyof SCHEMA> (column: COLUMN, value: DataTypeValue<Extract<SCHEMA[COLUMN], DataType>>): this;
}

export default abstract class Update<SCHEMA extends { [key: string]: any }, RETURN> implements UpdateColumns<SCHEMA> {

	protected readonly columnUpdates: [keyof SCHEMA, any][] = [];

	public abstract get where (): ExpressionBuilder<SCHEMA, (keyof SCHEMA)[], this>;

	@Bound public column<COLUMN extends keyof SCHEMA> (column: COLUMN, value: DataTypeValue<Extract<SCHEMA[COLUMN], DataType>>) {
		this.columnUpdates.push([column, value]);
		return this;
	}

	public columns (initializer: (update: UpdateColumns<SCHEMA>) => any) {
		initializer(this);
		return this;
	}

	public abstract query (): Promise<RETURN>;
}