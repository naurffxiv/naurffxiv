/**
 * The object type for buffs contained in the .json/.toml files
 * */
export type Buff = {
  name: string;
  icon: number;
  duration?: number | string;
  cleansable?: boolean;
  description: string;
  explanation: string;
  phases: (number | string)[];
};

/**
 * Object key/value map of buffs where key is typically a keyable
 * string of the buff name
 * */
export type BuffMap = Record<string, Buff>;
