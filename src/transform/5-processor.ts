import _ from "lodash";
import path from "path";
import { IOptions } from "../options";
import { getProcessor } from "../processor";
import { ISpriteExported } from "../types";
import { through2obj } from "./utils";
import File from "vinyl"

export default (output: IOptions["output"]) => {
    const makePath = (ext: string) => path.join(output.targetPath, path.format({
        name: output.fileName,
        ext: `.${ext}`,
    }));
    return through2obj<ISpriteExported>(async function (layout) {
        const processor = await getProcessor(output.processor);
        this.push(makeFile(
            makePath(layout.sprite.type),
            layout.sprite.contents,
            layout.sprite.type,
        ))
        this.push(makeFile(
            makePath(processor.extension),
            await processor.handler(layout, _.merge(output.options, {
                path: `${output.fileName}.${layout.sprite.type}`,
            })),
            processor.extension,
        ));
    });
};

const makeFile = (target: string, contents: string | Buffer, extension: string) => {
    if (typeof contents === "string") {
        contents = Buffer.from(contents, "utf-8");
    }
    return new File({ path: target, contents, extension });
};
