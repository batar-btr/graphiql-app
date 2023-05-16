type Arg<T> = {
  name: string;
  description: string;
  type: T;
  extensions: Record<string, unknown>;
};

export type QueryField<T> = {
  name: string;
  description: string;
  type: T;
  args: Arg<T>[];
  deprecationReason: string | null;
  extensions: Record<string, unknown>;
};

export type Fields<T> = {
  [name: string]: QueryField<T>;
};

export type QueryMain<T> = {
  [name: string]: {
    name: string;
    description: string;
    type: T;
    args: Arg<T>[];
    deprecationReason: string | null;
    extensions: Record<string, unknown>;
    fields: Fields<T>;
  };
};
