import { Configure } from './Utils/Configure';
import { Quabos } from './Structures/Quabos';

const config = Configure();
const client = new Quabos(config);

client.init();
