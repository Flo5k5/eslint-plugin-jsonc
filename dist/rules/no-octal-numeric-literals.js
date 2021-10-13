"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const octalNumericLiteralPattern = /^0[Oo]/u;
exports.default = (0, utils_1.createRule)("no-octal-numeric-literals", {
    meta: {
        docs: {
            description: "disallow octal numeric literals",
            recommended: null,
            extensionRule: false,
            layout: false,
        },
        fixable: "code",
        messages: {
            disallow: "Octal numeric literals should not be used.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        if (!context.parserServices.isJSON) {
            return {};
        }
        return {
            JSONLiteral(node) {
                if (typeof node.value === "number" &&
                    octalNumericLiteralPattern.test(node.raw)) {
                    context.report({
                        loc: node.loc,
                        messageId: "disallow",
                        fix: (fixer) => {
                            return fixer.replaceTextRange(node.range, `${node.value}`);
                        },
                    });
                }
            },
        };
    },
});