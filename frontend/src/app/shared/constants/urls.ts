// Mis rutas - el enviorment es para el despliegue pero no funciona bien en local 
import { environment } from "../../../environments/environment";
// environment.production? '' :
const BASE_URL = environment.production? '' : 'http://localhost:5000';

// Rutas Crud
export const EVENTLOGS_URL = BASE_URL + '/api/eventlogs';

export const EVENTLOGS_BY_ID_URL = EVENTLOGS_URL + '/'; 

export const EVENTO_REGISTER_URL = EVENTLOGS_URL + '/register';
export const EVENTO_UPDATE_URL = EVENTLOGS_URL + '/eventos/';
export const EVENTOS_DELETE_URL = EVENTLOGS_URL + '/evento/';

// Rutas de filtros
export const EVENTOS_SEARCH_TIPO_URL = EVENTLOGS_URL + '/buscar/';
export const EVENTOS_SEARCH_FECHA_URL = EVENTLOGS_URL + '/fecha/';
export const EVENTOS_SEARCH_TIPO_FECHA_URL = EVENTLOGS_URL + '/buscarAvanzada/';