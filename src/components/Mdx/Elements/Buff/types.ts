export type Buff = {
    name: string;
    icon: number;
    duration?: number | string;
    cleansable?: boolean;
    description: string;
    explanation: string;
    phases: (number | string)[];
};

export type BuffMap = Record<string, Buff>;
