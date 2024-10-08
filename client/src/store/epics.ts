import { combineEpics } from "redux-observable";

import { appEpics } from "./app";

const rootEpics = combineEpics(...appEpics);

export default rootEpics;
