export const DataTypes = {
  UUID: "uuid",
  UUIDV4: "uuidv4",
  STRING: (len?: number) => `string${len ?? ""}`,
  TEXT: "text",
  INTEGER: "integer",
  BOOLEAN: "boolean",
  DATE: "date",
  NOW: new Date(),
};

export class Sequelize {
  constructor(..._args: unknown[]) {}
  define(_name: string, attrs: Record<string, unknown>, options?: Record<string, unknown>) {
    return { rawAttributes: attrs, options };
  }
}
