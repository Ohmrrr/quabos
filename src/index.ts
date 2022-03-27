import { Configure } from './Utils/Configure';
import { Quabos } from './Quabos';

const config = Configure();
const client = new Quabos(config);

client.init();
