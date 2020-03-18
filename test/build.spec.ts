import { assert } from "chai";
import { hashElement } from "folder-hash";
import _ from "lodash";
import "mocha";
import rimraf from "rimraf";
import { create } from "../src";
import { IProcessorLoader, IProcessorOptions } from "../src/processor";
import { mkdtemp, SAMPLE_GLOB, test } from "./utils";

interface ICase {
    expected: string[];
    processor: IProcessorLoader;
    options: IProcessorOptions;
}

describe("create sprite test", () => {
    let context: string;

    beforeEach(() => {
        context = mkdtemp();
    });

    afterEach(() => {
        rimraf.sync(context);
    });

    const cases: Record<string, ICase> = {
        "Test JSON": {
            expected: ["5Q1bg2lc80t6d1dCZV+hY4udQ5I="],
            processor: undefined,
            options: undefined,
        },
        "Test JSON with Omit fields": {
            expected: ["IoIxqtLCfnJnhNDbxf63A0by8Zc="],
            processor: undefined,
            options: {
                omitFields: ["width", "height"],
            },
        },
        "Test CSS": {
            expected: ["L0TKm1lDtykse1AkgU7YKqMcTbI="],
            processor: "css",
            options: undefined,
        },
        "Test CSS with Omit fields": {
            expected: ["RH0OvyfaPIncK6deO5zwqh2d/Xc="],
            processor: "css",
            options: {
                omitFields: ["width", "height"],
            },
        },
        "Test SCSS": {
            expected: ["tl2LwBjVZ4AyfYGOsIkM4LEVua4="],
            processor: "scss",
            options: undefined,
        },
        "Test SCSS with Omit fields": {
            expected: ["ih4IBGSneROYe+dehjbamGp/cyo="],
            processor: "scss",
            options: {
                omitFields: ["width", "height"],
            },
        },
        "Test LESS": {
            expected: ["OhRq2uwvrO1mH5hVOmFyyTi5Y1U="],
            processor: "less",
            options: undefined,
        },
        "Test LESS with Omit fields": {
            expected: ["7iFaBt9xiLVO8vlAXcRT7CdhgGQ="],
            processor: "less",
            options: {
                omitFields: ["width", "height"],
            },
        },
    };

    _.forEach(cases, (testCase, name) => {
        it(name, (done) => {
            test(context, done, testCase.expected, create({
                context,
                src: SAMPLE_GLOB,
                output: {
                    processor: testCase.processor,
                    options: testCase.options,
                },
            }));
        });
    });
});