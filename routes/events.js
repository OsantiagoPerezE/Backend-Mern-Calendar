/*
Event Route
host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const {
	getEventos,
	crearEventos,
	actualizarEventos,
	eliminarEventos,
} = require('../controllers/events');

const router = Router();

//Todas tienen que pasar por la validacion del JWT
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos);

// Crear nuevo evento
router.post(
	'/',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check('start', 'La fecha de inicio es obligatoria').custom(isDate),
		check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
		validarCampos,
	],
	crearEventos
);

// Actualizar evento
router.put('/:id', actualizarEventos);

// Eliminar evento
router.delete('/:id', eliminarEventos);

module.exports = router;
