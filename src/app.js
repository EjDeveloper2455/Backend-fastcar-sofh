import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';
import empleadoRoutes from './routes/empleado.routes';
import tipoVehiculoRoutes from './routes/tipo_vehiculo.routes';
import marcaRoutes from './routes/marca.routes';
import colorRoutes from './routes/color.routes';
import sliderRoutes from './routes/slider.routes';
import modeloRoutes from './routes/modelo.routes';
import vehiculoRoutes from './routes/vehiculo.routes';
import sucursalRoutes from './routes/sucursal.routes';
import computadoraRoutes from './routes/computadora.routes';
import coberturaRoutes from './routes/cobertura.routes';
import cargoRoutes from './routes/cargo.routes';
import departamentoRoutes from './routes/departamento.routes';
import smsRoutes from './routes/sms.routes';
import emailRoutes from './routes/email.routes';
import recursosRoutes from './routes/recursos.routes';
import adicionalesRoutes from './routes/adicionales.routes';
import seguroRoutes from './routes/seguro.routes';
import datos_reservacionRoutes from './routes/datos_reservacion.routes';
import notificacionesRoutes from './routes/notificaciones.routes';
import solicitudRoutes from './routes/solicitud.routes';

const app = express();


app.set('port',8080);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Rutes
app.use("/api/user/",userRoutes);
app.use("/api/empleado/",empleadoRoutes);
app.use("/api/tipoVehiculo/",tipoVehiculoRoutes);
app.use("/api/marca/",marcaRoutes);
app.use("/api/color/",colorRoutes);
app.use("/api/slider/",sliderRoutes);
app.use("/api/modelo/",modeloRoutes);
app.use("/api/sucursal/",sucursalRoutes);
app.use("/api/vehiculo/",vehiculoRoutes);
app.use("/api/computadora/",computadoraRoutes);
app.use("/api/cobertura/",coberturaRoutes);
app.use("/api/cargo/",cargoRoutes);
app.use("/api/departamento/",departamentoRoutes);
app.use("/api/sms/",smsRoutes);
app.use("/api/recursos/",recursosRoutes);
app.use("/api/email/",emailRoutes);
app.use("/api/adicionales/",adicionalesRoutes);
app.use("/api/seguro/",seguroRoutes);
app.use("/api/notificaciones/",notificacionesRoutes);
app.use("/api/datos_reservacion/",datos_reservacionRoutes);
app.use("/api/solicitud/",solicitudRoutes);

app.get("/api/confirm/",(req,res)=>{
    res.send("El servidor esta corriendo");
});


export default app;