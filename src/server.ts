import { http } from './http';
import './webSocket/client'

http.listen(3333, () => console.log('running on port 3333'))