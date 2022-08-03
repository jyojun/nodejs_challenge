import { application } from "./application.js";
import { presentation } from "./presentation.js";
import { session } from "./session.js";

const from = "jk@boostcamp.connect.or.kr";
const to = "camper@boostcamp.connect.or.kr";
const title = "Hello World";
const content = "Hello BoostCamper,\n\tThis message written by JK.\n";

let application_output = application(from, to, title, content);

let presentation_output = presentation(application_output);

let session_output = session(presentation_output);
