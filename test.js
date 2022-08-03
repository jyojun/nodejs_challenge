import { application } from "./application.js";
import { presentation } from "./presentation.js";
import { session } from "./session.js";
import { transport } from "./transport.js";
import { network } from "./network.js";
import { data_link } from "./data_link.js";

const from = "jk@boostcamp.connect.or.kr";
const to = "camper@boostcamp.connect.or.kr";
const title = "Hello World";
const content = "Hello BoostCamper,\n\tThis message written by JK.\n";

// 송신부
let application_output = application(from, to, title, content);

let presentation_output = presentation(application_output);

let session_output = session(presentation_output);

let transport_output = transport(session_output);

let network_output = network(transport_output);

let data_link_output = data_link(network_output);
