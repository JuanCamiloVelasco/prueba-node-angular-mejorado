import { environment } from "../../../environments/environment";

const BASE_URL = environment.production? '' : 'http://localhost:5000';

export const EVENTLOGS_URL = BASE_URL + '/api/eventlogs'; 
export const EVENTLOGS_BY_ID_URL = EVENTLOGS_URL + '/'; 
export const EVENTOS_SEARCH_TIPO_URL = EVENTLOGS_URL + '/buscar/';
export const EVENTOS_SEARCH_FECHA_URL = EVENTLOGS_URL + '/fecha/';
export const EVENTOS_DELETE_URL = EVENTLOGS_URL + '/evento/';

export const EVENTO_REGISTER_URL = EVENTLOGS_URL + '/register'