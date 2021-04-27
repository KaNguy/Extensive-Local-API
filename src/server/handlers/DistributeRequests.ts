import * as fs from "fs";
import { API } from "./API";
import * as Utilities from "../../util/IndexUtil";
import { KeyObject } from "../../util/Interfaces";

export const distribute = (request, response, options: KeyObject = {}) => {
    options.utilities = Utilities;
    fs.readdirSync('src/api')
        .forEach(file => {
            if (file.endsWith(".ts")) {
                const component: string = file.split('.').slice(0, -1).join('.');
                const path: string = request.url.endsWith("/") && request.url !== "/" ? request?.url.slice(0, -1) : request.url;
                options.path = path;
                if (API[component] && path === API[component]?.path.toLowerCase()) {
                    API[component]?.main?.run(request, response, options ? options : {});
                }
            }
    });
};
