import { application } from "./application.js";
import { presentation, res_presentation } from "./presentation.js";
import { session, res_session } from "./session.js";
import { transport, res_transport } from "./transport.js";
import { network, res_network } from "./network.js";
import { data_link, res_data_link } from "./data_link.js";
import { physical, res_physical } from "./physical.js";

const from = "jk@boostcamp.connect.or.kr";
const to = "camper@boostcamp.connect.or.kr";
const title = "Hello World";
const content = "Hello BoostCamper,\n\tThis message written by JK.\n";

// 전송 계층

let application_output = application(from, to, title, content);

let presentation_output = presentation(application_output);

let session_output = session(presentation_output);

let transport_output = transport(session_output);

let network_output = network(transport_output);

let data_link_output = data_link(network_output);

let physical_output = physical(data_link_output);

// 수신 계층

let data_link_input = res_physical(physical_output);

let network_input = res_data_link(data_link_input);

let transport_input = res_network(network_input);

let session_input = res_transport(transport_input);

let presentation_input = res_session(session_input);

let physical_input = res_presentation(presentation_input);
