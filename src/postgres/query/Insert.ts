import Insert, { ColumnsToValues } from "../../base/query/Insert";
import Override from "../../decorator/Override";
import PostgresTable from "../Table";

export default class PostgresInsert<SCHEMA extends { [key: string]: any }, COLUMNS extends (keyof SCHEMA)[] = (keyof SCHEMA)[]> extends Insert<SCHEMA, COLUMNS> {

	private valuesToAdd: ColumnsToValues<SCHEMA, COLUMNS, true>[] = [];

	// @ts-ignore
	public constructor (private readonly table: PostgresTable<SCHEMA>, private readonly columns: COLUMNS) { }

	public values (...values: ColumnsToValues<SCHEMA, COLUMNS>): this;
	@Override public values (...values: any) {
		this.valuesToAdd.push(values);
		return this;
	}

	@Override public async query () {

	}
}
