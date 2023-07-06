import { DETALLES, ESTADOS } from '../../Utils/Enums';
import { format } from 'date-fns';

export const remitoVacio =
{
  agencia: "",
  numero: 0,
  e4: 0,
  e4T: 0,
  gps: 0,
  tx860: 0,
  tx700: 0,
  tx840: 0,
  mrd: 0,
  accesorios: "",
  createdAt: format(Date.UTC(0,0,0), 'dd/MM/yyyy'),
  recivedAt: format(Date.UTC(0,0,0), 'dd/MM/yyyy'),
  compromisedAt: format(Date.UTC(0,0,0), 'dd/MM/yyyy'),
  estado: ESTADOS.CREADO,
  detalle: DETALLES.SERVICIO_TECNICO,
  retira: "",
}