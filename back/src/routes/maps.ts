import { Router } from 'express';
import { markers } from '../controllers/markers';
import { requireAuth } from '../middlewares/auth';
import { markerCreateValidator, markerIdValidator, markerUpdateValidator } from '../middlewares/validators/markerValidator';

const mapRouter = Router();

mapRouter.get('/', requireAuth, markers.getMarkers); // все маркеры, включая неактивные, — только для админки
mapRouter.get('/groups', markers.getMarkerGroups);
mapRouter.post('/', markerCreateValidator, markers.createMarker);
mapRouter.patch('/:_id', markerUpdateValidator, markers.updateMarker);
mapRouter.delete('/:_id', markerIdValidator, markers.deleteMarker);

export default mapRouter;
