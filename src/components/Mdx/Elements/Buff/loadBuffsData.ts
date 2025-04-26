import fs from 'fs';
import path from 'path';
import { parse } from 'smol-toml';

import { BuffMap } from './types';

export function loadBuffsData(
    mdxDir: string,
    datapath: string | undefined = ''
): BuffMap {
    if (!datapath) {
        if (fs.existsSync(path.join(mdxDir, "buffs.json"))) {
            datapath = "buffs.json";
        }
        else if (fs.existsSync(path.join(mdxDir, "buffs.toml"))) {
            datapath = "buffs.toml";
        }
        else {
            return {};
        }
    }

    const fileAsString = String(fs.readFileSync(path.join(mdxDir, datapath)));

    return datapath.endsWith(".json")
        ? JSON.parse(fileAsString)
        : parse(fileAsString) as BuffMap;
}
